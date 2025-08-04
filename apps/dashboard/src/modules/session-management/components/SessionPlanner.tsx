import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Session {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  startTime: string;
  duration: number;
  title: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  goals?: string[];
  agenda?: AgendaItem[];
  resources?: Resource[];
  preparation?: PreparationItem[];
}

interface AgendaItem {
  id: string;
  title: string;
  duration: number;
  description?: string;
  completed: boolean;
}

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'link' | 'exercise' | 'template';
  url?: string;
  content?: string;
}

interface PreparationItem {
  id: string;
  task: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const SessionPlanner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'resources' | 'preparation' | 'history'>('overview');
  const [session, setSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Mock session data - in real app would come from store/API
  useEffect(() => {
    const mockSession: Session = {
      id: id || 's3',
      clientId: 'c1',
      clientName: 'Max Mustermann',
      date: '2025-07-30',
      startTime: '10:00',
      duration: 90,
      title: 'Karriereplanung & Zielsetzung',
      status: 'scheduled',
      notes: '',
      goals: [
        'Klarheit über berufliche Ziele schaffen',
        'Konkrete Schritte für Karrierewechsel definieren',
        'Selbstvertrauen stärken'
      ],
      agenda: [
        { id: '1', title: 'Check-in & Befindlichkeit', duration: 10, description: 'Wie geht es dem Klienten seit der letzten Session?', completed: false },
        { id: '2', title: 'Rückblick auf Hausaufgaben', duration: 15, description: 'Besprechen der Aufgaben aus der letzten Session', completed: false },
        { id: '3', title: 'Hauptthema: Karriereplanung', duration: 45, description: 'Erarbeitung der beruflichen Ziele und Optionen', completed: false },
        { id: '4', title: 'Aktionsplanung', duration: 15, description: 'Konkrete nächste Schritte definieren', completed: false },
        { id: '5', title: 'Abschluss & Feedback', duration: 5, description: 'Session-Reflexion und Terminplanung', completed: false }
      ],
      resources: [
        { id: '1', title: 'Karriere-Reflexions-Worksheet', type: 'document', content: 'PDF mit Fragen zur Selbstreflexion' },
        { id: '2', title: 'SWOT-Analyse Template', type: 'template', content: 'Vorlage für persönliche Stärken-Schwächen-Analyse' },
        { id: '3', title: 'LinkedIn Profil Optimierung', type: 'link', url: 'https://linkedin.com/help/linkedin/answer/112783' }
      ],
      preparation: [
        { id: '1', task: 'Notizen der letzten Session durchlesen', completed: true, priority: 'high' },
        { id: '2', task: 'Karriere-Assessment Material vorbereiten', completed: true, priority: 'high' },
        { id: '3', task: 'Räumlichkeiten vorbereiten', completed: false, priority: 'medium' },
        { id: '4', task: 'Follow-up Email Template bereithalten', completed: false, priority: 'low' }
      ]
    };
    setSession(mockSession);
  }, [id]);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setIsTimerRunning(true);
    if (session) {
      setSession({ ...session, status: 'scheduled' });
    }
  };

  const pauseSession = () => {
    setIsTimerRunning(false);
  };

  const endSession = () => {
    setIsTimerRunning(false);
    if (session) {
      setSession({ ...session, status: 'completed' });
    }
  };

  const toggleAgendaItem = (itemId: string) => {
    if (session) {
      const updatedAgenda = session.agenda?.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      setSession({ ...session, agenda: updatedAgenda });
    }
  };

  const togglePreparationItem = (itemId: string) => {
    if (session) {
      const updatedPreparation = session.preparation?.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      setSession({ ...session, preparation: updatedPreparation });
    }
  };

  const updateSessionNotes = (notes: string) => {
    if (session) {
      setSession({ ...session, notes });
    }
  };

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: '📋' },
    { id: 'agenda', label: 'Agenda', icon: '⏱️' },
    { id: 'resources', label: 'Ressourcen', icon: '📚' },
    { id: 'preparation', label: 'Vorbereitung', icon: '✅' },
    { id: 'history', label: 'Historie', icon: '📊' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!session) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/sessions')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 transition-colors"
          >
            ← Zurück zu Sessions
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Session Planner</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                <span>📅 {new Date(session.date).toLocaleDateString('de-DE', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span>⏰ {session.startTime} Uhr</span>
                <span>👤 {session.clientName}</span>
                <span>⏱️ {session.duration} Minuten</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  session.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {session.status === 'scheduled' ? 'Geplant' :
                   session.status === 'completed' ? 'Abgeschlossen' : 'Abgesagt'}
                </span>
              </div>
            </div>
            
            {/* Session Timer & Controls */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-lg">
                {formatTimer(sessionTimer)}
              </div>
              <div className="flex gap-2">
                {!isTimerRunning ? (
                  <button
                    onClick={startSession}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    ▶️ Start
                  </button>
                ) : (
                  <button
                    onClick={pauseSession}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    ⏸️ Pause
                  </button>
                )}
                <button
                  onClick={endSession}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  ⏹️ Ende
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Session Title */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h2>
          <div className="flex flex-wrap gap-2">
            {session.goals?.map((goal, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                🎯 {goal}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Session Notizen</h3>
                  <textarea
                    value={session.notes || ''}
                    onChange={(e) => updateSessionNotes(e.target.value)}
                    placeholder="Notizen während der Session..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {session.agenda?.filter(item => item.completed).length || 0}/{session.agenda?.length || 0}
                      </div>
                      <div className="text-sm text-blue-600">Agenda Fortschritt</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formatTimer(sessionTimer)}</div>
                      <div className="text-sm text-green-600">Session Zeit</div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-3">Heutige Ziele</h4>
                  <div className="space-y-2">
                    {session.goals?.map((goal, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Agenda Tab */}
          {activeTab === 'agenda' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Session Agenda</h3>
                <div className="text-sm text-gray-600">
                  Geplante Dauer: {session.agenda?.reduce((total, item) => total + item.duration, 0)} Minuten
                </div>
              </div>
              
              <div className="space-y-4">
                {session.agenda?.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg transition-all ${
                      item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleAgendaItem(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            item.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {item.completed && '✓'}
                        </button>
                        <span className="font-medium text-gray-900">
                          {index + 1}. {item.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {item.duration} min
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 ml-9">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Session Ressourcen</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  + Ressource hinzufügen
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {session.resources?.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {resource.type === 'document' ? '📄' :
                           resource.type === 'link' ? '🔗' :
                           resource.type === 'exercise' ? '💪' : '📋'}
                        </span>
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        resource.type === 'document' ? 'bg-blue-100 text-blue-800' :
                        resource.type === 'link' ? 'bg-green-100 text-green-800' :
                        resource.type === 'exercise' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{resource.content}</p>
                    <div className="flex gap-2">
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors">
                        Öffnen
                      </button>
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors">
                        Teilen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preparation Tab */}
          {activeTab === 'preparation' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Session Vorbereitung</h3>
                <div className="text-sm text-gray-600">
                  {session.preparation?.filter(item => item.completed).length}/{session.preparation?.length} erledigt
                </div>
              </div>
              
              <div className="space-y-3">
                {session.preparation?.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg transition-all ${
                      item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => togglePreparationItem(item.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            item.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {item.completed && '✓'}
                        </button>
                        <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.task}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(item.priority)}`}>
                        {item.priority === 'high' ? 'Hoch' :
                         item.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Session Historie</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Session Historie</h4>
                <p className="text-gray-600 mb-4">Hier werden vergangene Sessions und deren Ergebnisse angezeigt.</p>
                <p className="text-sm text-gray-500">Feature wird bald implementiert...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionPlanner;