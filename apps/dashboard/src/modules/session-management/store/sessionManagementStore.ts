import { create } from 'zustand'
import { Session, SessionTemplate } from '../types/session-management.types'

interface SessionManagementState {
  sessions: Session[]
  templates: SessionTemplate[]
  isLoading: boolean
  
  // Actions
  addSession: (session: Omit<Session, 'id'>) => void
  updateSession: (id: string, updates: Partial<Session>) => void
  deleteSession: (id: string) => void
  addTemplate: (template: Omit<SessionTemplate, 'id'>) => void
  
  // Getters
  getTodaySessions: () => Session[]
  getUpcomingSessions: () => Session[]
  getSessionsByClient: (clientId: string) => Session[]
}

export const useSessionManagementStore = create<SessionManagementState>((set, get) => ({
  sessions: [
    {
      id: '1',
      title: 'Executive Coaching Session',
      clientId: '1',
      date: new Date(),
      duration: 60,
      type: 'individual',
      status: 'scheduled',
      location: 'online',
      meetingUrl: 'https://zoom.us/meeting/123'
    }
  ],
  templates: [
    {
      id: '1',
      name: 'Standard Coaching Session',
      duration: 60,
      type: 'individual',
      agenda: ['Check-in', 'Goal Setting', 'Action Planning', 'Wrap-up'],
      materials: ['Coaching Worksheet', 'Action Plan Template']
    }
  ],
  isLoading: false,
  
  addSession: (session) => set((state) => ({
    sessions: [...state.sessions, { ...session, id: Date.now().toString() }]
  })),
  
  updateSession: (id, updates) => set((state) => ({
    sessions: state.sessions.map(session =>
      session.id === id ? { ...session, ...updates } : session
    )
  })),
  
  deleteSession: (id) => set((state) => ({
    sessions: state.sessions.filter(session => session.id !== id)
  })),
  
  addTemplate: (template) => set((state) => ({
    templates: [...state.templates, { ...template, id: Date.now().toString() }]
  })),
  
  getTodaySessions: () => {
    const today = new Date()
    return get().sessions.filter(session => 
      session.date.toDateString() === today.toDateString()
    )
  },
  
  getUpcomingSessions: () => {
    const now = new Date()
    return get().sessions.filter(session => session.date > now)
  },
  
  getSessionsByClient: (clientId) => get().sessions.filter(session => session.clientId === clientId)
}))
