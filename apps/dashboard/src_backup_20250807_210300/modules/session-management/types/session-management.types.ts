export interface Session {
  id: string
  title: string
  clientId: string
  date: Date
  duration: number
  type: 'individual' | 'group' | 'workshop'
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  location: 'online' | 'office' | 'client-location'
  meetingUrl?: string
  notes?: string
  recordings?: string[]
  materials?: string[]
}

export interface SessionTemplate {
  id: string
  name: string
  duration: number
  type: 'individual' | 'group' | 'workshop'
  agenda: string[]
  materials: string[]
}
