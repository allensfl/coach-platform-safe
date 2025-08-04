import { create } from 'zustand'
import { Client, Session, Note } from '../types/client.types'

interface ClientStore {
  clients: Client[]
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void
  deleteClient: (id: string) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  getClientById: (id: string) => Client | undefined
  searchClients: (searchTerm: string) => Client[]
  addSession: (clientId: string, session: Omit<Session, 'id' | 'createdAt'>) => void
  addNote: (clientId: string, content: string) => void
}

// Mock data with sessions and notes
const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    phone: '+49 123 456789',
    company: 'Tech GmbH',
    status: 'active',
    createdAt: '2024-01-15',
    sessions: [
      {
        id: 's1',
        title: 'Kickoff Session',
        date: '2024-07-20',
        duration: 90,
        notes: 'Sehr motiviert, klare Ziele definiert. Fokus auf Leadership-Skills.',
        status: 'completed',
        createdAt: '2024-07-20'
      },
      {
        id: 's2',
        title: 'Fortschrittsgespräch',
        date: '2024-07-27',
        duration: 60,
        notes: 'Gute Fortschritte bei Kommunikation. Nächste Schritte besprochen.',
        status: 'completed',
        createdAt: '2024-07-27'
      }
    ],
    notes: [
      {
        id: 'n1',
        content: 'Sehr engagiert und aufgeschlossen. Hat bereits eigene Ideen entwickelt.',
        createdAt: '2024-07-15'
      },
      {
        id: 'n2',
        content: 'Reminder: Will bis Ende August seine Präsentationsskills verbessern.',
        createdAt: '2024-07-22'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Anna',
    lastName: 'Schmidt',
    email: 'anna@company.com',
    phone: '+49 987 654321',
    status: 'active',
    createdAt: '2024-02-20',
    sessions: [
      {
        id: 's3',
        title: 'Erstgespräch',
        date: '2024-07-25',
        duration: 60,
        notes: 'Work-Life-Balance als Hauptthema. Sehr reflektiert.',
        status: 'completed',
        createdAt: '2024-07-25'
      }
    ],
    notes: [
      {
        id: 'n3',
        content: 'Arbeitet viel mit internationalen Teams. Zeitmanagement ist ein Thema.',
        createdAt: '2024-07-25'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Tom',
    lastName: 'Weber',
    email: 'tom@business.de',
    company: 'Consulting AG',
    status: 'inactive',
    createdAt: '2024-03-10',
    sessions: [],
    notes: []
  }
]

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: mockClients,

  addClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      sessions: [],
      notes: []
    }
    set((state) => ({
      clients: [...state.clients, newClient]
    }))
  },

  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter(client => client.id !== id)
    }))
  },

  updateClient: (id, updates) => {
    set((state) => ({
      clients: state.clients.map(client =>
        client.id === id ? { ...client, ...updates } : client
      )
    }))
  },

  getClientById: (id) => {
    const { clients } = get()
    return clients.find(client => client.id === id)
  },

  searchClients: (searchTerm) => {
    const { clients } = get()
    if (!searchTerm.trim()) {
      return clients
    }
    
    const term = searchTerm.toLowerCase()
    return clients.filter(client =>
      client.firstName.toLowerCase().includes(term) ||
      client.lastName.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      (client.company && client.company.toLowerCase().includes(term))
    )
  },

  addSession: (clientId, sessionData) => {
    const newSession: Session = {
      ...sessionData,
      id: `s${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    }

    set((state) => ({
      clients: state.clients.map(client =>
        client.id === clientId
          ? {
              ...client,
              sessions: [...(client.sessions || []), newSession]
            }
          : client
      )
    }))
  },

  addNote: (clientId, content) => {
    const newNote: Note = {
      id: `n${Date.now()}`,
      content,
      createdAt: new Date().toISOString().split('T')[0]
    }

    set((state) => ({
      clients: state.clients.map(client =>
        client.id === clientId
          ? {
              ...client,
              notes: [...(client.notes || []), newNote]
            }
          : client
      )
    }))
  }
}))