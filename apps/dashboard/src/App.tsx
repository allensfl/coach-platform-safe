// App.tsx - TIER 1 ULTIMATE VERSION WITH ALL FEATURES
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
  const [isPrivate, setIsPrivate] = useState(true);
  
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📝 Persönliche Notizen</h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Privatsphäre-Modus:</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${!isPrivate ? 'text-gray-400' : 'text-green-600 font-medium'}`}>
                    🔒 Nur für mich
                  </span>
                  <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPrivate ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPrivate ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-sm ${isPrivate ? 'text-gray-400' : 'text-blue-600 font-medium'}`}>
                    👥 Mit Coach teilen
                  </span>
                </div>
              </div>
            </div>
            
            {/* Privatsphäre Info */}
            <div className={`mb-6 p-4 rounded-lg ${isPrivate ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start space-x-3">
                <span className="text-lg">{isPrivate ? '🔒' : '👥'}</span>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {isPrivate ? 'Private Notizen' : 'Geteilte Notizen'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isPrivate 
                      ? 'Diese Notizen sind nur für dich sichtbar und werden nicht mit deinem Coach geteilt.'
                      : 'Diese Notizen können von deinem Coach eingesehen werden, um dich besser zu unterstützen.'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className={`rounded-lg p-6 ${isPrivate ? 'bg-green-50' : 'bg-blue-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isPrivate ? 'text-green-900' : 'text-blue-900'}`}>
                  ✍️ Neue Notiz
                </h3>
                <div className="space-y-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={isPrivate 
                      ? "Deine privaten Gedanken und Reflexionen..." 
                      : "Notiz, die du mit deinem Coach teilen möchtest..."
                    }
                    className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{isPrivate ? '🔒' : '👥'}</span>
                      <span>{isPrivate ? 'Wird privat gespeichert' : 'Wird mit Coach geteilt'}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (newNote.trim()) {
                          alert(`${isPrivate ? 'Private' : 'Geteilte'} Notiz gespeichert: "${newNote.substring(0, 50)}..."`);
                          setNewNote('');
                        }
                      }}
                      className={`px-6 py-2 rounded-lg transition-colors text-white ${
                        isPrivate 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      Notiz speichern
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Deine Notizen</h3>
                <div className="space-y-4">
                  {/* Private Notizen */}
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-500 flex items-center">
                        <span className="mr-2">🔒</span>
                        📅 6. August 2024 • Privat
                      </div>
                    </div>
                    <p className="text-gray-800">Heute hatte ich ein schwieriges Gespräch mit meinem Team. Bin mir noch unsicher, ob ich alles richtig gemacht habe. Möchte das erstmal für mich behalten und reflektieren.</p>
                  </div>
                  
                  {/* Geteilte Notizen */}
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-500 flex items-center">
                        <span className="mr-2">👥</span>
                        📅 3. August 2024 • Mit Coach geteilt
                      </div>
                    </div>
                    <p className="text-gray-800">Die Techniken aus der letzten Session haben wirklich geholfen! Möchte in der nächsten Session über weitere Kommunikationsstrategien sprechen.</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-500 flex items-center">
                        <span className="mr-2">🔒</span>
                        📅 1. August 2024 • Privat
                      </div>
                    </div>
                    <p className="text-gray-800">Manchmal fühle ich mich überfordert. Gut zu wissen, dass ich einen sicheren Raum habe, um das zu reflektieren, ohne dass jemand anders es lesen muss.</p>
                  </div>
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

// ENHANCED ADD TOOL MODAL mit Smart-Tagging
const EnhancedAddToolModal = ({ isOpen, onClose, onSubmit }) => {
  const [toolData, setToolData] = useState({
    name: '',
    description: '',
    category: '',
    keywords: [],
    type: '',
    difficulty: '',
    duration: '',
    targetAudience: [],
    coachingPhase: [],
    url: '',
    file: null,
    notes: ''
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);

  // VORDEFINIERTE KATEGORIEN & TAGS
  const categories = [
    'Zielsetzung & Visionen',
    'Persönlichkeitsentwicklung', 
    'Kommunikation & Feedback',
    'Führung & Management',
    'Stressmanagement & Resilienz',
    'Work-Life-Balance',
    'Konfliktlösung',
    'Teamdynamik',
    'Karriereentwicklung',
    'Selbstreflexion',
    'Entscheidungsfindung',
    'Motivation & Antrieb'
  ];

  const toolTypes = [
    { id: 'assessment', name: '📋 Assessment/Test', desc: 'Bewertungen & Selbsteinschätzungen' },
    { id: 'scale', name: '📊 Skala/Bewertung', desc: 'Numerische Bewertungen mit Reglern' },
    { id: 'framework', name: '🎯 Framework/Modell', desc: 'Strukturierte Gesprächsführung' },
    { id: 'exercise', name: '💪 Übung/Aktivität', desc: 'Praktische Aufgaben' },
    { id: 'checklist', name: '✅ Checkliste', desc: 'Schritt-für-Schritt Listen' },
    { id: 'template', name: '📄 Template/Vorlage', desc: 'Ausfüllbare Dokumente' },
    { id: 'worksheet', name: '📝 Arbeitsblatt', desc: 'Strukturierte Reflexion' }
  ];

  const difficulties = ['Anfänger', 'Fortgeschritten', 'Experte'];
  const durations = ['5-15 Min', '15-30 Min', '30-60 Min', '1-2 Stunden', '2+ Stunden'];
  
  const targetAudiences = [
    'Führungskräfte', 'Nachwuchstalente', 'Teammitglieder', 
    'Unternehmer', 'Berufswechsler', 'Hochsensible Personen',
    'Burnout-Betroffene', 'Konfliktparteien'
  ];

  const coachingPhases = [
    'Kennenlernen & Rapport', 'Zieldefinition', 'Ist-Analyse',
    'Lösungsentwicklung', 'Umsetzungsplanung', 'Erfolgsmessung',
    'Reflexion & Lernen', 'Abschluss & Transfer'
  ];

  const generateKeywordSuggestions = (name, description, category) => {
    const commonKeywords = {
      'Zielsetzung & Visionen': ['ziele', 'vision', 'träume', 'zukunft', 'erfolg', 'motivation'],
      'Kommunikation & Feedback': ['gespräch', 'feedback', 'kommunikation', 'dialog', 'zuhören'],
      'Führung & Management': ['führung', 'team', 'delegation', 'entscheidung', 'verantwortung'],
      'Stressmanagement & Resilienz': ['stress', 'entspannung', 'druck', 'belastung', 'ruhe'],
      'Persönlichkeitsentwicklung': ['persönlichkeit', 'werte', 'stärken', 'potenzial', 'wachstum']
    };

    const textSuggestions = [];
    const text = `${name} ${description}`.toLowerCase();
    
    const coachingTerms = [
      'selbstvertrauen', 'motivation', 'ziele', 'stress', 'balance', 
      'kommunikation', 'führung', 'team', 'konflikt', 'entscheidung',
      'werte', 'vision', 'erfolg', 'veränderung', 'entwicklung'
    ];

    coachingTerms.forEach(term => {
      if (text.includes(term)) {
        textSuggestions.push(term);
      }
    });

    const categoryKeywords = commonKeywords[category] || [];
    
    return [...new Set([...textSuggestions, ...categoryKeywords])];
  };

  const addKeyword = (keyword) => {
    if (keyword && !toolData.keywords.includes(keyword)) {
      setToolData({
        ...toolData,
        keywords: [...toolData.keywords, keyword]
      });
    }
    setKeywordInput('');
  };

  const removeKeyword = (keyword) => {
    setToolData({
      ...toolData,
      keywords: toolData.keywords.filter(k => k !== keyword)
    });
  };

  React.useEffect(() => {
    if (toolData.name || toolData.description || toolData.category) {
      const suggestions = generateKeywordSuggestions(
        toolData.name, 
        toolData.description, 
        toolData.category
      );
      setSuggestedKeywords(suggestions.slice(0, 8));
    }
  }, [toolData.name, toolData.description, toolData.category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!toolData.name || !toolData.category || toolData.keywords.length === 0) {
      alert('Bitte füllen Sie mindestens Name, Kategorie und Keywords aus!');
      return;
    }

    onSubmit({
      ...toolData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      searchScore: toolData.keywords.length + (toolData.description ? 1 : 0)
    });
    
    setToolData({
      name: '', description: '', category: '', keywords: [],
      type: '', difficulty: '', duration: '', targetAudience: [],
      coachingPhase: [], url: '', file: null, notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">🛠 Neues Tool hinzufügen</h3>
              <p className="text-gray-600 mt-1">Je mehr Details, desto besser die Suche!</p>
            </div>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool-Name * <span className="text-xs text-gray-500">(wird bei Suche priorisiert)</span>
                </label>
                <input
                  type="text"
                  required
                  value={toolData.name}
                  onChange={(e) => setToolData({...toolData, name: e.target.value})}
                  placeholder="z.B. GROW-Modell, Wheel of Life, Stress-Ampel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung * <span className="text-xs text-gray-500">(wird durchsucht)</span>
                </label>
                <textarea
                  required
                  value={toolData.description}
                  onChange={(e) => setToolData({...toolData, description: e.target.value})}
                  placeholder="Was macht dieses Tool? Wofür wird es eingesetzt? Welche Probleme löst es?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hauptkategorie *
                </label>
                <select
                  required
                  value={toolData.category}
                  onChange={(e) => setToolData({...toolData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Kategorie wählen</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suchbegriffe/Keywords * <span className="text-xs text-gray-500">(wichtigster Teil!)</span>
                </label>
                
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword(keywordInput.toLowerCase()))}
                    placeholder="Suchbegriff eingeben und Enter drücken"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addKeyword(keywordInput.toLowerCase())}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Aktuelle Keywords:</div>
                  <div className="flex flex-wrap gap-2">
                    {toolData.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{keyword}</span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {suggestedKeywords.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">💡 Vorgeschlagene Keywords:</div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedKeywords
                        .filter(suggestion => !toolData.keywords.includes(suggestion))
                        .map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => addKeyword(suggestion)}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-800 transition-colors"
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              🛠 Tool hinzufügen
            </button>
          </div>
        </form>
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
    { id: 'dashboard', name: 'Cockpit', icon: HomeIcon },
    { id: 'clients', name: 'Coachees', icon: UserIcon },
    { id: 'sessions', name: 'Gespräche', icon: CalendarIcon },
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
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">🛠 Coaching Tools</h2>
                <p className="text-gray-600 mt-2">Professionelle Tools und Ressourcen für erfolgreiches Coaching</p>
              </div>
              <button
                onClick={() => setShowAddToolModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + Tool hinzufügen
              </button>
            </div>

            {/* Tool-Kategorien */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-blue-900">Zielsetzung</h3>
                <p className="text-sm text-blue-700 mt-1">SMART Goals, Vision Boards</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-semibold text-green-900">Persönlichkeit</h3>
                <p className="text-sm text-green-700 mt-1">Tests, Assessments, Reflexion</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-purple-900">Kommunikation</h3>
                <p className="text-sm text-purple-700 mt-1">Gesprächsführung, Feedback</p>
              </div>
            </div>

            {/* Standard-Tools */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">⭐</span>
                Empfohlene Standard-Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "GROW-Modell Template",
                    category: "Gesprächsführung",
                    description: "Strukturierter Ansatz für Coaching-Gespräche mit Goal-Reality-Options-Way forward Framework",
                    icon: "🎯",
                    type: "Template",
                    difficulty: "Einfach",
                    duration: "30-60 Min"
                  },
                  {
                    name: "Wheel of Life",
                    category: "Lebensbalance",
                    description: "Visualisierung der Lebensbereiche zur Identifikation von Verbesserungspotenzialen",
                    icon: "⭕",
                    type: "Assessment",
                    difficulty: "Einfach",
                    duration: "15-30 Min"
                  },
                  {
                    name: "Werte-Identifikation",
                    category: "Persönlichkeitsentwicklung",
                    description: "Systematische Ermittlung der persönlichen Kernwerte und Prioritäten",
                    icon: "💎",
                    type: "Workshop",
                    difficulty: "Mittel",
                    duration: "45-90 Min"
                  },
                  {
                    name: "Kommunikationsstile-Test",
                    category: "Kommunikation",
                    description: "Analyse der bevorzugten Kommunikationsmuster und -stile",
                    icon: "💬",
                    type: "Assessment",
                    difficulty: "Einfach",
                    duration: "20-30 Min"
                  },
                  {
                    name: "Stressoren-Mapping",
                    category: "Stressmanagement",
                    description: "Identifikation und Kategorisierung von Stressquellen mit Lösungsansätzen",
                    icon: "🔥",
                    type: "Analyse",
                    difficulty: "Mittel",
                    duration: "30-45 Min"
                  },
                  {
                    name: "Führungsstil-Reflexion",
                    category: "Leadership",
                    description: "Selbsteinschätzung des eigenen Führungsverhaltens mit 360°-Feedback-Option",
                    icon: "👑",
                    type: "Assessment",
                    difficulty: "Fortgeschritten",
                    duration: "60-90 Min"
                  }
                ].map((tool, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{tool.icon}</div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tool.difficulty === 'Einfach' ? 'bg-green-100 text-green-800' :
                        tool.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tool.difficulty}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kategorie:</span>
                        <span className="font-medium">{tool.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Typ:</span>
                        <span className="font-medium">{tool.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Dauer:</span>
                        <span className="font-medium">{tool.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                        Verwenden
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                        ℹ️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eigene Tools */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">🔧</span>
                Meine eigenen Tools
              </h3>
              
              {tools.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛠</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Noch keine eigenen Tools</h4>
                  <p className="text-gray-600 mb-6">Fügen Sie Ihre bewährten Coaching-Tools hinzu</p>
                  <button
                    onClick={() => setShowAddToolModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Erstes Tool hinzufügen
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <div key={tool.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl">🔧</div>
                        <button
                          onClick={() => handleDeleteTool(tool.id)}
                          className="text-red-600 hover:text-red-800 text-sm p-1"
                        >
                          🗑
                        </button>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      
                      <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-4">
                        {tool.category}
                      </span>
                      
                      {tool.url && (
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                        >
                          Tool öffnen →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tool-Statistiken */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">📊</span>
                Tool-Nutzung
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{tools.length + 6}</div>
                  <div className="text-gray-600">Verfügbare Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">24</div>
                  <div className="text-gray-600">Nutzungen diese Woche</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                  <div className="text-gray-600">Favoriten</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
                  <div className="text-gray-600">Kategorien</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'branding':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">🎨 Branding & Corporate Identity</h2>
            
            {/* Logo & Identity */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">🏢</span>
                Logo & Corporate Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Firmenlogo hochladen
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <div className="space-y-3">
                      <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🖼</span>
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
                        >
                          Logo auswählen
                        </label>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG bis 2MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Firmenname
                    </label>
                    <input
                      type="text"
                      defaultValue="Coaching Excellence GmbH"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slogan/Tagline
                    </label>
                    <input
                      type="text"
                      defaultValue="Potentiale entfalten, Erfolg gestalten"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      defaultValue="https://coaching-excellence.ch"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Farbschema */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">🎨</span>
                Farbschema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Primärfarbe
                  </label>
                  <div className="space-y-3">
                    <input
                      type="color"
                      defaultValue="#3B82F6"
                      className="h-20 w-full rounded-lg border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      defaultValue="#3B82F6"
                      className="w-full text-center border border-gray-300 rounded px-3 py-1 text-sm"
                    />
                    <p className="text-xs text-gray-500">Hauptfarbe für Buttons, Links</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sekundärfarbe
                  </label>
                  <div className="space-y-3">
                    <input
                      type="color"
                      defaultValue="#10B981"
                      className="h-20 w-full rounded-lg border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      defaultValue="#10B981"
                      className="w-full text-center border border-gray-300 rounded px-3 py-1 text-sm"
                    />
                    <p className="text-xs text-gray-500">Akzentfarbe für Highlights</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Hintergrundfarbe
                  </label>
                  <div className="space-y-3">
                    <input
                      type="color"
                      defaultValue="#F9FAFB"
                      className="h-20 w-full rounded-lg border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      defaultValue="#F9FAFB"
                      className="w-full text-center border border-gray-300 rounded px-3 py-1 text-sm"
                    />
                    <p className="text-xs text-gray-500">Hintergrund des Dashboards</p>
                  </div>
                </div>
              </div>
              
              {/* Farbpalette Vorschau */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">Vorschau</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Primär Button</button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Sekundär Button</button>
                    <span className="text-blue-600 font-medium">Link Beispiel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typografie */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">📝</span>
                Typografie
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Hauptschrift (Headlines)
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Inter (Standard)</option>
                    <option>Helvetica Neue</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Lato</option>
                  </select>
                  <div className="mt-3 p-4 bg-gray-50 rounded">
                    <h1 className="text-2xl font-bold">Beispiel Headline</h1>
                    <h2 className="text-xl font-semibold text-gray-700">Beispiel Subheadline</h2>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Textschrift (Body)
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Inter (Standard)</option>
                    <option>System Font</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Source Sans Pro</option>
                  </select>
                  <div className="mt-3 p-4 bg-gray-50 rounded">
                    <p className="text-base text-gray-900">Beispiel Fließtext für das Dashboard. Diese Schrift wird für alle regulären Inhalte verwendet.</p>
                    <p className="text-sm text-gray-600 mt-2">Kleinerer Text für Zusatzinformationen und Metadaten.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Kontakt */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-3">📱</span>
                Social Media & Kontaktdaten
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Social Media Links</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-600">📘</span>
                      <input
                        type="url"
                        placeholder="LinkedIn Profil URL"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-400">🐦</span>
                      <input
                        type="url"
                        placeholder="Twitter/X Profil URL"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-pink-600">📷</span>
                      <input
                        type="url"
                        placeholder="Instagram Profil URL"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Kontaktinformationen</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span>📧</span>
                      <input
                        type="email"
                        placeholder="E-Mail Adresse"
                        defaultValue="kontakt@coaching-excellence.ch"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span>📞</span>
                      <input
                        type="tel"
                        placeholder="Telefonnummer"
                        defaultValue="+41 44 123 45 67"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span>📍</span>
                      <input
                        type="text"
                        placeholder="Adresse"
                        defaultValue="Bahnhofstrasse 123, 8001 Zürich"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Speichern Button */}
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Branding-Einstellungen speichern
              </button>
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
                    {activeView === 'dashboard' && (
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
              <EnhancedAddToolModal
                isOpen={showAddToolModal}
                onClose={() => setShowAddToolModal(false)}
                onSubmit={handleAddTool}
              />
            )}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;