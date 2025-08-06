import { create } from 'zustand'
import { Client, ClientSession } from '../types/client-management.types'

interface ClientManagementState {
  clients: Client[]
  sessions: ClientSession[]
  isLoading: boolean
  
  // Actions
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void
  addSession: (session: Omit<ClientSession, 'id'>) => void
  updateSession: (id: string, updates: Partial<ClientSession>) => void
  
  // Getters
  getActiveClients: () => Client[]
  getClientSessions: (clientId: string) => ClientSession[]
}

export const useClientManagementStore = create<ClientManagementState>((set, get) => ({
  clients: [
    {
      id: '1',
      name: 'Max Mustermann',
      email: 'max@example.com',
      phone: '+49 123 456789',
      company: 'Beispiel GmbH',
      status: 'active',
      tags: ['VIP', 'Executive'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  sessions: [],
  isLoading: false,
  
  addClient: (client) => set((state) => ({
    clients: [...state.clients, {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  })),
  
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(client =>
      client.id === id ? { ...client, ...updates, updatedAt: new Date() } : client
    )
  })),
  
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(client => client.id !== id)
  })),
  
  addSession: (session) => set((state) => ({
    sessions: [...state.sessions, { ...session, id: Date.now().toString() }]
  })),
  
  updateSession: (id, updates) => set((state) => ({
    sessions: state.sessions.map(session =>
      session.id === id ? { ...session, ...updates } : session
    )
  })),
  
  getActiveClients: () => get().clients.filter(client => client.status === 'active'),
  getClientSessions: (clientId) => get().sessions.filter(session => session.clientId === clientId)
}))
