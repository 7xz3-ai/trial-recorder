import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trial Recorder — Capture build errors on video",
  description:
    "Record your screen while a build fails, drop timestamped markers on the errors, and download a video to share instead of typing everything up.",
};

export default function RecorderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
