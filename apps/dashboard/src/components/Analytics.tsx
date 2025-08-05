// Analytics.tsx - Professional Coach Analytics Dashboard
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Clock, DollarSign, Star, Calendar, Target, Activity } from 'lucide-react';

const Analytics: React.FC = () => {
  // Mock data - später aus Store/API
  const monthlyStats = {
    sessions: 24,
    clients: 8,
    avgDuration: 52,
    revenue: 1890,
    satisfaction: 4.8,
    repeatClients: 75
  };

  const methodsData = [
    { name: 'Systemisches Coaching', value: 45, color: '#3B82F6' },
    { name: 'Lösungsorientiert', value: 25, color: '#10B981' },
    { name: 'Ressourcenorientiert', value: 15, color: '#F59E0B' },
    { name: 'Andere', value: 15, color: '#6B7280' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1450 },
    { month: 'Mar', revenue: 1680 },
    { month: 'Apr', revenue: 1890 }
  ];

  const sessionsPerDay = [
    { day: 'Mo', sessions: 3 },
    { day: 'Di', sessions: 4 },
    { day: 'Mi', sessions: 2 },
    { day: 'Do', sessions: 5 },
    { day: 'Fr', sessions: 3 },
    { day: 'Sa', sessions: 1 },
    { day: 'So', sessions: 0 }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Analytics</h1>
          <p className="text-gray-600 mt-2">Ihre Coaching-Performance im Überblick</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Letzten 30 Tage</option>
            <option>Letzten 90 Tage</option>
            <option>Dieses Jahr</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            📊 Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.sessions}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 ml-1">+12% vs. Vormonat</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktive Klienten</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.clients}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 ml-1">+3 neue Klienten</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ø Session-Dauer</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.avgDuration} Min</p>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600">Optimal: 45-60 Min</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Umsatz MTD</p>
              <p className="text-2xl font-bold text-gray-900">€{monthlyStats.revenue.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 ml-1">+15% vs. Vormonat</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📈 Umsatz-Entwicklung</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${value}`, 'Umsatz']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Coaching Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">🎯 Coaching-Methoden Verteilung</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={methodsData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {methodsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Anteil']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sessions per Day & Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sessions per Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📅 Sessions pro Wochentag</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sessionsPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">⭐ Qualitäts-Metriken</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Klienten-Zufriedenheit</span>
                <span className="text-lg font-bold text-gray-900">{monthlyStats.satisfaction}/5</span>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= monthlyStats.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Wiederkehrende Klienten</span>
                <span className="text-lg font-bold text-gray-900">{monthlyStats.repeatClients}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${monthlyStats.repeatClients}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Auslastung</span>
                <span className="text-lg font-bold text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 KI-Insights & Empfehlungen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Optimaler Zeitpunkt</p>
              <p className="text-sm text-gray-600">Ihre Sessions zwischen 14-16 Uhr sind am erfolgreichsten. Erwägen Sie mehr Termine in dieser Zeit.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Methoden-Fokus</p>
              <p className="text-sm text-gray-600">Systemisches Coaching zeigt die besten Ergebnisse. Vertiefen Sie diese Kompetenz weiter.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;