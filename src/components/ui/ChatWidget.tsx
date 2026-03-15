'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

type Message = { from: 'bot' | 'user'; text: string }

const AUTO_REPLIES: Record<string, string> = {
  'account': 'For account queries, you can manage your account in Online Banking or call us on 0345 734 5345.',
  'mortgage': 'For mortgage enquiries, visit our Mortgages page or speak to a mortgage adviser on 0345 734 5345.',
  'card': 'For credit card queries, visit our Credit Cards page or call Barclaycard on 0800 151 0900.',
  'loan': 'For loan enquiries, check our personal loans page for rates and eligibility, or call 0345 734 5345.',
  'fraud': 'If you suspect fraud, call us immediately on 0800 400 100. Never share your PIN or security codes.',
  'branch': 'Use our Branch Finder page to locate your nearest Barclays branch and check opening hours.',
  'help': 'I can help with accounts, mortgages, cards, loans, fraud concerns, and branch information. What do you need?',
}

function getReply(msg: string): string {
  const lower = msg.toLowerCase()
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (lower.includes(key)) return reply
  }
  return "Thank you for your message. For detailed assistance, please call us on 0345 734 5345 or visit your nearest branch. Is there anything else I can help with?"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hello! I'm Barclays' virtual assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(m => [...m, { from: 'user', text: userMsg }])
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: getReply(userMsg) }])
    }, 800)
  }

  return (
    <>
      {/* Chat bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-20 z-50 w-14 h-14 bg-barclays-teal text-white rounded-full shadow-lg flex items-center justify-center hover:bg-barclays-teal-dark transition-all hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 z-[90] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-barclays-blue text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-barclays-teal rounded-full flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">Barclays Assistant</p>
                <p className="text-xs text-blue-300">Online now</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-blue-300 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-barclays-gray-light">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.from === 'bot' ? 'bg-barclays-teal' : 'bg-barclays-blue'}`}>
                    {m.from === 'bot' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
                  </div>
                  <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === 'bot'
                      ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                      : 'bg-barclays-teal text-white rounded-tr-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex items-center gap-2 flex-shrink-0 bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-barclays-teal"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-9 h-9 bg-barclays-teal text-white rounded-full flex items-center justify-center hover:bg-barclays-teal-dark transition-colors disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
