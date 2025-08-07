import { create } from 'zustand';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  topics: string[];
  startDate: Date;
  status: 'active' | 'inactive';
  totalSessions: number;
  totalRevenue: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  isBusinessClient: boolean;
  businessName?: string;
}

interface ClientStore {
  clients: Client[];
  deleteClient: (id: string) => void;
  searchClients: (term: string) => Client[];
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Müller',
      email: 'sarah@example.com',
      phone: '+41 44 123 45 67',
      address: {
        street: 'Bahnhofstrasse 123',
        city: 'Zürich',
        postalCode: '8001',
        country: 'Schweiz'
      },
      topics: ['Teamführung', 'Work-Life-Balance'],
      startDate: new Date('2024-01-15'),
      status: 'active',
      totalSessions: 12,
      totalRevenue: 1800,
      currency: 'CHF',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      isBusinessClient: false
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Schmidt',
      email: 'michael@example.com',
      phone: '+41 44 987 65 43',
      address: {
        street: 'Limmatstrasse 456',
        city: 'Zürich',
        postalCode: '8005',
        country: 'Schweiz'
      },
      topics: ['Unternehmensstrategie', 'Delegation'],
      startDate: new Date('2024-02-01'),
      status: 'active',
      totalSessions: 8,
      totalRevenue: 2400,
      currency: 'CHF',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      isBusinessClient: true,
      businessName: 'Schmidt Consulting AG'
    }
  ],
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(client => client.id !== id)
  })),
  searchClients: (term) => {
    const clients = get().clients;
    return clients.filter(client => 
      client.firstName.toLowerCase().includes(term.toLowerCase()) ||
      client.lastName.toLowerCase().includes(term.toLowerCase()) ||
      client.email.toLowerCase().includes(term.toLowerCase())
    );
  }
}));
