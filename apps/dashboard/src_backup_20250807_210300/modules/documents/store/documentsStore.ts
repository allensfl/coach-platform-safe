import { create } from 'zustand'
import { Document, DocumentTemplate } from '../types/documents.types'

interface DocumentsState {
  documents: Document[]
  templates: DocumentTemplate[]
  isLoading: boolean
  
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  deleteDocument: (id: string) => void
  shareDocument: (id: string, userIds: string[]) => void
  getDocumentsByClient: (clientId: string) => Document[]
  getDocumentsByType: (type: Document['type']) => Document[]
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [
    {
      id: '1',
      title: 'Coaching Intake Form',
      type: 'worksheet',
      category: 'coaching',
      tags: ['intake', 'new-client'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isShared: false
    },
    {
      id: '2',
      title: 'Session Notes Template',
      type: 'template',
      category: 'template',
      tags: ['notes', 'session'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isShared: true
    }
  ],
  templates: [
    {
      id: '1',
      name: 'Standard Coaching Plan',
      type: 'coaching-plan',
      content: 'Goals:\n1. \n2. \n\nAction Items:\n- \n- ',
      variables: ['client_name', 'goals', 'timeline']
    }
  ],
  isLoading: false,
  
  addDocument: (doc) => set((state) => ({
    documents: [...state.documents, {
      ...doc,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  })),
  
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map(doc =>
      doc.id === id ? { ...doc, ...updates, updatedAt: new Date() } : doc
    )
  })),
  
  deleteDocument: (id) => set((state) => ({
    documents: state.documents.filter(doc => doc.id !== id)
  })),
  
  shareDocument: (id, userIds) => set((state) => ({
    documents: state.documents.map(doc =>
      doc.id === id ? { ...doc, isShared: true, sharedWith: userIds } : doc
    )
  })),
  
  getDocumentsByClient: (clientId) => get().documents.filter(doc => doc.clientId === clientId),
  getDocumentsByType: (type) => get().documents.filter(doc => doc.type === type)
}))
