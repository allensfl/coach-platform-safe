import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Home,
  BookOpen,
  Target,
  Zap,
  ExternalLink,
  Activity
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Klienten', href: '/clients', icon: Users },
  { name: 'Sessions', href: '/sessions', icon: MessageSquare },
  { name: 'Kalender', href: '/calendar', icon: Calendar },
  { name: 'Leitfäden', href: '/guides', icon: BookOpen },
  { name: 'Ziele', href: '/goals', icon: Target },
  { name: 'Einstellungen', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const location = useLocation()
  const [missionControlStatus, setMissionControlStatus] = useState<'online' | 'offline' | 'loading'>('online')

  const handleMissionControlClick = () => {
    setMissionControlStatus('loading')
    // Öffne Mission Control in neuem Tab
    window.open('http://localhost:5173', '_blank')
    // Reset status nach kurzer Zeit
    setTimeout(() => setMissionControlStatus('online'), 1000)
  }

  return (
    <div className={cn(
      "flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white">CoachPlatform</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Mission Control Integration */}
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={handleMissionControlClick}
          className={cn(
            "w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200",
            "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
            "text-white font-medium shadow-lg hover:shadow-xl",
            "border border-purple-500/30 hover:border-purple-400/50",
            isCollapsed && "justify-center"
          )}
          disabled={missionControlStatus === 'loading'}
        >
          <div className="relative">
            <Activity className={cn("w-5 h-5", missionControlStatus === 'loading' && "animate-pulse")} />
            <div className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
              missionControlStatus === 'online' && "bg-green-400",
              missionControlStatus === 'offline' && "bg-red-400",
              missionControlStatus === 'loading' && "bg-yellow-400 animate-pulse"
            )} />
          </div>
          
          {!isCollapsed && (
            <>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold">Mission Control</div>
                <div className="text-xs text-purple-100">KI-Coaching System</div>
              </div>
              <ExternalLink className="w-4 h-4 text-purple-200" />
            </>
          )}
        </button>

        {!isCollapsed && (
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Status:</span>
            <span className={cn(
              "font-medium",
              missionControlStatus === 'online' && "text-green-400",
              missionControlStatus === 'offline' && "text-red-400",
              missionControlStatus === 'loading' && "text-yellow-400"
            )}>
              {missionControlStatus === 'online' && 'Online'}
              {missionControlStatus === 'offline' && 'Offline'}
              {missionControlStatus === 'loading' && 'Verbinde...'}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-300 hover:text-white hover:bg-slate-700",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!isCollapsed && (
          <div className="text-xs text-slate-400 text-center">
            <div>TIER 1 System</div>
            <div className="text-purple-400 font-medium">Ready for Launch</div>
          </div>
        )}
      </div>
    </div>
  )
}