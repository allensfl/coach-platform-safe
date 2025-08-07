// App.tsx - TIER 1 ULTIMATE VERSION WITH COMPLETE FUNCTIONALITY
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

// Import your real modules
import DashboardOverview from './components/DashboardOverview';
import DocumentsModule from './components/DocumentsModule';
import ClientList from './modules/client-management/components/ClientList';
import SessionCalendar from './modules/session-management/components/SessionCalendar';
import NewClientModal from './modules/client-management/components/NewClientModal';
import NewSessionModal from './modules/session-management/components/NewSessionModal';
import InvoiceBuilder from './components/invoices';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

// DEMO-COACHEES für funktionale Links
const DEMO_COACHEES = {
  'demo-sarah-2024': {
    id: 'demo-sarah-2024',
    firstName: 'Sarah',
    lastName: 'Müller',
    reflections: [
      '✅ Session 1: Vertrauen aufgebaut, klare Ziele definiert',
      '🚀 Session 3: Großer Durchbruch beim Konflikt-Management', 
      '⭐ Session 5: Work-Life-Balance deutlich verbessert',
      '🎯 Aktuell: Fokus auf Teamführung und Delegation'
    ],
    progress: 'Hervorragende Entwicklung in allen Bereichen'
  },
  'demo-michael-2024': {
    id: 'demo-michael-2024', 
    firstName: 'Michael',
    lastName: 'Schmidt',
    reflections: [
      '🎯 Session 1: Unternehmerische Vision geschärft',
      '💡 Session 2: Neue Delegationsstrategien entwickelt', 
      '📈 Session 4: Umsatz um 40% gesteigert',
      '🌟 Aktuell: Skalierung des Business-Modells'
    ],
    progress: 'Außergewöhnliche Business-Transformation'
  }
};

// COACHEE-VIEW KOMPONENTE - VOLLSTÄNDIGE EXPERIENCE
const CoacheeView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [newGoal, setNewGoal] = useState('');
  
  const token = window.location.pathname.split('/coachee/')[1];
  const coachee = DEMO_COACHEES[token];
  
  if (!coachee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">🔍 Coachee nicht gefunden</h1>
            <p className="text-gray-600 mb-4">Der Link ist ungültig oder abgelaufen.</p>
            <p className="text-sm text-gray-500 mb-4">Token: {token}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Zurück zum Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: '📊 Überblick', icon: '📊' },
    { id: 'goals', name: '🎯 Ziele', icon: '🎯' },
    { id: 'sessions', name: '📅 Sessions', icon: '📅' },
    { id: 'notes', name: '📝 Notizen', icon: '📝' },
    { id: 'resources', name: '📚 Ressourcen', icon: '📚' },
    { id: 'homework', name: '✅ Aufgaben', icon: '✅' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Willkommen Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">
                🌟 Willkommen zurück, {coachee.firstName}!
              </h1>
              <p className="text-blue-100 text-lg">
                Hier ist dein persönlicher Coaching-Bereich
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <div className="text-gray-600">Abgeschlossene Sessions</div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                  <div className="text-gray-600">Erreichte Ziele</div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                  <div className="text-gray-600">Aktive Projekte</div>
                </div>
              </div>
            </div>

            {/* Entwicklungsspuren */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                🌱 Deine Entwicklungsspuren
              </h2>
              
              <div className="space-y-4">
                {coachee.reflections.map((reflection, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-l-4 border-green-500"
                  >
                    <p className="text-gray-800 font-medium">
                      {reflection}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  📈 Dein Fortschritt
                </h3>
                <p className="text-gray-700 text-lg">
                  {coachee.progress}
                </p>
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Deine Coaching-Ziele</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">✅ Erreichte Ziele</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    <span className="text-gray-800">Selbstvertrauen in Meetings stärken</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    <span className="text-gray-800">Work-Life-Balance verbessern</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    <span className="text-gray-800">Konfliktgespräche führen können</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">🔄 In Bearbeitung</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-3">🔄</span>
                    <span className="text-gray-800">Teamführung optimieren</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-3">🔄</span>
                    <span className="text-gray-800">Delegation lernen</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">🎯 Neue Ziele</h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Neues Ziel eingeben..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newGoal.trim()) {
                        alert(`Neues Ziel hinzugefügt: "${newGoal}"`);
                        setNewGoal('');
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Hinzufügen
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sessions':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Deine Sessions</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">📋 Nächste Session</h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Führungskompetenzen entwickeln</h4>
                      <p className="text-gray-600 mt-1">🗓 Montag, 12. August 2024 um 10:00</p>
                      <p className="text-gray-600">📍 Online-Session</p>
                      <p className="text-gray-600">⏱ Dauer: 60 Minuten</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Bestätigt
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Vergangene Sessions</h3>
                <div className="space-y-4">
                  {[
                    { date: '5. August 2024', topic: 'Konfliktmanagement', type: 'Einzelsession', rating: '⭐⭐⭐⭐⭐' },
                    { date: '29. Juli 2024', topic: 'Work-Life-Balance', type: 'Einzelsession', rating: '⭐⭐⭐⭐⭐' },
                    { date: '22. Juli 2024', topic: 'Teamkommunikation', type: 'Gruppensession', rating: '⭐⭐⭐⭐' },
                  ].map((session, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{session.topic}</h4>
                          <p className="text-gray-600 text-sm mt-1">🗓 {session.date} • {session.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{session.rating}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Persönliche Notizen</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">✍️ Neue Notiz</h3>
                <div className="space-y-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Was beschäftigt dich? Schreibe deine Gedanken auf..."
                    className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button
                    onClick={() => {
                      if (newNote.trim()) {
                        alert(`Notiz gespeichert: "${newNote.substring(0, 50)}..."`);
                        setNewNote('');
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Notiz speichern
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Deine Notizen</h3>
                <div className="space-y-4">
                  {[
                    { date: '6. August 2024', content: 'Heute hatte ich ein schwieriges Gespräch mit meinem Team. Die Techniken aus der letzten Session haben wirklich geholfen!' },
                    { date: '3. August 2024', content: 'Reflexion: Ich merke, wie sich meine Kommunikation verbessert. Bin stolz auf den Fortschritt.' },
                    { date: '1. August 2024', content: 'Vorbereitung für nächste Session: Möchte über Delegation sprechen. Fällt mir noch schwer loszulassen.' },
                  ].map((note, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="text-sm text-gray-500 mb-2">📅 {note.date}</div>
                      <p className="text-gray-800">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Deine Ressourcen</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">📖 Empfohlene Bücher</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <div className="font-medium text-gray-900">„Führen ohne Macht"</div>
                      <div className="text-sm text-gray-600">Stefan Hagen</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <div className="font-medium text-gray-900">„Gewaltfreie Kommunikation"</div>
                      <div className="text-sm text-gray-600">Marshall Rosenberg</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">🎧 Podcasts & Videos</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎧</span>
                    <div>
                      <div className="font-medium text-gray-900">Leadership Podcast</div>
                      <div className="text-sm text-gray-600">Episode 47: Delegation</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📺</span>
                    <div>
                      <div className="font-medium text-gray-900">TED Talk: Authenticity</div>
                      <div className="text-sm text-gray-600">Brené Brown</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">🛠 Tools & Übungen</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-medium text-gray-900">5-Minuten Meditation</div>
                      <div className="text-sm text-gray-600">Täglich vor wichtigen Terminen</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <div className="font-medium text-gray-900">Reflexions-Template</div>
                      <div className="text-sm text-gray-600">Wöchentliche Selbstreflexion</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">🔗 Nützliche Links</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <div className="font-medium text-gray-900">Coaching-Journal Online</div>
                      <div className="text-sm text-gray-600">Für deine täglichen Reflexionen</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-medium text-gray-900">Mindfulness App</div>
                      <div className="text-sm text-gray-600">Headspace Premium-Zugang</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'homework':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✅ Deine Aufgaben</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">⚡ Überfällig</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Führungsstil-Assessment ausfüllen</h4>
                        <p className="text-gray-600 text-sm mt-1">Bis: 3. August 2024</p>
                        <p className="text-gray-600 text-sm">Selbsteinschätzung deines aktuellen Führungsstils</p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">
                        Jetzt erledigen
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">⏳ Diese Woche</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Delegations-Gespräch führen</h4>
                        <p className="text-gray-600 text-sm mt-1">Bis: 10. August 2024</p>
                        <p className="text-gray-600 text-sm">Wähle eine Aufgabe aus und delegiere sie an ein Teammitglied</p>
                      </div>
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700">
                        In Bearbeitung
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Tägliche Reflexion</h4>
                        <p className="text-gray-600 text-sm mt-1">Bis: Ende der Woche</p>
                        <p className="text-gray-600 text-sm">5 Minuten täglich: Was lief gut? Was kann besser werden?</p>
                      </div>
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700">
                        Fortsetzen
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">✅ Erledigt</h3>
                <div className="space-y-3">
                  {[
                    { task: 'Team-Meeting mit neuer Struktur', completed: '2. August 2024' },
                    { task: 'Konfliktgespräch mit Sarah', completed: '30. Juli 2024' },
                    { task: 'Work-Life-Balance Wochenplan', completed: '28. Juli 2024' },
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200 opacity-75">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-green-600 text-lg">✓</span>
                          <div>
                            <h4 className="font-medium text-gray-900 line-through">{item.task}</h4>
                            <p className="text-gray-600 text-sm">Erledigt am {item.completed}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Tab nicht gefunden</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header mit Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Coaching-Portal: {coachee.firstName} {coachee.lastName}
            </h1>
            <div className="text-sm text-gray-500">
              Sicherer Zugang • Vertraulich
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

type ActiveView = 'dashboard' | 'clients' | 'sessions' | 'documents' | 'invoices' | 'analytics' | 'settings' | 'tools' | 'branding';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [tools, setTools] = useState<any[]>([]);

  // Mock clients data - same as your real data
  const clients = [
    {
      id: '1',
      name: 'Sarah Müller',
      age: 34,
      profession: 'Führungskraft',
      email: 'sarah@example.com',
      phone: '+41 44 123 45 67',
      address: {
        street: 'Bahnhofstrasse 123',
        city: 'Zürich',
        postalCode: '8001',
        country: 'Schweiz'
      },
      sessions: 8,
      status: 'active',
      lastSession: '2024-07-28',
      coachingGoals: [
        'Verbesserung der Führungskompetenzen',
        'Work-Life-Balance optimieren',
        'Konfliktmanagement stärken'
      ],
      notes: 'Sehr motivierte Klientin mit klaren Zielen',
      emergencyContact: {
        name: 'Thomas Müller',
        relationship: 'Ehemann',
        phone: '+41 44 987 65 43'
      }
    },
    {
      id: '2',
      name: 'Michael Schmidt',
      age: 42,
      profession: 'Unternehmer',
      email: 'michael@example.com',
      phone: '+41 44 234 56 78',
      address: {
        street: 'Limmatquai 45',
        city: 'Zürich',
        postalCode: '8001',
        country: 'Schweiz'
      },
      sessions: 12,
      status: 'active',
      lastSession: '2024-07-30',
      coachingGoals: [
        'Unternehmerische Vision schärfen',
        'Delegation verbessern',
        'Skalierung des Geschäfts'
      ],
      notes: 'Sehr erfolgreicher Unternehmer, sucht Unterstützung bei der Expansion',
      emergencyContact: {
        name: 'Lisa Schmidt',
        relationship: 'Ehefrau',
        phone: '+41 44 876 54 32'
      }
    },
    {
      id: '3',
      name: 'Anna Weber',
      age: 29,
      profession: 'Marketing Managerin',
      email: 'anna@example.com',
      phone: '+41 44 345 67 89',
      address: {
        street: 'Universitätstrasse 78',
        city: 'Basel',
        postalCode: '4001',
        country: 'Schweiz'
      },
      sessions: 5,
      status: 'active',
      lastSession: '2024-07-25',
      coachingGoals: [
        'Karriereentwicklung',
        'Selbstvertrauen stärken',
        'Networking verbessern'
      ],
      notes: 'Junge Führungskraft mit großem Potenzial',
      emergencyContact: {
        name: 'Peter Weber',
        relationship: 'Vater',
        phone: '+41 44 765 43 21'
      }
    }
  ];

  const sessions = [
    {
      id: '1',
      clientId: '1',
      clientName: 'Sarah Müller',
      date: '2024-08-05',
      time: '10:00',
      duration: 60,
      type: 'Einzelcoaching',
      status: 'scheduled',
      topic: 'Führungskompetenzen entwickeln',
      notes: 'Fokus auf Konfliktmanagement',
      location: 'Büro Zürich',
      sessionNumber: 9
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'Michael Schmidt',
      date: '2024-08-06',
      time: '14:00',
      duration: 90,
      type: 'Strategiecoaching',
      status: 'scheduled',
      topic: 'Geschäftsexpansion planen',
      notes: 'Vorbereitung auf Investor-Gespräche',
      location: 'Online',
      sessionNumber: 13
    },
    {
      id: '3',
      clientId: '3',
      clientName: 'Anna Weber',
      date: '2024-08-07',
      time: '09:00',
      duration: 60,
      type: 'Karrierecoaching',
      status: 'scheduled',
      topic: 'Networking-Strategien',
      notes: 'Vorbereitung auf Branchenkonferenz',
      location: 'Café Basel',
      sessionNumber: 6
    }
  ];

  const handleSaveClient = (clientData: any) => {
    console.log('Saving client:', clientData);
    setShowNewClientModal(false);
  };

  const handleSaveSession = (sessionData: any) => {
    console.log('Saving session:', sessionData);
    setShowNewSessionModal(false);
  };

  const handleAddTool = (toolData: any) => {
    setTools([...tools, { ...toolData, id: Date.now().toString() }]);
    setShowAddToolModal(false);
  };

  const handleDeleteTool = (toolId: string) => {
    setTools(tools.filter(tool => tool.id !== toolId));
  };

  const navigationItems = [
    { id: 'dashboard', name: 'Cockpit', icon: HomeIcon },        // Dashboard → Cockpit
    { id: 'clients', name: 'Coachees', icon: UserIcon },        // Klienten → Coachees
    { id: 'sessions', name: 'Gespräche', icon: CalendarIcon },  // Sessions → Gespräche
    { id: 'documents', name: 'Dokumente', icon: DocumentTextIcon },
    { id: 'invoices', name: 'Rechnungen', icon: CurrencyDollarIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'tools', name: 'Tools', icon: WrenchScrewdriverIcon },
    { id: 'branding', name: 'Branding', icon: PaintBrushIcon },
    { id: 'settings', name: 'Einstellungen', icon: CogIcon },
  ];

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview clients={clients} sessions={sessions} />;
      case 'clients':
        return <ClientList />;
      case 'sessions':
        return <SessionCalendar sessions={sessions} clients={clients} />;
      case 'documents':
        return <DocumentsModule />;
      case 'invoices':
        return <InvoiceBuilder clients={clients} sessions={sessions} />;
      case 'analytics':
        return <Analytics clients={clients} sessions={sessions} />;
      case 'tools':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Coaching Tools</h2>
              <button
                onClick={() => setShowAddToolModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Tool hinzufügen
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                      <p className="text-gray-600 mt-1">{tool.description}</p>
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mt-2">
                        {tool.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTool(tool.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Löschen
                    </button>
                  </div>
                  {tool.url && (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Tool öffnen →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'branding':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Branding & Design</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Logo & Corporate Identity</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firmenlogo hochladen
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Logo wird im Dashboard-Header angezeigt</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primärfarbe
                  </label>
                  <input
                    type="color"
                    defaultValue="#3B82F6"
                    className="h-10 w-20 rounded border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sekundärfarbe
                  </label>
                  <input
                    type="color"
                    defaultValue="#10B981"
                    className="h-10 w-20 rounded border"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview clients={clients} sessions={sessions} />;
    }
  };

  const stats = [
    { 
      name: 'Aktive Coachees', 
      value: '12', 
      change: '+2.1%', 
      changeType: 'positive' as const
    },
    { 
      name: 'Sessions diese Woche', 
      value: '18', 
      change: '+12.5%', 
      changeType: 'positive' as const
    },
    { 
      name: 'Durchschnittliche Session-Dauer', 
      value: '52min', 
      change: '+3.2%', 
      changeType: 'positive' as const
    },
    { 
      name: 'Monatsumsatz', 
      value: '€8.420', 
      change: '+8.1%', 
      changeType: 'positive' as const
    },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* COACHEE ROUTE - Prüfung ganz am Anfang */}
        {window.location.pathname.startsWith('/coachee/') ? (
          <CoacheeView />
        ) : (
          <>
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900">
              <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <h1 className="text-xl font-bold text-white">Coaching Cockpit</h1>
              </div>
              <nav className="mt-8">
                <div className="px-4">
                  <ul className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeView === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveView(item.id as ActiveView)}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                              isActive
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                          >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="pl-64">
              {/* Top Bar */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                      {activeView === 'dashboard' ? 'Cockpit' : 
                       activeView === 'clients' ? 'Coachees' :
                       activeView === 'sessions' ? 'Gespräche' :
                       navigationItems.find(item => item.id === activeView)?.name}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    {(activeView === 'clients' || activeView === 'dashboard') && (
                      <button
                        onClick={() => setShowNewClientModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Neuer Coachee
                      </button>
                    )}
                    {(activeView === 'sessions' || activeView === 'dashboard') && (
                      <button
                        onClick={() => setShowNewSessionModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Neues Gespräch
                      </button>
                    )}
                  </div>
                </div>

                {/* Stats Bar for Dashboard */}
                {activeView === 'dashboard' && (
                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {stats.map((stat) => (
                        <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
                          <div className="flex items-center">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`text-sm ${
                              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Page Content */}
              <main className="p-8">
                {activeView === 'dashboard' && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktuelle Coachees</h3>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Coachee
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sessions
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Letzte Session
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {clients.slice(0, 5).map((client) => (
                              <tr key={client.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {client.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {client.profession}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {client.sessions}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    client.status === 'active'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {client.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {client.lastSession}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {renderCurrentView()}
              </main>
            </div>

            {/* Modals */}
            {showNewClientModal && (
              <NewClientModal
                isOpen={showNewClientModal}
                onClose={() => setShowNewClientModal(false)}
                onSubmit={handleSaveClient}
              />
            )}
            {showNewSessionModal && (
              <NewSessionModal
                isOpen={showNewSessionModal}
                onClose={() => setShowNewSessionModal(false)}
                onSubmit={handleSaveSession}
              />
            )}
            {showAddToolModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Neues Tool hinzufügen</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleAddTool({
                      name: formData.get('name'),
                      description: formData.get('description'),
                      category: formData.get('category'),
                      url: formData.get('url')
                    });
                    e.currentTarget.reset();
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tool-Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Beschreibung
                        </label>
                        <textarea
                          name="description"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategorie
                        </label>
                        <select
                          name="category"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Wählen Sie eine Kategorie</option>
                          <option value="Persönlichkeitsentwicklung">Persönlichkeitsentwicklung</option>
                          <option value="Zielsetzung">Zielsetzung</option>
                          <option value="Kommunikation">Kommunikation</option>
                          <option value="Führung">Führung</option>
                          <option value="Stressmanagement">Stressmanagement</option>
                          <option value="Karriere">Karriere</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL (optional)
                        </label>
                        <input
                          type="url"
                          name="url"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowAddToolModal(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Abbrechen
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Tool hinzufügen
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;