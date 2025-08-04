import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NewSessionModal from './NewSessionModal';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  sessions: any[];
}

interface Session {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  startTime: string;
  duration: number;
  title: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
  location: string;
}

const SessionCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 's1',
      clientId: '1',
      clientName: 'Max Mustermann',
      date: '2025-07-30',
      startTime: '10:00',
      duration: 90,
      title: 'Karriereplanung & Zielsetzung',
      status: 'scheduled',
      type: 'coaching',
      location: 'office'
    },
    {
      id: 's2',
      clientId: '2',
      clientName: 'Anna Schmidt',
      date: '2025-07-31',
      startTime: '16:00',
      duration: 60,
      title: 'Work-Life-Balance Check-in',
      status: 'scheduled',
      type: 'follow-up',
      location: 'online'
    }
  ]);

  // Calendar and client data (mock)
  const clients = [
    { id: '1', firstName: 'Max', lastName: 'Mustermann', email: 'max@example.com' },
    { id: '2', firstName: 'Anna', lastName: 'Schmidt', email: 'anna@example.com' },
    { id: '3', firstName: 'Thomas', lastName: 'Weber', email: 'thomas@example.com' }
  ];

  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const weekDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.getTime() === today.getTime();
      const sessionsForDay = getSessionsForDate(date);

      days.push({
        date,
        isCurrentMonth,
        isToday,
        sessions: sessionsForDay
      });
    }

    return days;
  }, [currentDate, sessions]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'no-show': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : 'Unbekannter Klient';
  };

  const todaysSessions = useMemo(() => {
    const today = new Date();
    return getSessionsForDate(today).sort((a, b) => {
      if (!a.startTime || !b.startTime) return 0;
      return a.startTime.localeCompare(b.startTime);
    });
  }, [sessions]);

  const upcomingSessions = useMemo(() => {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    
    return sessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate > now && sessionDate <= nextWeek && session.status === 'scheduled';
      })
      .sort((a, b) => {
        const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateCompare !== 0) return dateCompare;
        if (!a.startTime || !b.startTime) return 0;
        return a.startTime.localeCompare(b.startTime);
      })
      .slice(0, 5);
  }, [sessions]);

  const handleNewSession = (sessionData: any) => {
    // Add client name for display
    const client = clients.find(c => c.id === sessionData.clientId);
    const newSession: Session = {
      ...sessionData,
      clientName: client ? `${client.firstName} ${client.lastName}` : 'Unbekannter Klient'
    };
    
    setSessions(prev => [...prev, newSession]);
    
    // Show success message (in real app, this would be a proper notification)
    alert(`Session "${sessionData.title}" wurde erfolgreich erstellt für ${newSession.clientName} am ${new Date(sessionData.date).toLocaleDateString('de-DE')} um ${sessionData.startTime} Uhr.`);
  };

  const handleCalendarDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsAddSessionOpen(true);
  };

  const handleQuickAddSession = (time?: string) => {
    const today = new Date();
    setSelectedDate(today);
    setIsAddSessionOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Session Kalender</h1>
          <p className="text-gray-600">Verwalten Sie Ihre Coaching Sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-gray-300 bg-white">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${viewType === 'month' ? 'rounded-l-lg' : ''} ${viewType === 'day' ? 'rounded-r-lg' : ''}`}
              >
                {viewType === 'month' ? 'Monat' : viewType === 'week' ? 'Woche' : 'Tag'}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleQuickAddSession()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Neue Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={goToToday}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Heute
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all ${
                      day.isCurrentMonth
                        ? 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300'
                        : 'bg-gray-50 border-gray-100'
                    } ${
                      day.isToday ? 'ring-2 ring-blue-500 border-blue-500' : ''
                    }`}
                    onClick={() => handleCalendarDayClick(day.date)}
                  >
                    <div className={`text-right mb-1 ${
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    } ${
                      day.isToday ? 'font-bold text-blue-600' : ''
                    }`}>
                      {day.date.getDate()}
                    </div>
                    
                    {/* Sessions for this day */}
                    <div className="space-y-1">
                      {day.sessions.slice(0, 2).map((session) => (
                        <div
                          key={session.id}
                          className={`text-xs p-1 rounded border ${getSessionStatusColor(session.status)} truncate cursor-pointer hover:shadow-sm`}
                          title={`${formatTime(session.startTime || '')} - ${session.clientName}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/sessions/${session.id}/plan`);
                          }}
                        >
                          <div className="font-medium">
                            {session.startTime && formatTime(session.startTime)}
                          </div>
                          <div className="truncate">
                            {session.clientName}
                          </div>
                        </div>
                      ))}
                      {day.sessions.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{day.sessions.length - 2} weitere
                        </div>
                      )}
                      {day.sessions.length === 0 && day.isCurrentMonth && (
                        <div className="text-xs text-gray-400 text-center opacity-0 hover:opacity-100 transition-opacity">
                          + Session hinzufügen
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Add Session */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm text-white p-4">
            <h3 className="font-semibold mb-3">Schnell-Erstellung</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickAddSession()}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded text-sm transition-colors"
              >
                📅 Für heute planen
              </button>
              <button
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setSelectedDate(tomorrow);
                  setIsAddSessionOpen(true);
                }}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded text-sm transition-colors"
              >
                🗓️ Für morgen planen
              </button>
            </div>
          </div>

          {/* Today's Sessions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Heute ({todaysSessions.length})</h3>
            </div>
            <div className="p-4">
              {todaysSessions.length > 0 ? (
                <div className="space-y-3">
                  {todaysSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {session.clientName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {session.startTime && formatTime(session.startTime)} - {session.duration}min
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSessionStatusColor(session.status)}`}>
                          {session.status === 'scheduled' ? 'Geplant' :
                           session.status === 'completed' ? 'Erledigt' :
                           session.status === 'cancelled' ? 'Abgesagt' : session.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => navigate(`/sessions/${session.id}`)}
                          className="text-xs text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => navigate(`/sessions/${session.id}/plan`)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          📋 Plan Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 5h6m-6-5v5a2 2 0 002 2h2a2 2 0 002-2v-5m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Keine Sessions heute</p>
                  <button
                    onClick={() => handleQuickAddSession()}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Session für heute planen
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Diese Woche</h3>
            </div>
            <div className="p-4">
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-shrink-0 text-center min-w-[40px]">
                          <div className="text-xs text-gray-500">
                            {new Date(session.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                          </div>
                          <div className="text-xs text-gray-400">
                            {session.startTime && formatTime(session.startTime)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {session.clientName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {session.title}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ml-12">
                        <button
                          onClick={() => navigate(`/sessions/${session.id}`)}
                          className="text-xs text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => navigate(`/sessions/${session.id}/plan`)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          📋 Planen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-600">Keine geplanten Sessions</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Übersicht</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Heute</span>
                <span className="font-medium">{todaysSessions.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diese Woche</span>
                <span className="font-medium">{upcomingSessions.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gesamt</span>
                <span className="font-medium">{sessions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Session Modal */}
      <NewSessionModal
        isOpen={isAddSessionOpen}
        onClose={() => {
          setIsAddSessionOpen(false);
          setSelectedDate(null);
        }}
        onSubmit={handleNewSession}
        selectedDate={selectedDate || undefined}
      />
    </div>
  );
};

export default SessionCalendar;