// Demo authentication for testing without a real Supabase project
// In production, replace with real Supabase auth calls

export type DemoUser = {
  id: string
  email: string
  name: string
  accountType: 'personal' | 'corporate'
}

const DEMO_USERS: DemoUser[] = [
  { id: '1', email: 'demo@barclays-demo.com', name: 'John Smith', accountType: 'personal' },
  { id: '2', email: 'corporate@barclays-demo.com', name: 'Acme Corp', accountType: 'corporate' },
]

const DEMO_PASSWORD = 'Demo1234!'

export function demoLogin(email: string, password: string): DemoUser | null {
  if (password !== DEMO_PASSWORD) return null
  return DEMO_USERS.find(u => u.email === email) ?? null
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('demo_user')
  if (!stored) return null
  try { return JSON.parse(stored) } catch { return null }
}

export function setDemoUser(user: DemoUser) {
  localStorage.setItem('demo_user', JSON.stringify(user))
}

export function clearDemoUser() {
  localStorage.removeItem('demo_user')
}

export const DEMO_ACCOUNT = {
  sortCode: '20-00-00',
  accountNumber: '12345678',
  balance: 4821.50,
  availableBalance: 4521.50,
  transactions: [
    { id: '1', date: '2026-03-14', description: 'TESCO STORES 3456', amount: -42.18, type: 'debit' },
    { id: '2', date: '2026-03-13', description: 'SALARY - EMPLOYER LTD', amount: 3200.00, type: 'credit' },
    { id: '3', date: '2026-03-12', description: 'AMAZON.CO.UK', amount: -29.99, type: 'debit' },
    { id: '4', date: '2026-03-11', description: 'NETFLIX.COM', amount: -17.99, type: 'debit' },
    { id: '5', date: '2026-03-10', description: 'DIRECT DEBIT - BT GROUP', amount: -45.00, type: 'debit' },
    { id: '6', date: '2026-03-08', description: 'ATM WITHDRAWAL', amount: -100.00, type: 'debit' },
    { id: '7', date: '2026-03-07', description: 'TRANSFER FROM J SMITH', amount: 250.00, type: 'credit' },
    { id: '8', date: '2026-03-05', description: 'SAINSBURYS SUPERSTORE', amount: -63.45, type: 'debit' },
  ]
}
