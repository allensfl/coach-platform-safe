import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileText, Target, User, Clock } from 'lucide-react';

const CoacheeView: React.FC = () => {
  // Extract token from URL
  const token = window.location.pathname.split('/coachee/')[1];
  
  // Mock coachee data based on token
  const getCoacheeData = (token: string) => {
    const coachees = {
      'sarah-mueller-abc123': {
        name: 'Sarah Müller',
        profession: 'Führungskraft',
        coach: 'Coach MCS Team',
        topics: ['Teamführung', 'Work-Life-Balance', 'Konflikte'],
        nextSession: '2024-08-12 14:00',
        totalSessions: 12,
        developmentNotes: [
          {
            date: '2024-08-01',
            session: 12,
            focus: 'Teamführung optimieren',
            insights: 'Erkannte Delegations-Blockaden, erste Schritte zur Vertrauensbildung',
            progress: 'Durchbruch bei Perfektionismus-Thema',
            nextSteps: 'Team-Meeting mit neuer Haltung führen'
          },
          {
            date: '2024-07-15',
            session: 11,
            focus: 'Work-Life-Balance',
            insights: 'Grenzen setzen zwischen Beruf und Privatleben',
            progress: 'Konkrete Abend-Routine entwickelt',
            nextSteps: 'Handy nach 19 Uhr stumm schalten'
          },
          {
            date: '2024-07-01',
            session: 10,
            focus: 'Konflikt-Management',
            insights: 'Konflikt-Vermeidung vs. konstruktive Auseinandersetzung',
            progress: 'Mut gefasst für schwieriges Gespräch mit Kollegen',
            nextSteps: 'Feedback-Gespräch mit Team-Lead führen'
          }
        ]
      },
      'michael-schmidt-def456': {
        name: 'Michael Schmidt',
        profession: 'Entrepreneur',
        coach: 'Coach MCS Team',
        topics: ['Unternehmensstrategie', 'Delegation', 'Stress'],
        nextSession: '2024-08-10 10:00',
        totalSessions: 8,
        developmentNotes: [
          {
            date: '2024-07-25',
            session: 8,
            focus: 'Delegation verbessern',
            insights: 'Micro-Management-Tendenzen erkannt',
            progress: 'Erstes erfolgreiches Projekt vollständig delegiert',
            nextSteps: 'Wöchentliche Check-ins statt tägliche Kontrolle'
          }
        ]
      }
    };
    
    return coachees[token as keyof typeof coachees] || null;
  };

  const coacheeData = getCoacheeData(token);

  if (!coacheeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🔍 Coachee nicht gefunden</h1>
          <p className="text-gray-600 mb-6">Der Link ist ungültig oder abgelaufen.</p>
          <p className="text-sm text-gray-500">Token: {token}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Willkommen, {coacheeData.name}!</h1>
                <p className="text-sm text-gray-600">{coacheeData.profession} • Betreut von {coacheeData.coach}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Nächste Session</p>
              <p className="font-medium text-gray-900">{coacheeData.nextSession}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gespräche Gesamt</p>
                <p className="text-2xl font-bold text-gray-900">{coacheeData.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Fokus-Themen</p>
                <p className="text-2xl font-bold text-gray-900">{coacheeData.topics.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Coaching seit</p>
                <p className="text-2xl font-bold text-gray-900">6 Mon.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Development Journey */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  🌱 Meine Entwicklungsreise
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Ihre persönlichen Fortschritte und Erkenntnisse aus den Coaching-Sessions
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {coacheeData.developmentNotes.map((note, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 hover:border-blue-400 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          Session {note.session} • {note.focus}
                        </h3>
                        <span className="text-xs text-gray-500">{note.date}</span>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">💡 Erkenntnisse:</span>
                          <p className="text-gray-600 mt-1">{note.insights}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-green-700">📈 Fortschritt:</span>
                          <p className="text-gray-600 mt-1">{note.progress}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-blue-700">🎯 Nächste Schritte:</span>
                          <p className="text-gray-600 mt-1">{note.nextSteps}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Preparation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  🎯 Vorbereitung Nächste Session
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Was möchten Sie beim nächsten Gespräch besprechen?
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Was beschäftigt Sie aktuell am meisten?
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Teilen Sie Ihre Gedanken und Herausforderungen mit..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welche Fortschritte haben Sie gemacht?
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Erfolge, Erkenntnisse, positive Veränderungen..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Woran möchten Sie arbeiten?
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Ziele, Wünsche, Bereiche für Entwicklung..."
                    />
                  </div>

                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    ✅ Vorbereitung speichern
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Next Session */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white p-6">
              <h3 className="font-semibold mb-2">📅 Nächste Session</h3>
              <p className="text-blue-100 text-sm mb-4">
                {coacheeData.nextSession}
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                🔗 Zoom-Link öffnen
              </button>
            </div>

            {/* Current Topics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">🎯 Ihre Coaching-Themen</h3>
              <div className="space-y-2">
                {coacheeData.topics.map((topic, index) => (
                  <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">⚡ Schnellaktionen</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  📝 Reflexion hinzufügen
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  📅 Termin umbuchen
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  💬 Nachricht an Coach
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoacheeView;