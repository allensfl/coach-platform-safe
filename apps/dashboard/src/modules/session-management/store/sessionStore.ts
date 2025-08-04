import { create } from 'zustand'

export interface Session {
  id: string
  clientId: string
  title: string
  description?: string
  date: string
  startTime?: string
  endTime?: string
  duration: number // minutes
  type: 'individual' | 'group' | 'workshop' | 'intake' | 'follow-up' | 'check-in'
  location: 'office' | 'online' | 'client-location' | 'external'
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
  
  // Pre-session
  agenda?: string[]
  objectives?: string[]
  preparationNotes?: string
  materialsNeeded?: string[]
  
  // During session
  sessionNotes?: string
  keyInsights?: string[]
  breakthroughs?: string[]
  challenges?: string[]
  
  // Post-session
  summary?: string
  homework?: string[]
  nextSteps?: string[]
  followUpDate?: string
  
  // Technical
  meetingLink?: string
  recordingUrl?: string
  documentUrls?: string[]
  
  // Feedback
  clientFeedback?: {
    rating: number // 1-5
    comments?: string
    goalProgress?: number // 1-10
  }
  coachReflection?: string
  
  // System
  createdAt: string
  updatedAt?: string
  createdBy?: string
}

export interface SessionTemplate {
  id: string
  name: string
  description: string
  type: Session['type']
  duration: number
  defaultAgenda: string[]
  defaultObjectives: string[]
  materialsNeeded?: string[]
  isActive: boolean
}

interface SessionStore {
  sessions: Session[]
  templates: SessionTemplate[]
  
  // Session CRUD
  addSession: (session: Omit<Session, 'id' | 'createdAt'>) => void
  updateSession: (id: string, updates: Partial<Session>) => void
  deleteSession: (id: string) => void
  getSessionById: (id: string) => Session | undefined
  getSessionsForClient: (clientId: string) => Session[]
  getSessionsForDate: (date: Date) => Session[]
  getSessionsForDateRange: (startDate: Date, endDate: Date) => Session[]
  
  // Session Management
  completeSession: (id: string, completionData: {
    summary: string
    keyInsights?: string[]
    homework?: string[]
    nextSteps?: string[]
    clientFeedback?: Session['clientFeedback']
    coachReflection?: string
  }) => void
  
  rescheduleSession: (id: string, newDate: string, newTime?: string) => void
  cancelSession: (id: string, reason?: string) => void
  
  // Templates
  addTemplate: (template: Omit<SessionTemplate, 'id'>) => void
  updateTemplate: (id: string, updates: Partial<SessionTemplate>) => void
  deleteTemplate: (id: string) => void
  createSessionFromTemplate: (templateId: string, clientId: string, date: string, startTime?: string) => void
  
  // Analytics
  getSessionStats: () => {
    total: number
    completed: number
    scheduled: number
    cancelled: number
    averageRating: number
    totalHours: number
  }
}

// Mock data
const mockSessions: Session[] = [
  {
    id: 's1',
    clientId: '1',
    title: 'Leadership Development - Kickoff',
    description: 'Initial assessment and goal setting for leadership development',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '10:00',
    endTime: '11:30',
    duration: 90,
    type: 'intake',
    location: 'office',
    status: 'scheduled',
    agenda: [
      'Begrüßung und Kennenlernen',
      'Aktuelle Herausforderungen besprechen',
      'Ziele definieren',
      'Coaching-Prozess erklären',
      'Nächste Schritte planen'
    ],
    objectives: [
      'Vertrauen aufbauen',
      'Coaching-Ziele klar definieren',
      'Erwartungen abgleichen'
    ],
    preparationNotes: 'LinkedIn Profil und Unternehmen research gemacht',
    materialsNeeded: ['Goal-Setting Worksheet', 'Leadership Assessment'],
    createdAt: '2024-07-28'
  },
  {
    id: 's2',
    clientId: '1',
    title: 'Kommunikationsskills Workshop',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // In 2 days
    startTime: '14:00',
    endTime: '15:30',
    duration: 90,
    type: 'workshop',
    location: 'online',
    status: 'scheduled',
    agenda: [
      'Review der letzten Session',
      'Kommunikationsmodell DISC',
      'Praktische Übungen',
      'Feedback-Techniken',
      'Action Plan'
    ],
    objectives: [
      'DISC-Profil verstehen',
      'Feedback-Gespräche verbessern',
      'Konfliktlösung stärken'
    ],
    meetingLink: 'https://zoom.us/j/123456789',
    createdAt: '2024-07-25'
  },
  {
    id: 's3',
    clientId: '2',
    title: 'Work-Life-Balance Check-in',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    startTime: '16:00',
    endTime: '17:00',
    duration: 60,
    type: 'check-in',
    location: 'online',
    status: 'scheduled',
    agenda: [
      'Aktuelle Situation bewerten',
      'Stress-Level checken',
      'Erfolge feiern',
      'Adjustments besprechen'
    ],
    objectives: [
      'Balance-Status erheben',
      'Stress reduzieren',
      'Nachhaltigkeit sichern'
    ],
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
    createdAt: '2024-07-20'
  },
  {
    id: 's4',
    clientId: '1',
    title: 'Abschluss-Session',
    date: '2024-07-25',
    startTime: '15:00',
    endTime: '16:30',
    duration: 90,
    type: 'follow-up',
    location: 'office',
    status: 'completed',
    agenda: [
      'Fortschritte reflektieren',
      'Ziele überprüfen',
      'Erfolge dokumentieren',
      'Weiterführende Maßnahmen'
    ],
    summary: 'Sehr erfolgreiche Session. Klient hat große Fortschritte in der Teamführung gemacht.',
    keyInsights: [
      'Konflikte werden jetzt direkt angesprochen',
      'Team-Meetings sind strukturierter geworden',
      'Feedback-Kultur wurde etabliert'
    ],
    homework: [
      '1-on-1 Gespräche mit allen Teammitgliedern führen',
      'Quarterly Team Building Event planen'
    ],
    nextSteps: [
      'Follow-up Session in 4 Wochen',
      '360-Grad Feedback einholen',
      'Advanced Leadership Workshop buchen'
    ],
    clientFeedback: {
      rating: 5,
      comments: 'Sehr hilfreich! Fühle mich viel sicherer als Führungskraft.',
      goalProgress: 8
    },
    coachReflection: 'Klient zeigt außergewöhnliche Lernbereitschaft und setzt Impulse sehr schnell um.',
    createdAt: '2024-07-20',
    updatedAt: '2024-07-25'
  }
];

// Session Templates
const mockTemplates: SessionTemplate[] = [
  {
    id: 't1',
    name: 'Kickoff Session',
    description: 'Erste Session mit neuem Klienten - Kennenlernen und Zieldefinition',
    type: 'intake',
    duration: 90,
    defaultAgenda: [
      'Begrüßung und Vorstellung',
      'Erwartungen und Ziele besprechen',
      'Coaching-Prozess erklären',
      'Termine planen',
      'Nächste Schritte definieren'
    ],
    defaultObjectives: [
      'Vertrauen aufbauen',
      'Klare Ziele definieren',
      'Coaching-Rahmen festlegen'
    ],
    materialsNeeded: ['Intake-Fragebogen', 'Goal-Setting Template'],
    isActive: true
  },
  {
    id: 't2',
    name: 'Standard Coaching Session',
    description: 'Reguläre 1:1 Coaching Session',
    type: 'individual',
    duration: 60,
    defaultAgenda: [
      'Check-in und aktuelle Situation',
      'Progress Review',
      'Hauptthema bearbeiten',
      'Action Steps definieren',
      'Wrap-up und Feedback'
    ],
    defaultObjectives: [
      'Fortschritte evaluieren',
      'Herausforderungen lösen',
      'Konkrete Schritte planen'
    ],
    isActive: true
  },
  {
    id: 't3',
    name: 'Workshop Session',
    description: 'Skill-focused Workshop mit praktischen Übungen',
    type: 'workshop',
    duration: 120,
    defaultAgenda: [
      'Warm-up und Ziel-Setting',
      'Theorie-Input',
      'Praktische Übungen',
      'Reflexion und Integration',
      'Transfer in den Alltag'
    ],
    defaultObjectives: [
      'Neue Skills erlernen',
      'Praktische Anwendung üben',
      'Transfer sicherstellen'
    ],
    materialsNeeded: ['Workshop-Materialien', 'Übungsblätter', 'Flipchart'],
    isActive: true
  }
];

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: mockSessions,
  templates: mockTemplates,

  addSession: (sessionData) => {
    const newSession: Session = {
      ...sessionData,
      id: `s${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      sessions: [...state.sessions, newSession]
    }));
  },

  updateSession: (id, updates) => {
    set((state) => ({
      sessions: state.sessions.map(session =>
        session.id === id 
          ? { ...session, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
          : session
      )
    }));
  },

  deleteSession: (id) => {
    set((state) => ({
      sessions: state.sessions.filter(session => session.id !== id)
    }));
  },

  getSessionById: (id) => {
    const { sessions } = get();
    return sessions.find(session => session.id === id);
  },

  getSessionsForClient: (clientId) => {
    const { sessions } = get();
    return sessions
      .filter(session => session.clientId === clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getSessionsForDate: (date) => {
    const { sessions } = get();
    const dateString = date.toISOString().split('T')[0];
    return sessions
      .filter(session => session.date === dateString)
      .sort((a, b) => {
        if (!a.startTime || !b.startTime) return 0;
        return a.startTime.localeCompare(b.startTime);
      });
  },

  getSessionsForDateRange: (startDate, endDate) => {
    const { sessions } = get();
    return sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= startDate && sessionDate <= endDate;
    });
  },

  completeSession: (id, completionData) => {
    set((state) => ({
      sessions: state.sessions.map(session =>
        session.id === id
          ? {
              ...session,
              status: 'completed',
              ...completionData,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : session
      )
    }));
  },

  rescheduleSession: (id, newDate, newTime) => {
    set((state) => ({
      sessions: state.sessions.map(session =>
        session.id === id
          ? {
              ...session,
              date: newDate,
              startTime: newTime || session.startTime,
              status: 'rescheduled',
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : session
      )
    }));
  },

  cancelSession: (id, reason) => {
    set((state) => ({
      sessions: state.sessions.map(session =>
        session.id === id
          ? {
              ...session,
              status: 'cancelled',
              sessionNotes: reason ? `Abgesagt: ${reason}` : 'Session abgesagt',
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : session
      )
    }));
  },

  addTemplate: (templateData) => {
    const newTemplate: SessionTemplate = {
      ...templateData,
      id: `t${Date.now()}`
    };
    set((state) => ({
      templates: [...state.templates, newTemplate]
    }));
  },

  updateTemplate: (id, updates) => {
    set((state) => ({
      templates: state.templates.map(template =>
        template.id === id ? { ...template, ...updates } : template
      )
    }));
  },

  deleteTemplate: (id) => {
    set((state) => ({
      templates: state.templates.filter(template => template.id !== id)
    }));
  },

  createSessionFromTemplate: (templateId, clientId, date, startTime) => {
    const { templates, addSession } = get();
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      const endTime = startTime ? 
        new Date(`2000-01-01T${startTime}:00`).getTime() + (template.duration * 60000) : 
        undefined;
      
      addSession({
        clientId,
        title: template.name,
        description: template.description,
        date,
        startTime,
        endTime: endTime ? 
          new Date(endTime).toTimeString().slice(0, 5) : 
          undefined,
        duration: template.duration,
        type: template.type,
        location: 'office',
        status: 'scheduled',
        agenda: [...template.defaultAgenda],
        objectives: [...template.defaultObjectives],
        materialsNeeded: template.materialsNeeded ? [...template.materialsNeeded] : undefined
      });
    }
  },

  getSessionStats: () => {
    const { sessions } = get();
    
    const total = sessions.length;
    const completed = sessions.filter(s => s.status === 'completed').length;
    const scheduled = sessions.filter(s => s.status === 'scheduled').length;
    const cancelled = sessions.filter(s => s.status === 'cancelled').length;
    
    const completedSessions = sessions.filter(s => s.status === 'completed' && s.clientFeedback?.rating);
    const averageRating = completedSessions.length > 0 ?
      completedSessions.reduce((sum, s) => sum + (s.clientFeedback?.rating || 0), 0) / completedSessions.length :
      0;
    
    const totalHours = sessions.reduce((sum, s) => sum + s.duration, 0) / 60;
    
    return {
      total,
      completed,
      scheduled,
      cancelled,
      averageRating: Math.round(averageRating * 10) / 10,
      totalHours: Math.round(totalHours * 10) / 10
    };
  }
}));