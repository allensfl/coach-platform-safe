export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'active' | 'inactive' | 'prospect'
  tags: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface ClientSession {
  id: string
  clientId: string
  date: Date
  duration: number
  type: 'coaching' | 'consultation' | 'workshop'
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}
