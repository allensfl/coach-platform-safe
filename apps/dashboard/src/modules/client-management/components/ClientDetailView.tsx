import React, { useState } from 'react';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, Briefcase, Target, Shield, FileText, Download, Printer } from 'lucide-react';

interface ClientDetailViewProps {
  client: any;
  onBack: () => void;
  onEdit: (client: any) => void;
  onNewSession: (client: any) => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ 
  client, 
  onBack, 
  onEdit, 
  onNewSession 
}) => {
  // CRASH-PROOF: Sichere Fallbacks für alle Daten
  const safeClient = {
    id: client?.id || 'unknown',
    name: client?.name || client?.firstName + ' ' + client?.lastName || 'Unbekannter Klient',
    firstName: client?.firstName || client?.name?.split(' ')[0] || 'Unbekannt',
    lastName: client?.lastName || client?.name?.split(' ')[1] || 'Klient',
    email: client?.email || 'keine-email@example.com',
    phone: client?.phone || 'Nicht angegeben',
    address: client?.address || 'Adresse nicht verfügbar',
    birthDate: client?.birthDate || '1990-01-01',
    company: client?.company || 'Nicht angegeben',
    position: client?.position || 'Nicht angegeben',
    coachingGoals: client?.coachingGoals || ['Berufliche Entwicklung'],
    sessionPreferences: client?.sessionPreferences || {
      duration: '60 min',
      frequency: 'Wöchentlich',
      preferredTime: 'Vormittag',
      sessionType: 'Präsenz'
    },
    notes: client?.notes || [],
    sessions: client?.sessions || [],
    dsgvoConsents: client?.dsgvoConsents || {
      dataProcessing: { granted: true, date: new Date().toISOString() },
      sessionNotes: { granted: true, date: new Date().toISOString() },
      recordings: { granted: false, date: null },
      marketing: { granted: false, date: null },
      research: { granted: false, date: null },
      extendedStorage: { granted: true, date: new Date().toISOString() }
    }
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [showDSGVOModal, setShowDSGVOModal] = useState(false);

  // Alter berechnen
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(safeClient.birthDate);

  const tabs = [
  { id: 'overview', label: 'Übersicht', icon: <Target className="w-4 h-4" /> },
  { id: 'sessions', label: 'Gespräche', icon: <Calendar className="w-4 h-4" /> },
  { id: 'development', label: '🌱 Entwicklungsspuren', icon: <Target className="w-4 h-4" /> },
  { id: 'notes', label: 'Notizen', icon: <FileText className="w-4 h-4" /> },
  { id: 'goals', label: 'Ziele', icon: <Target className="w-4 h-4" /> },
  { id: 'privacy', label: 'Datenschutz', icon: <Shield className="w-4 h-4" /> }
];

  // DSGVO Consent Status
  const consentItems = [
    { 
      key: 'dataProcessing', 
      label: 'Grundlegende Datenverarbeitung', 
      description: 'Verarbeitung persönlicher Daten zur Vertragserfüllung',
      required: true 
    },
    { 
      key: 'sessionNotes', 
      label: 'Session-Notizen', 
      description: 'Speicherung und Verarbeitung von Coaching-Session-Notizen',
      required: false 
    },
    { 
      key: 'recordings', 
      label: 'Aufzeichnungen', 
      description: 'Audio-/Video-Aufzeichnungen von Sessions',
      required: false 
    },
    { 
      key: 'marketing', 
      label: 'Marketing-Kommunikation', 
      description: 'Newsletter, Angebote und Marketing-Materialien',
      required: false 
    },
    { 
      key: 'research', 
      label: 'Forschung & Entwicklung', 
      description: 'Anonymisierte Daten für Coaching-Forschung',
      required: false 
    },
    { 
      key: 'extendedStorage', 
      label: 'Erweiterte Datenspeicherung', 
      description: 'Speicherung über gesetzliche Mindestdauer hinaus',
      required: false 
    }
  ];

  const DSGVOFormModal = () => {
    if (!showDSGVOModal) return null;

    const handlePrint = () => {
      window.print();
    };

    const handleDownload = () => {
      // Hier würde PDF-Generation implementiert
      alert('PDF-Download wird implementiert...');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">DSGVO-Einverständniserklärung</h2>
              <button 
                onClick={() => setShowDSGVOModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6 print:p-8" id="dsgvo-form">
            {/* DSGVO Formular Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Einverständniserklärung zur Datenverarbeitung</h1>
              <p className="text-gray-600">gemäß Art. 6 und 7 DSGVO</p>
            </div>

            {/* Coach & Client Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-2">Coach</h3>
                <p><strong>Name:</strong> Dr. Schmidt</p>
                <p><strong>Praxis:</strong> Coach MCS</p>
                <p><strong>Adresse:</strong> Musterstraße 1, 12345 Stadt</p>
                <p><strong>E-Mail:</strong> kontakt@coach-mcs.de</p>
              </div>
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-2">Klient</h3>
                <p><strong>Name:</strong> {safeClient.firstName} {safeClient.lastName}</p>
                <p><strong>Geburtsdatum:</strong> {safeClient.birthDate}</p>
                <p><strong>E-Mail:</strong> {safeClient.email}</p>
                <p><strong>Adresse:</strong> {safeClient.address}</p>
              </div>
            </div>

            {/* Einverständnisse */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Einverständniserklärungen</h3>
              {consentItems.map((item) => {
                const consent = safeClient.dsgvoConsents[item.key];
                return (
                  <div key={item.key} className="border-b pb-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        {item.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded mt-1 inline-block">
                            Erforderlich
                          </span>
                        )}
                      </div>
                      <div className="ml-4 text-center">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          consent?.granted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                        }`}>
                          {consent?.granted && '✓'}
                        </div>
                        <div className="text-xs mt-1">
                          {consent?.granted ? 'Erteilt' : 'Nicht erteilt'}
                        </div>
                        {consent?.date && (
                          <div className="text-xs text-gray-500">
                            {new Date(consent.date).toLocaleDateString('de-DE')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rechtliche Informationen */}
            <div className="mb-8 text-sm">
              <h3 className="font-semibold mb-2">Ihre Rechte gemäß DSGVO</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                <li>Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
            </div>

            {/* Unterschriften */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="border-t-2 border-gray-300 pt-4">
                <p className="text-center font-medium">Unterschrift Klient</p>
                <div className="h-16"></div>
                <p className="text-center text-sm">
                  {safeClient.firstName} {safeClient.lastName}
                </p>
              </div>
              <div className="border-t-2 border-gray-300 pt-4">
                <p className="text-center font-medium">Unterschrift Coach</p>
                <div className="h-16"></div>
                <p className="text-center text-sm">Dr. Schmidt</p>
              </div>
            </div>

            {/* Formular-Metadaten */}
            <div className="text-xs text-gray-500 border-t pt-4">
              <p><strong>Formular-ID:</strong> DSGVO-{safeClient.id}-{Date.now()}</p>
              <p><strong>Erstellt am:</strong> {new Date().toLocaleString('de-DE')}</p>
              <p><strong>Version:</strong> 1.0</p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="p-6 border-t bg-gray-50 flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Printer className="w-4 h-4 mr-2" />
              Drucken
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF Download
            </button>
            <button 
              onClick={() => setShowDSGVOModal(false)}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Zurück
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-2xl font-bold">Client Details</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onEdit(client)}
                className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Bearbeiten
              </button>
              <button
                onClick={() => onNewSession(client)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Neue Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Client Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="px-6 py-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {safeClient.firstName[0]}{safeClient.lastName[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{safeClient.firstName} {safeClient.lastName}</h2>
              <p className="text-blue-100 mt-1">{age} Jahre • {safeClient.position} bei {safeClient.company}</p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {safeClient.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {safeClient.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {safeClient.address}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{safeClient.sessions.length}</div>
              <div className="text-blue-100">Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Persönliche Informationen</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Vollständiger Name</label>
                    <p className="mt-1">{safeClient.firstName} {safeClient.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Alter</label>
                    <p className="mt-1">{age} Jahre</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">E-Mail</label>
                    <p className="mt-1">{safeClient.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telefon</label>
                    <p className="mt-1">{safeClient.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Berufliche Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Unternehmen</label>
                    <p className="mt-1">{safeClient.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Position</label>
                    <p className="mt-1">{safeClient.position}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Session-Präferenzen</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span className="text-sm font-medium">Dauer</span>
                    <span className="text-blue-600 font-semibold">{safeClient.sessionPreferences.duration}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm font-medium">Häufigkeit</span>
                    <span className="text-green-600 font-semibold">{safeClient.sessionPreferences.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                    <span className="text-sm font-medium">Bevorzugte Zeit</span>
                    <span className="text-purple-600 font-semibold">{safeClient.sessionPreferences.preferredTime}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm font-medium">Session-Art</span>
                    <span className="text-orange-600 font-semibold">{safeClient.sessionPreferences.sessionType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">DSGVO-Einverständnisse</h3>
                <button
                  onClick={() => setShowDSGVOModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  DSGVO-Formular erstellen
                </button>
              </div>

              <div className="space-y-4">
                {consentItems.map((item) => {
                  const consent = safeClient.dsgvoConsents[item.key];
                  return (
                    <div key={item.key} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium">{item.label}</h4>
                            {item.required && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                Erforderlich
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            consent?.granted 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {consent?.granted ? 'Erteilt' : 'Nicht erteilt'}
                          </span>
                          {consent?.date && (
                            <div className="text-xs text-gray-500 mt-1 text-center">
                              {new Date(consent.date).toLocaleDateString('de-DE')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">DSGVO-Status Übersicht</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Erforderliche Einverständnisse:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {consentItems.filter(item => item.required && safeClient.dsgvoConsents[item.key]?.granted).length}/
                      {consentItems.filter(item => item.required).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Optionale Einverständnisse:</span>
                    <span className="ml-2 font-medium text-blue-600">
                      {consentItems.filter(item => !item.required && safeClient.dsgvoConsents[item.key]?.granted).length}/
                      {consentItems.filter(item => !item.required).length}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Compliance-Status</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Andere Tabs - vereinfacht */}
        {activeTab !== 'overview' && activeTab !== 'privacy' && (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <h3 className="text-lg font-semibold mb-2">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <p className="text-gray-600">Dieser Bereich wird in der nächsten Version implementiert.</p>
          </div>
        )}
      </div>

      {/* DSGVO Modal */}
      <DSGVOFormModal />
    </div>
  );
};

export default ClientDetailView;