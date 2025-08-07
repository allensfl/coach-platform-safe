// Settings.tsx - Comprehensive Settings Panel
import React, { useState } from 'react';
import { User, Building, DollarSign, Palette, Shield, Bell, Globe, Download, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    coachName: 'Dr. Maria Muster',
    credentials: 'Systemischer Coach, NLP Master',
    practice: 'Coaching Praxis Muster',
    address: 'Musterstraße 123, 8000 Zürich',
    phone: '+41 44 123 45 67',
    email: 'maria@coaching-muster.ch',
    hourlyRate: 150,
    currency: 'CHF',
    
    // Coaching Settings
    defaultDuration: 60,
    favoriteMethod: 'Systemisches Coaching',
    autoReminders: true,
    sessionTemplate: 'Standard 5-Phasen',
    
    // DSGVO Settings
    dataRetention: 24,
    autoBackup: true,
    consentRequired: true,
    
    // UI Settings
    theme: 'light',
    language: 'de',
    notifications: true,
    dashboardLayout: 'standard'
  });

  const tabs = [
    { id: 'profile', name: '👤 Profil & Praxis', icon: User },
    { id: 'coaching', name: '🎯 Coaching', icon: Building },
    { id: 'privacy', name: '🔒 Datenschutz', icon: Shield },
    { id: 'interface', name: '🎨 Oberfläche', icon: Palette },
    { id: 'notifications', name: '🔔 Benachrichtigungen', icon: Bell }
  ];

  const handleSave = () => {
    // Hier würde das Speichern in den Store/API passieren
    alert('Einstellungen gespeichert!');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⚙️ Einstellungen</h1>
          <p className="text-gray-600 mt-2">Personalisieren Sie Ihr Coach MCS</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          Speichern
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Profil & Praxis-Informationen</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coach Name</label>
                  <input
                    type="text"
                    value={settings.coachName}
                    onChange={(e) => setSettings({...settings, coachName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualifikationen</label>
                  <input
                    type="text"
                    value={settings.credentials}
                    onChange={(e) => setSettings({...settings, credentials: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Praxis Name</label>
                  <input
                    type="text"
                    value={settings.practice}
                    onChange={(e) => setSettings({...settings, practice: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stundensatz</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={settings.hourlyRate}
                      onChange={(e) => setSettings({...settings, hourlyRate: parseInt(e.target.value)})}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="CHF">CHF</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Praxis-Adresse</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'coaching' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Coaching-Einstellungen</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Standard Session-Dauer</label>
                  <select
                    value={settings.defaultDuration}
                    onChange={(e) => setSettings({...settings, defaultDuration: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={45}>45 Minuten</option>
                    <option value={60}>60 Minuten</option>
                    <option value={90}>90 Minuten</option>
                    <option value={120}>120 Minuten</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieblings-Coaching-Methode</label>
                  <select
                    value={settings.favoriteMethod}
                    onChange={(e) => setSettings({...settings, favoriteMethod: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Systemisches Coaching">Systemisches Coaching</option>
                    <option value="Lösungsorientiertes Coaching">Lösungsorientiertes Coaching</option>
                    <option value="Ressourcenorientiertes Coaching">Ressourcenorientiertes Coaching</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Automatische Erinnerungen</h3>
                    <p className="text-sm text-gray-600">Benachrichtigungen für anstehende Sessions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoReminders}
                      onChange={(e) => setSettings({...settings, autoReminders: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Datenschutz & DSGVO</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">🔒 DSGVO-Konform</h3>
                <p className="text-sm text-blue-800">Coach MCS erfüllt alle DSGVO-Anforderungen für die sichere Verwaltung von Klientendaten.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daten-Aufbewahrung (Monate)</label>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={12}>12 Monate</option>
                    <option value={24}>24 Monate</option>
                    <option value={36}>36 Monate</option>
                    <option value={60}>60 Monate</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Automatische Backups</h3>
                    <p className="text-sm text-gray-600">Tägliche verschlüsselte Datensicherung</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interface' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Benutzeroberfläche</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Design-Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Hell</option>
                    <option value="dark">Dunkel</option>
                    <option value="auto">Automatisch</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sprache</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Benachrichtigungen</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Desktop-Benachrichtigungen</h3>
                    <p className="text-sm text-gray-600">Erhalten Sie Benachrichtigungen auf Ihrem Desktop</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;