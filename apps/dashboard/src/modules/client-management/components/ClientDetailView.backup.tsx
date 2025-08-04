import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail, Briefcase, Target, Shield, Edit, Plus, FileText, Check, X, AlertCircle } from 'lucide-react';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  company?: string;
  position?: string;
  industry?: string;
  careerLevel?: string;
  howDidYouHear?: string;
  referredBy?: string;
  coachingGoals?: string[];
  challenges?: string;
  sessionLength?: string;
  sessionFrequency?: string;
  preferredTime?: string;
  sessionType?: string;
  notes?: string;
  status: string;
  createdAt: string;
  consentBasicData?: boolean;
  consentSessionNotes?: boolean;
  consentRecordings?: boolean;
  consentMarketing?: boolean;
  consentDataSharing?: boolean;
  consentExtendedStorage?: boolean;
}

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  type: 'online' | 'phone' | 'in-person';
}

interface Note {
  id: string;
  title: string;
  content: string;
  category: 'goal' | 'challenge' | 'progress' | 'general';
  date: string;
}

interface ClientDetailViewProps {
  client: Client;
  onBack: () => void;
  onEdit: () => void;
  onNewSession: () => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ 
  client, 
  onBack, 
  onEdit, 
  onNewSession 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const sessions: Session[] = [
    {
      id: '1',
      title: 'Karriereplanung & Ziele',
      date: '2024-07-25',
      time: '10:00',
      duration: 60,
      status: 'completed',
      notes: 'Sehr produktive Session. Klare Ziele definiert.',
      type: 'online'
    },
    {
      id: '2',
      title: 'Leadership Development',
      date: '2024-08-01',
      time: '14:00',
      duration: 60,
      status: 'scheduled',
      type: 'online'
    },
    {
      id: '3',
      title: 'Work-Life-Balance',
      date: '2024-07-18',
      time: '16:00',
      duration: 45,
      status: 'completed',
      notes: 'Fortschritte bei Zeitmanagement erkennbar.',
      type: 'phone'
    }
  ];

  const notes: Note[] = [
    {
      id: '1',
      title: 'Langfristige Karriereziele',
      content: 'Möchte in den nächsten 2 Jahren eine Führungsposition erreichen. Fokus auf Teamleitung und strategische Projekte.',
      category: 'goal',
      date: '2024-07-25'
    },
    {
      id: '2',
      title: 'Herausforderung: Delegation',
      content: 'Schwierigkeiten beim Delegieren von Aufgaben. Tendenz zum Mikromanagement.',
      category: 'challenge',
      date: '2024-07-20'
    },
    {
      id: '3',
      title: 'Fortschritt: Kommunikation',
      content: 'Deutliche Verbesserung in der Teamkommunikation. Feedback der Kollegen sehr positiv.',
      category: 'progress',
      date: '2024-07-30'
    }
  ];

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { color: 'bg-green-100 text-green-800', label: 'Aktiv' },
      'inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inaktiv' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Wartend' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getSessionStatusBadge = (status: Session['status']) => {
    const statusConfig = {
      'scheduled': { color: 'bg-blue-100 text-blue-800', label: 'Geplant' },
      'completed': { color: 'bg-green-100 text-green-800', label: 'Abgeschlossen' },
      'cancelled': { color: 'bg-red-100 text-red-800', label: 'Abgesagt' }
    };
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category: Note['category']) => {
    const categoryConfig = {
      'goal': { color: 'bg-blue-100 text-blue-800', label: 'Ziel', icon: Target },
      'challenge': { color: 'bg-orange-100 text-orange-800', label: 'Herausforderung', icon: AlertCircle },
      'progress': { color: 'bg-green-100 text-green-800', label: 'Fortschritt', icon: Check },
      'general': { color: 'bg-gray-100 text-gray-800', label: 'Allgemein', icon: FileText }
    };
    const config = categoryConfig[category];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const formatSessionFrequency = (frequency: string) => {
    const frequencies = {
      'weekly': 'Wöchentlich',
      'biweekly': 'Alle 2 Wochen',
      'monthly': 'Monatlich',
      'as-needed': 'Nach Bedarf'
    };
    return frequencies[frequency as keyof typeof frequencies] || frequency;
  };

  const formatPreferredTime = (time: string) => {
    const times = {
      'morning': 'Morgens (8-12 Uhr)',
      'afternoon': 'Nachmittags (12-17 Uhr)',
      'evening': 'Abends (17-20 Uhr)',
      'flexible': 'Flexibel'
    };
    return times[time as keyof typeof times] || time;
  };

  const formatSessionType = (type: string) => {
    const types = {
      'online': 'Online (Video)',
      'phone': 'Telefon',
      'in-person': 'Vor Ort',
      'mixed': 'Gemischt'
    };
    return types[type as keyof typeof types] || type;
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-blue-600" />
          Kontaktinformationen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">E-Mail</p>
              <p className="font-medium">{client.email}</p>
            </div>
          </div>
          {client.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <p className="font-medium">{client.phone}</p>
              </div>
            </div>
          )}
          {(client.street || client.city) && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium">
                  {client.street && `${client.street}, `}
                  {client.zipCode && `${client.zipCode} `}
                  {client.city}
                  {client.country && client.country !== 'Deutschland' && `, ${client.country}`}
                </p>
              </div>
            </div>
          )}
          {client.birthDate && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Alter</p>
                <p className="font-medium">{calculateAge(client.birthDate)} Jahre</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professional Information */}
      {(client.company || client.position || client.industry) && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            Berufliche Informationen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {client.company && (
              <div>
                <p className="text-sm text-gray-500">Unternehmen</p>
                <p className="font-medium">{client.company}</p>
              </div>
            )}
            {client.position && (
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{client.position}</p>
              </div>
            )}
            {client.industry && (
              <div>
                <p className="text-sm text-gray-500">Branche</p>
                <p className="font-medium">{client.industry}</p>
              </div>
            )}
            {client.careerLevel && (
              <div>
                <p className="text-sm text-gray-500">Karrierestufe</p>
                <p className="font-medium">{client.careerLevel}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Session Preferences */}
      {(client.sessionLength || client.sessionFrequency) && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Session-Präferenzen
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {client.sessionLength && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Dauer</p>
                <p className="text-lg font-bold text-blue-900">{client.sessionLength} min</p>
              </div>
            )}
            {client.sessionFrequency && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Häufigkeit</p>
                <p className="text-sm font-bold text-green-900">{formatSessionFrequency(client.sessionFrequency)}</p>
              </div>
            )}
            {client.preferredTime && (
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Zeit</p>
                <p className="text-sm font-bold text-purple-900">{formatPreferredTime(client.preferredTime)}</p>
              </div>
            )}
            {client.sessionType && (
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">Art</p>
                <p className="text-sm font-bold text-orange-900">{formatSessionType(client.sessionType)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Acquisition Information */}
      {(client.howDidYouHear || client.referredBy) && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Akquisition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {client.howDidYouHear && (
              <div>
                <p className="text-sm text-gray-500">Wie kennengelernt</p>
                <p className="font-medium">{client.howDidYouHear}</p>
              </div>
            )}
            {client.referredBy && (
              <div>
                <p className="text-sm text-gray-500">Empfohlen von</p>
                <p className="font-medium">{client.referredBy}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Notes */}
      {client.notes && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Zusätzliche Anmerkungen</h3>
          <p className="text-gray-700">{client.notes}</p>
        </div>
      )}
    </div>
  );

  const renderSessionsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Session-Historie</h3>
        <button
          onClick={onNewSession}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue Session
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm border">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Noch keine Sessions vorhanden</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{session.title}</h4>
                    {getSessionStatusBadge(session.status)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(session.date).toLocaleDateString('de-DE')}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.time} ({session.duration} min)
                    </span>
                    <span className="capitalize">{formatSessionType(session.type)}</span>
                  </div>
                  {session.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {session.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Notizen & Dokumentation</h3>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Neue Notiz
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm border">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Noch keine Notizen vorhanden</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{note.title}</h4>
                <div className="flex items-center space-x-2">
                  {getCategoryBadge(note.category)}
                  <span className="text-xs text-gray-500">
                    {new Date(note.date).toLocaleDateString('de-DE')}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-6">
      {/* Coaching Goals */}
      {client.coachingGoals && client.coachingGoals.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Coaching-Ziele
          </h3>
          <div className="space-y-2">
            {client.coachingGoals.map((goal, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {index + 1}
                </div>
                <span className="text-gray-700">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges */}
      {client.challenges && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            Hauptherausforderungen
          </h3>
          <p className="text-gray-700 bg-orange-50 p-4 rounded-lg">{client.challenges}</p>
        </div>
      )}

      {/* Progress Tracking */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Check className="w-5 h-5 mr-2 text-green-600" />
          Fortschritt & Erfolge
        </h3>
        <div className="space-y-3">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Kommunikationsfähigkeiten</h4>
            <p className="text-green-700 text-sm">Deutliche Verbesserung in der Teamkommunikation erkennbar.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Zielsetzung</h4>
            <p className="text-blue-700 text-sm">Klare Definition persönlicher und beruflicher Ziele erreicht.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-600" />
          DSGVO-Einverständnisse
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {client.consentBasicData ? (
                <Check className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <X className="w-5 h-5 text-red-600 mr-3" />
              )}
              <span className="text-sm font-medium">Grundlegende Datenverarbeitung</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              client.consentBasicData ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {client.consentBasicData ? 'Erteilt' : 'Nicht erteilt'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {client.consentSessionNotes ? (
                <Check className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <span className="text-sm font-medium">Session-Notizen</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              client.consentSessionNotes ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {client.consentSessionNotes ? 'Erteilt' : 'Nicht erteilt'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {client.consentRecordings ? (
                <Check className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <span className="text-sm font-medium">Session-Aufzeichnungen</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              client.consentRecordings ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {client.consentRecordings ? 'Erteilt' : 'Nicht erteilt'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {client.consentMarketing ? (
                <Check className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <span className="text-sm font-medium">Marketing & Newsletter</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              client.consentMarketing ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {client.consentMarketing ? 'Erteilt' : 'Nicht erteilt'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {client.consentDataSharing ? (
                <Check className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <span className="text-sm font-medium">Anonymisierte Datenweitergabe</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              client.consentDataSharing ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {client.consentDataSharing ? 'Erteilt' : 'Nicht erteilt'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {client.consentExtendedStorage ? (
                <Check className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mr-3" />
              )}
              <span className="text-sm font-medium">Erweiterte Datenspeicherung</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              client.consentExtendedStorage ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {client.consentExtendedStorage ? 'Erteilt' : 'Nicht erteilt'}
            </span>
          </div>
        </div>
      </div>

      {/* Client Rights */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-medium text-blue-900 mb-3">Ihre Rechte gemäß DSGVO</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Recht auf Auskunft über gespeicherte Daten</p>
          <p>• Recht auf Berichtigung unrichtiger Daten</p>
          <p>• Recht auf Löschung ("Recht auf Vergessenwerden")</p>
          <p>• Recht auf Einschränkung der Verarbeitung</p>
          <p>• Recht auf Datenübertragbarkeit</p>
          <p>• Recht auf Widerspruch gegen die Verarbeitung</p>
          <p>• Recht auf Widerruf der Einverständniserklärung</p>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <FileText className="w-4 h-4 mr-2" />
            DSGVO-Formular erstellen
          </button>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: Target },
    { id: 'sessions', label: 'Sessions', icon: Calendar, count: sessions.length },
    { id: 'notes', label: 'Notizen', icon: FileText, count: notes.length },
    { id: 'goals', label: 'Ziele', icon: Target },
    { id: 'privacy', label: 'Datenschutz', icon: Shield }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center text-blue-100 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zur Übersicht
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onNewSession}
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Neue Session
            </button>
            <button
              onClick={onEdit}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Bearbeiten
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold mr-6">
            {client.firstName?.[0]}{client.lastName?.[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {client.firstName} {client.lastName}
            </h1>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-blue-100">{client.email}</span>
              {getStatusBadge(client.status)}
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{sessions.length}</div>
                <div className="text-blue-100 text-sm">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{notes.length}</div>
                <div className="text-blue-100 text-sm">Notizen</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {new Date(client.createdAt).toLocaleDateString('de-DE')}
                </div>
                <div className="text-blue-100 text-sm">Seit</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'sessions' && renderSessionsTab()}
          {activeTab === 'notes' && renderNotesTab()}
          {activeTab === 'goals' && renderGoalsTab()}
          {activeTab === 'privacy' && renderPrivacyTab()}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailView;