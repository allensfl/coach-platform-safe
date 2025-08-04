import { useState } from 'react'
import {
  Users,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  Brain,
  Zap,
  ExternalLink,
  Sparkles,
  MessageSquare,
  BookOpen,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function DashboardOverview() {
  const [missionControlStatus, setMissionControlStatus] = useState<'online' | 'connecting'>('online')

  const handleMissionControlLaunch = () => {
    setMissionControlStatus('connecting')
    window.open('http://localhost:5173', '_blank')
    setTimeout(() => setMissionControlStatus('online'), 1500)
  }

  const handleAllMethodsClick = () => {
    // Verschiedene Ansätze um das NewSessionModal zu öffnen
    
    // Ansatz 1: React Router Navigation zu Sessions
    window.location.href = '/sessions';
    
    // Ansatz 2: Event für Modal (falls implementiert)
    // window.dispatchEvent(new CustomEvent('openNewSessionModal'));
    
    // Ansatz 3: Direkter DOM-Zugriff (falls Button existiert)
    // setTimeout(() => {
    //   const newSessionBtn = document.querySelector('[data-new-session], .new-session-btn, #new-session') as HTMLButtonElement;
    //   if (newSessionBtn) {
    //     newSessionBtn.click();
    //   }
    // }, 100);
  }

  // Mock data - In real app would come from your data layer
  const stats = {
    totalClients: 24,
    activeSessions: 8,
    completedGoals: 156,
    successRate: 94
  }

  const recentSessions = [
    { client: 'Sarah Müller', method: 'Systemisches Coaching', status: 'completed', time: '10:00' },
    { client: 'Michael Schmidt', method: 'Solution-Focused', status: 'scheduled', time: '14:30' },
    { client: 'Anna Weber', method: 'Ressourcenorientiert', status: 'in-progress', time: '16:00' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Willkommen in Ihrem Coaching-Cockpit</p>
        </div>
        <div className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium flex items-center">
          <CheckCircle className="w-3 h-3 mr-1" />
          TIER 1 - Launch Ready
        </div>
      </div>

      {/* Mission Control Integration Card */}
      <div className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full -translate-y-16 translate-x-16" />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <span>Mission Control</span>
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </h2>
                <p className="text-gray-600">
                  Triadisches KI-Coaching System
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${missionControlStatus === 'online' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
              <span className="text-sm font-medium text-gray-600">
                {missionControlStatus === 'online' ? 'Online' : 'Verbinde...'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">KI-Assistent</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Coaching-Support 24/7</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Triadisches System</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Coach + KI + Klient</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-indigo-100">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">Live Integration</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Nahtlos verbunden</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-600">
              Starten Sie das KI-Coaching System für erweiterte Funktionen
            </p>
            <button
              onClick={handleMissionControlLaunch}
              disabled={missionControlStatus === 'connecting'}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 disabled:opacity-70"
            >
              {missionControlStatus === 'connecting' ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Verbinde...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Mission Control starten</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Aktive Klienten
            </h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalClients}</div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12% zum Vormonat
          </p>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Sessions heute
            </h3>
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.activeSessions}</div>
          <p className="text-xs text-blue-600 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            3 in den nächsten 2h
          </p>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Erreichte Ziele
            </h3>
            <Target className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.completedGoals}</div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            +8 diese Woche
          </p>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Erfolgsrate
            </h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.successRate}%</div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Ausgezeichnet
          </p>
        </div>
      </div>

      {/* Recent Sessions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Aktuelle Sessions</span>
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Ihre heutigen Coaching-Termine
            </p>
          </div>
          <div className="p-6 pt-0 space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    session.status === 'completed' ? 'bg-green-400' :
                    session.status === 'in-progress' ? 'bg-blue-400' : 'bg-yellow-400'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{session.client}</p>
                    <p className="text-sm text-gray-600">{session.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{session.time}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-700">
                    {session.status === 'completed' ? 'Abgeschlossen' :
                     session.status === 'in-progress' ? 'Läuft' : 'Geplant'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Quick Actions</span>
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Schnelle Aktionen für Ihren Coaching-Alltag
            </p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            {/* Standard Session Button */}
            <button 
              onClick={handleAllMethodsClick}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              <span>Neue Session planen</span>
            </button>

            {/* PREMIUM FEATURE - Triadisches KI-Coaching */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">PREMIUM FEATURE</span>
                </div>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full font-medium">
                  TIER 2/3
                </span>
              </div>
              <button 
                onClick={handleMissionControlLaunch}
                className="w-full p-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl"
              >
                <Brain className="w-5 h-5" />
                <span>Triadisches KI-Coaching</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-xs text-amber-700 mt-2 text-center">
                Coach + KI + Klient • GT1-GT12 Prompts • Weltweit einzigartig
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}