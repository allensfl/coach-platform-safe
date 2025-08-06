export interface UserSettings {
  id: string
  userId: string
  profile: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
    bio?: string
    title?: string
  }
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    timezone: string
    dateFormat: string
    currency: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
      sessionReminders: boolean
      clientUpdates: boolean
    }
  }
  business: {
    companyName?: string
    website?: string
    address?: string
    vatNumber?: string
    invoicePrefix?: string
    defaultSessionDuration: number
    defaultSessionPrice: number
  }
  integrations: {
    calendar: {
      provider?: 'google' | 'outlook' | 'apple'
      connected: boolean
      syncEnabled: boolean
    }
    videoConferencing: {
      provider?: 'zoom' | 'teams' | 'meet'
      connected: boolean
      autoGenerateLinks: boolean
    }
    payment: {
      provider?: 'stripe' | 'paypal' | 'square'
      connected: boolean
      autoInvoice: boolean
    }
  }
}
