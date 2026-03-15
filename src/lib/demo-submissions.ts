// In-memory store for demo form submissions (no real DB needed for demo mode)

export type Enquiry = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

export type Application = {
  id: string
  productType: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  annualIncome: string
  status: string
  createdAt: string
}

const enquiries: Enquiry[] = []
const applications: Application[] = []

export function submitEnquiry(data: Omit<Enquiry, 'id' | 'createdAt'>): Enquiry {
  const entry: Enquiry = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  enquiries.push(entry)
  return entry
}

export function submitApplication(data: Omit<Application, 'id' | 'status' | 'createdAt'>): Application {
  const entry: Application = { ...data, id: crypto.randomUUID(), status: 'pending', createdAt: new Date().toISOString() }
  applications.push(entry)
  return entry
}
