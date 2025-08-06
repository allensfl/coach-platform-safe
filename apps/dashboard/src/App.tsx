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

// COACHEE-VIEW KOMPONENTE
const CoacheeView = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🌟 Willkommen, {coachee.firstName}!
            </h1>
            <p className="text-gray-600 text-lg">
              Deine persönliche Entwicklungsreise
            </p>
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

          {/* Progress Summary */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              📈 Dein Fortschritt
            </h3>
            <p className="text-gray-700 text-lg">
              {coachee.progress}
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🚀 Nächste Schritte
              </h3>
              <p className="text-gray-700 mb-4">
                Deine Coaching-Reise geht weiter! Bei Fragen oder für die nächste Session melde dich gerne.
              </p>
              <div className="text-sm text-gray-500">
                Dein persönlicher Coaching-Zugang • Vertraulich & Sicher
              </div>
            </div>
          </div>
        </div>
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