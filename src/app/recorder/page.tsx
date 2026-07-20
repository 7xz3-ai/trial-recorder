'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Circle,
  Copy,
  Download,
  Flag,
  Mic,
  MicOff,
  Monitor,
  Pause,
  Pencil,
  Play,
  Square,
  Trash2,
  Video,
  Check,
} from 'lucide-react';

type Marker = { atMs: number; text: string };

type Recording = {
  id: string;
  name: string;
  url: string;
  blob: Blob;
  sizeBytes: number;
  durationMs: number;
  createdAt: Date;
  markers: Marker[];
};

type RecorderState = 'idle' | 'recording' | 'paused';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function formatElapsed(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function defaultName(d: Date) {
  return `build-error-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined') return undefined;
  const candidates = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];
  return candidates.find((c) => MediaRecorder.isTypeSupported(c));
}

export default function RecorderPage() {
  const [state, setState] = useState<RecorderState>('idle');
  const [supported, setSupported] = useState(true);
  const [withMic, setWithMic] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [liveMarkers, setLiveMarkers] = useState<Marker[]>([]);
  const [markerText, setMarkerText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamsRef = useRef<MediaStream[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef(0);
  const pausedTotalRef = useRef(0);
  const pausedAtRef = useRef(0);
  const liveMarkersRef = useRef<Marker[]>([]);
  const withMicUsedRef = useRef(false);

  useEffect(() => {
    liveMarkersRef.current = liveMarkers;
  }, [liveMarkers]);

  useEffect(() => {
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices?.getDisplayMedia ||
      typeof MediaRecorder === 'undefined'
    ) {
      setSupported(false);
    }
  }, []);

  // Warn before closing the tab mid-recording — the video would be lost
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  const currentElapsed = useCallback(() => {
    if (!startedAtRef.current) return 0;
    const pausedExtra =
      pausedAtRef.current > 0 ? Date.now() - pausedAtRef.current : 0;
    return Date.now() - startedAtRef.current - pausedTotalRef.current - pausedExtra;
  }, []);

  const cleanupStreams = useCallback(() => {
    streamsRef.current.forEach((s) => s.getTracks().forEach((t) => t.stop()));
    streamsRef.current = [];
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    if (previewRef.current) previewRef.current.srcObject = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finalize = useCallback(() => {
    const durationMs = currentElapsed();
    const mime = recorderRef.current?.mimeType || 'video/webm';
    const blob = new Blob(chunksRef.current, { type: mime });
    chunksRef.current = [];
    recorderRef.current = null;
    cleanupStreams();

    if (blob.size > 0) {
      const createdAt = new Date();
      const rec: Recording = {
        id: `${createdAt.getTime()}-${Math.floor(Math.random() * 1e6)}`,
        name: defaultName(createdAt),
        url: URL.createObjectURL(blob),
        blob,
        sizeBytes: blob.size,
        durationMs,
        createdAt,
        markers: liveMarkersRef.current,
      };
      setRecordings((prev) => [rec, ...prev]);
      setNotice('Recording saved below — preview it, then download to share.');
    }

    setLiveMarkers([]);
    setMarkerText('');
    startedAtRef.current = 0;
    pausedTotalRef.current = 0;
    pausedAtRef.current = 0;
    setElapsedMs(0);
    setState('idle');
  }, [cleanupStreams, currentElapsed]);

  const stopRecording = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      rec.stop(); // onstop fires finalize()
    } else {
      finalize();
    }
  }, [finalize]);

  const startRecording = useCallback(async () => {
    setError(null);
    setNotice(null);

    let display: MediaStream;
    try {
      display = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        // Also request system/tab audio where the browser supports it
        audio: true,
      });
    } catch (err) {
      const e = err as DOMException;
      if (e?.name === 'NotAllowedError') {
        setError('Screen sharing was cancelled or blocked. Click Start and pick the window with your build output.');
      } else {
        setError(`Could not start screen capture: ${e?.message ?? String(err)}`);
      }
      return;
    }

    streamsRef.current = [display];
    withMicUsedRef.current = false;

    let mic: MediaStream | null = null;
    if (withMic) {
      try {
        mic = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
        streamsRef.current.push(mic);
        withMicUsedRef.current = true;
      } catch {
        setNotice('Microphone unavailable — recording the screen without narration.');
      }
    }

    // Combine the display video with all audio sources. If there is more than
    // one audio track (tab audio + mic) they must be mixed through WebAudio,
    // since MediaRecorder only records the first audio track of a stream.
    const tracks: MediaStreamTrack[] = [...display.getVideoTracks()];
    const audioTracks = [
      ...display.getAudioTracks(),
      ...(mic ? mic.getAudioTracks() : []),
    ];
    if (audioTracks.length > 1) {
      const ctx = new AudioContext();
      const dest = ctx.createMediaStreamDestination();
      audioTracks.forEach((t) =>
        ctx.createMediaStreamSource(new MediaStream([t])).connect(dest)
      );
      audioCtxRef.current = ctx;
      tracks.push(...dest.stream.getAudioTracks());
    } else {
      tracks.push(...audioTracks);
    }

    const combined = new MediaStream(tracks);
    const mimeType = pickMimeType();
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(
        combined,
        mimeType ? { mimeType, videoBitsPerSecond: 5_000_000 } : undefined
      );
    } catch (err) {
      cleanupStreams();
      setError(`Could not start the recorder: ${(err as Error).message}`);
      return;
    }

    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = finalize;
    recorderRef.current = recorder;

    // Ending the share via the browser's own "Stop sharing" bar also stops us
    display.getVideoTracks()[0].addEventListener('ended', () => {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
    });

    if (previewRef.current) {
      previewRef.current.srcObject = display;
      previewRef.current.play().catch(() => {});
    }

    startedAtRef.current = Date.now();
    pausedTotalRef.current = 0;
    pausedAtRef.current = 0;
    setLiveMarkers([]);
    setElapsedMs(0);
    recorder.start(1000);
    setState('recording');
    timerRef.current = setInterval(() => setElapsedMs(currentElapsed()), 250);
  }, [withMic, cleanupStreams, currentElapsed, finalize]);

  const togglePause = useCallback(() => {
    const rec = recorderRef.current;
    if (!rec) return;
    if (rec.state === 'recording') {
      rec.pause();
      pausedAtRef.current = Date.now();
      setState('paused');
    } else if (rec.state === 'paused') {
      rec.resume();
      pausedTotalRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = 0;
      setState('recording');
    }
  }, []);

  const addMarker = useCallback(() => {
    const text = markerText.trim() || 'Error happens here';
    setLiveMarkers((prev) => [...prev, { atMs: currentElapsed(), text }]);
    setMarkerText('');
  }, [markerText, currentElapsed]);

  const deleteRecording = useCallback((id: string) => {
    setRecordings((prev) => {
      const target = prev.find((r) => r.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((r) => r.id !== id);
    });
  }, []);

  const downloadRecording = useCallback((rec: Recording) => {
    const ext = rec.blob.type.includes('mp4') ? 'mp4' : 'webm';
    const a = document.createElement('a');
    a.href = rec.url;
    a.download = `${rec.name}.${ext}`;
    a.click();
  }, []);

  const copyMarkers = useCallback(async (rec: Recording) => {
    const lines = [
      `${rec.name} — ${formatElapsed(rec.durationMs)}, recorded ${rec.createdAt.toLocaleString()}`,
      ...rec.markers.map((m) => `  [${formatElapsed(m.atMs)}] ${m.text}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedId(rec.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setError('Could not copy to clipboard.');
    }
  }, []);

  const commitRename = useCallback(() => {
    setRecordings((prev) =>
      prev.map((r) =>
        r.id === renamingId && renameValue.trim()
          ? { ...r, name: renameValue.trim() }
          : r
      )
    );
    setRenamingId(null);
    setRenameValue('');
  }, [renamingId, renameValue]);

  const isActive = state !== 'idle';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Trial Recorder</h1>
            <p className="text-sm text-slate-400">
              Record your screen while a build fails — share the video instead of typing the errors up.
            </p>
          </div>
        </header>

        {!supported && (
          <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            This browser doesn&apos;t support screen recording. Use a recent desktop Chrome, Edge, or
            Firefox — and note screen capture only works over HTTPS or localhost.
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-6 rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-300">
            {notice}
          </div>
        )}

        {/* Capture panel */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-black">
            <video
              ref={previewRef}
              muted
              playsInline
              className={`aspect-video w-full ${isActive ? 'block' : 'hidden'}`}
            />
            {!isActive && (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 text-slate-500">
                <Monitor className="h-10 w-10" />
                <p className="max-w-sm px-6 text-center text-sm">
                  Hit <span className="text-slate-300">Start recording</span>, then pick the screen,
                  window, or terminal where your build is running.
                </p>
              </div>
            )}
            {isActive && (
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-sm backdrop-blur">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    state === 'recording' ? 'animate-pulse bg-red-500' : 'bg-amber-400'
                  }`}
                />
                <span className="tabular-nums">{formatElapsed(elapsedMs)}</span>
                {state === 'paused' && <span className="text-amber-300">paused</span>}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {!isActive ? (
              <>
                <button
                  onClick={startRecording}
                  disabled={!supported}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Circle className="h-4 w-4 fill-current" />
                  Start recording
                </button>
                <button
                  onClick={() => setWithMic((v) => !v)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition ${
                    withMic
                      ? 'border-sky-500/40 bg-sky-500/10 text-sky-300'
                      : 'border-slate-700 bg-slate-800/60 text-slate-400'
                  }`}
                >
                  {withMic ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  {withMic ? 'Mic narration on' : 'Mic narration off'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={togglePause}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm transition hover:bg-slate-700"
                >
                  {state === 'recording' ? (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Resume
                    </>
                  )}
                </button>
                <button
                  onClick={stopRecording}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-5 py-2.5 font-medium text-slate-900 transition hover:bg-white"
                >
                  <Square className="h-4 w-4" />
                  Stop &amp; save
                </button>
              </>
            )}
          </div>

          {/* Marker input while recording */}
          {isActive && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={markerText}
                  onChange={(e) => setMarkerText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addMarker()}
                  placeholder="e.g. TypeError in webpack output"
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-600 focus:border-sky-500 focus:outline-none"
                />
                <button
                  onClick={addMarker}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 transition hover:bg-amber-500/20"
                >
                  <Flag className="h-4 w-4" />
                  Mark error
                </button>
              </div>
              {liveMarkers.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-slate-400">
                  {liveMarkers.map((m, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="tabular-nums text-amber-400">[{formatElapsed(m.atMs)}]</span>
                      <span>{m.text}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs text-slate-600">
                When the error appears on screen, drop a marker — the timestamps are saved with the
                recording so reviewers can jump straight to it.
              </p>
            </div>
          )}
        </section>

        {/* Recordings list */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-500">
            Recordings this session {recordings.length > 0 && `(${recordings.length})`}
          </h2>
          {recordings.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-sm text-slate-600">
              Nothing recorded yet. Recordings stay on this page until you download them — nothing is
              uploaded anywhere.
            </p>
          ) : (
            <ul className="space-y-4">
              {recordings.map((rec) => (
                <li key={rec.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
                  <video src={rec.url} controls playsInline className="aspect-video w-full bg-black" />
                  <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        {renamingId === rec.id ? (
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && commitRename()}
                            onBlur={commitRename}
                            className="w-64 max-w-full rounded-lg border border-sky-500 bg-slate-950 px-2 py-1 text-sm focus:outline-none"
                          />
                        ) : (
                          <button
                            onClick={() => {
                              setRenamingId(rec.id);
                              setRenameValue(rec.name);
                            }}
                            className="group inline-flex items-center gap-2 text-left font-medium text-slate-200 hover:text-white"
                            title="Rename"
                          >
                            <span className="truncate">{rec.name}</span>
                            <Pencil className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-400" />
                          </button>
                        )}
                        <p className="mt-0.5 text-xs text-slate-500">
                          {formatElapsed(rec.durationMs)} · {formatSize(rec.sizeBytes)} ·{' '}
                          {rec.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadRecording(rec)}
                          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        {rec.markers.length > 0 && (
                          <button
                            onClick={() => copyMarkers(rec)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                            title="Copy error timestamps"
                          >
                            {copiedId === rec.id ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            Timestamps
                          </button>
                        )}
                        <button
                          onClick={() => deleteRecording(rec.id)}
                          className="rounded-lg border border-slate-800 p-2 text-slate-500 transition hover:border-red-500/40 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {rec.markers.length > 0 && (
                      <ul className="mt-3 space-y-1 border-t border-slate-800 pt-3 text-sm text-slate-400">
                        {rec.markers.map((m, i) => (
                          <li key={i} className="flex items-baseline gap-2">
                            <Flag className="h-3 w-3 shrink-0 translate-y-0.5 text-amber-400" />
                            <span className="tabular-nums text-amber-400">[{formatElapsed(m.atMs)}]</span>
                            <span>{m.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Tips */}
        <section className="mt-10 rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5 text-sm text-slate-400">
          <h2 className="mb-2 font-medium text-slate-300">Tips for capturing build errors</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Start recording <em>before</em> you kick off the build, so the whole failure is on video.
            </li>
            <li>
              Share a specific <strong>window</strong> (your terminal or IDE) rather than the whole
              screen — smaller file, no accidental notifications in the shot.
            </li>
            <li>
              In Chrome or Edge, sharing a <strong>tab</strong> lets you tick “also share tab audio”.
              Mic narration works everywhere when the toggle is on.
            </li>
            <li>
              Recordings never leave your machine — they exist only on this page until you hit
              Download, and are gone when you close the tab.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
