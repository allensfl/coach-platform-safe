export interface Document {
  id: string
  title: string
  type: 'pdf' | 'doc' | 'worksheet' | 'template' | 'contract' | 'report'
  category: 'coaching' | 'admin' | 'client' | 'template' | 'legal'
  fileUrl?: string
  content?: string
  clientId?: string
  sessionId?: string
  tags: string[]
  size?: number
  createdAt: Date
  updatedAt: Date
  isShared: boolean
  sharedWith?: string[]
}

export interface DocumentTemplate {
  id: string
  name: string
  type: 'coaching-plan' | 'session-notes' | 'client-intake' | 'progress-report'
  content: string
  variables: string[]
}
