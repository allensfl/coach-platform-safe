import { create } from 'zustand'
import { UserSettings } from '../types/settings.types'

interface SettingsState {
  settings: UserSettings
  isLoading: boolean
  
  updateProfile: (profile: Partial<UserSettings['profile']>) => void
  updatePreferences: (preferences: Partial<UserSettings['preferences']>) => void
  updateBusiness: (business: Partial<UserSettings['business']>) => void
  updateIntegrations: (integrations: Partial<UserSettings['integrations']>) => void
  resetToDefaults: () => void
}

const DEFAULT_SETTINGS: UserSettings = {
  id: '1',
  userId: '1',
  profile: {
    firstName: 'Coach',
    lastName: 'Professional',
    email: 'coach@example.com',
    title: 'Professional Coach'
  },
  preferences: {
    theme: 'light',
    language: 'de',
    timezone: 'Europe/Berlin',
    dateFormat: 'DD.MM.YYYY',
    currency: 'EUR',
    notifications: {
      email: true,
      push: true,
      sms: false,
      sessionReminders: true,
      clientUpdates: true
    }
  },
  business: {
    companyName: 'Professional Coaching',
    defaultSessionDuration: 60,
    defaultSessionPrice: 120
  },
  integrations: {
    calendar: {
      connected: false,
      syncEnabled: false
    },
    videoConferencing: {
      connected: false,
      autoGenerateLinks: false
    },
    payment: {
      connected: false,
      autoInvoice: false
    }
  }
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULT_SETTINGS,
  isLoading: false,
  
  updateProfile: (profile) => set((state) => ({
    settings: {
      ...state.settings,
      profile: { ...state.settings.profile, ...profile }
    }
  })),
  
  updatePreferences: (preferences) => set((state) => ({
    settings: {
      ...state.settings,
      preferences: { ...state.settings.preferences, ...preferences }
    }
  })),
  
  updateBusiness: (business) => set((state) => ({
    settings: {
      ...state.settings,
      business: { ...state.settings.business, ...business }
    }
  })),
  
  updateIntegrations: (integrations) => set((state) => ({
    settings: {
      ...state.settings,
      integrations: { ...state.settings.integrations, ...integrations }
    }
  })),
  
  resetToDefaults: () => set({ settings: DEFAULT_SETTINGS })
}))
