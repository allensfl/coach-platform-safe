export interface Client {
  id: string
  
  // Basic Info
  firstName: string
  lastName: string
  title?: string // Dr., Prof., etc.
  
  // Contact
  email: string
  phone?: string
  mobile?: string
  
  // Address
  street?: string
  houseNumber?: string
  zipCode?: string
  city?: string
  country?: string
  
  // Company
  company?: string
  position?: string
  department?: string
  
  // Personal
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'diverse' | 'prefer_not_to_say'
  
  // Coaching
  status: 'active' | 'inactive' | 'pending' | 'paused'
  coachingStart?: string
  coachingType?: 'business' | 'personal' | 'leadership' | 'career' | 'team'
  goals?: string[]
  
  // Communication Preferences
  preferredContactMethod?: 'email' | 'phone' | 'sms' | 'teams' | 'zoom'
  language?: 'de' | 'en' | 'fr' | 'it'
  timezone?: string
  
  // Emergency Contact
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
    email?: string
  }
  
  // Session Preferences
  preferredSessionDuration?: number // minutes
  preferredDayTime?: 'morning' | 'afternoon' | 'evening'
  sessionFrequency?: 'weekly' | 'bi-weekly' | 'monthly'
  
  // Internal Notes
  internalNotes?: string
  tags?: string[]
  
  // System
  createdAt: string
  updatedAt?: string
  lastContactAt?: string
  
  // Relationships
  sessions?: Session[]
  notes?: Note[]
  documents?: Document[]
}

export interface Session {
  id: string
  title: string
  date: string
  startTime?: string
  endTime?: string
  duration: number // in minutes
  type: 'individual' | 'group' | 'workshop' | 'intake' | 'follow-up'
  location?: 'office' | 'online' | 'client-location' | 'external'
  notes: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  meetingLink?: string
  recordingUrl?: string
  homeworkAssigned?: string
  nextSteps?: string
  createdAt: string
  updatedAt?: string
}

export interface Note {
  id: string
  content: string
  type: 'general' | 'session' | 'goal' | 'concern' | 'achievement' | 'reminder'
  priority?: 'low' | 'medium' | 'high'
  isPrivate?: boolean
  createdAt: string
  updatedAt?: string
}

export interface Document {
  id: string
  name: string
  type: 'contract' | 'assessment' | 'worksheet' | 'certificate' | 'other'
  url?: string
  size?: number
  uploadedAt: string
}

// Form validation schemas
export interface ClientFormData {
  // Personal Info
  personalInfo: {
    firstName: string
    lastName: string
    title?: string
    dateOfBirth?: string
    gender?: string
  }
  
  // Contact Info
  contactInfo: {
    email: string
    phone?: string
    mobile?: string
    preferredContactMethod?: string
    language?: string
  }
  
  // Address
  addressInfo: {
    street?: string
    houseNumber?: string
    zipCode?: string
    city?: string
    country?: string
  }
  
  // Company
  companyInfo: {
    company?: string
    position?: string
    department?: string
  }
  
  // Coaching
  coachingInfo: {
    status: string
    coachingStart?: string
    coachingType?: string
    goals?: string[]
    sessionFrequency?: string
    preferredSessionDuration?: number
    preferredDayTime?: string
  }
  
  // Emergency Contact
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
    email?: string
  }
  
  // Internal
  internalInfo: {
    internalNotes?: string
    tags?: string[]
  }
}