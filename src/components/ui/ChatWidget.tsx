'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, User, Trash2 } from 'lucide-react'

type Message = { from: 'bot' | 'user'; text: string; timestamp: number }

const STORAGE_KEY = 'barclays-chat-history'
const SUBMISSIONS_KEY = 'barclays-chat-submissions'

const AUTO_REPLIES: Record<string, string> = {
  'account': 'For account queries, you can manage your account in Online Banking or call us on 0345 734 5345. You can also visit our Accounts page to compare current accounts.',
  'mortgage': 'For mortgage enquiries, visit our Mortgages page to use our calculator, or speak to a mortgage adviser on 0345 734 5345. We offer rates from 4.15% for 2-year fixes.',
  'card': 'For credit card queries, visit our Barclaycard page. We offer rewards cards, balance transfers with 0% for up to 25 months, and credit builder cards.',
  'credit card': 'Check out our Barclaycard range — from Avios Plus for travellers to Platinum for 0% balance transfers. Visit /personal/barclaycard to compare.',
  'loan': 'Our personal loans range from £1,000 to £50,000. Representative APR from 6.9%. Use our loan calculator at /personal/loans to get a quote.',
  'fraud': 'If you suspect fraud, call us immediately on 0800 400 100 (24/7). Never share your PIN, passwords, or security codes. We will never ask you to move money to a "safe account".',
  'scam': 'Report scams immediately on 0800 400 100. Remember: Barclays will never ask you to move money, share your PIN, or download software.',
  'branch': 'We have 800+ branches across the UK. Use our Branch Finder to locate your nearest branch and check opening hours.',
  'help': 'I can help with accounts, mortgages, cards, loans, ISAs, investments, overdrafts, fraud concerns, premier banking, and more. What do you need?',
  'isa': 'Our Cash ISAs offer up to 3.85% AER (Premier). The ISA deadline is 5 April 2026 — don\'t miss your £20,000 allowance! Visit /personal/isas for details.',
  'savings': 'We offer instant access savings, fixed-rate bonds, and Cash ISAs. Visit our Savings page to compare rates and find the best option for you.',
  'investment': 'Invest with Barclays Smart Investor from just 0.15% per year. Choose from Investment ISAs, General Investment Accounts, or SIPPs. Capital at risk.',
  'overdraft': 'Arranged overdrafts are available at 35% EAR (variable). Premier customers get the first £500 interest-free. Apply in the app or Online Banking.',
  'premier': 'Premier Banking requires £75,000+ income or £100,000+ in savings/investments. Benefits include worldwide travel insurance, airport lounge access, and a dedicated relationship manager.',
  'switch': 'Switch to Barclays and earn up to £400 (Premier) or £200 (Bank Account). Use the Current Account Switch Service — it takes just 7 working days.',
  'app': 'The Barclays app lets you check balances, send money, freeze cards, set spending limits, and more. Download from the App Store or Google Play.',
  'transfer': 'You can make transfers instantly via the Barclays app or Online Banking. For international payments, use our International Transfers service.',
  'password': 'To reset your Online Banking password, go to the login page and click "Forgotten your details?". You\'ll need your debit card and PINsentry device.',
  'lost': 'If your card is lost or stolen, freeze it immediately in the Barclays app, or call 0800 400 100 (24/7). We\'ll send a replacement in 3-5 working days.',
  'contact': 'Call us on 0345 734 5345 (Personal) or 0800 151 0900 (Barclaycard). Premier customers: 0800 400 100. You can also send a secure message via the app.',
  'open': 'You can open a new account online or in the app in minutes. Visit /personal/accounts to compare options and apply.',
  'wealth': 'Our Wealth Management team helps clients with £500,000+ in investable assets. Services include financial planning, portfolio management, and estate planning.',
  'hello': 'Hello! Welcome to Barclays. How can I help you today? I can assist with accounts, cards, loans, mortgages, ISAs, and more.',
  'hi': 'Hi there! How can I help you today? Ask me about any Barclays product or service.',
  'thank': 'You\'re welcome! Is there anything else I can help you with today?',
}

const QUICK_REPLIES = [
  'Accounts',
  'Mortgages',
  'Credit cards',
  'Help',
]

function getReply(msg: string): string {
  const lower = msg.toLowerCase()
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (lower.includes(key)) return reply
  }
  return "Thank you for your message. I've recorded your enquiry. For detailed assistance, please call us on 0345 734 5345 or visit your nearest branch. Is there anything else I can help with?"
}

function loadHistory(): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch { /* ignore quota errors */ }
}

function recordSubmission(userMsg: string) {
  try {
    const stored = localStorage.getItem(SUBMISSIONS_KEY)
    const submissions: { message: string; timestamp: string }[] = stored ? JSON.parse(stored) : []
    submissions.push({ message: userMsg, timestamp: new Date().toISOString() })
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions))
  } catch { /* ignore */ }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  // Load history on mount
  useEffect(() => {
    const history = loadHistory()
    if (history.length > 0) {
      setMessages(history)
    } else {
      setMessages([{ from: 'bot', text: "Hello! I'm Barclays' virtual assistant. How can I help you today? You can ask about accounts, mortgages, cards, loans, ISAs, and more.", timestamp: Date.now() }])
    }
    setHasLoaded(true)
  }, [])

  // Save history when messages change
  useEffect(() => {
    if (hasLoaded && messages.length > 0) {
      saveHistory(messages)
    }
  }, [messages, hasLoaded])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = useCallback((text?: string) => {
    const userMsg = (text || input).trim()
    if (!userMsg) return

    // Record the user's input
    recordSubmission(userMsg)

    const userMessage: Message = { from: 'user', text: userMsg, timestamp: Date.now() }
    setMessages(m => [...m, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    const delay = 600 + Math.random() * 800
    setTimeout(() => {
      setIsTyping(false)
      const reply = getReply(userMsg)
      setMessages(m => [...m, { from: 'bot', text: reply, timestamp: Date.now() }])
    }, delay)
  }, [input])

  const clearHistory = () => {
    const initial: Message[] = [{ from: 'bot', text: "Chat history cleared. How can I help you today?", timestamp: Date.now() }]
    setMessages(initial)
    saveHistory(initial)
    try { localStorage.removeItem(SUBMISSIONS_KEY) } catch { /* ignore */ }
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
        <div className="fixed bottom-4 right-4 z-[90] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: '520px' }}>
          {/* Header */}
          <div className="bg-barclays-blue text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-barclays-teal rounded-full flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">Barclays Assistant</p>
                <p className="text-xs text-blue-300">
                  {isTyping ? 'Typing...' : 'Online now'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearHistory} className="text-blue-300 hover:text-white" title="Clear chat history">
                <Trash2 size={16} />
              </button>
              <button onClick={() => setOpen(false)} className="text-blue-300 hover:text-white">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-barclays-gray-light">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.from === 'bot' ? 'bg-barclays-teal' : 'bg-barclays-blue'}`}>
                    {m.from === 'bot' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'bot'
                        ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                        : 'bg-barclays-teal text-white rounded-tr-sm'
                    }`}>
                      {m.text}
                    </div>
                    <p className={`text-[10px] text-gray-400 mt-0.5 ${m.from === 'user' ? 'text-right' : ''}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-barclays-teal">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && !isTyping && (
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 flex-wrap">
              {QUICK_REPLIES.map(qr => (
                <button
                  key={qr}
                  onClick={() => send(qr)}
                  className="text-xs bg-barclays-teal/10 text-barclays-teal font-medium px-3 py-1.5 rounded-full hover:bg-barclays-teal/20 transition-colors"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

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
              onClick={() => send()}
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
