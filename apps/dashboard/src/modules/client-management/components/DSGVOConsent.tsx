import React, { useState } from 'react';
import { Shield, Check, X, Info, AlertCircle } from 'lucide-react';

interface ConsentData {
  basicData: boolean;
  sessionNotes: boolean;
  recordings: boolean;
  marketing: boolean;
  dataSharing: boolean;
  extendedStorage: boolean;
  timestamp: string;
  ipAddress: string;
  version: string;
}

interface DSGVOConsentProps {
  onConsentChange: (consentData: ConsentData) => void;
  initialConsent?: Partial<ConsentData>;
  clientName: string;
}

const DSGVOConsent: React.FC<DSGVOConsentProps> = ({ 
  onConsentChange, 
  initialConsent = {},
  clientName 
}) => {
  const [consents, setConsents] = useState({
    basicData: initialConsent.basicData || false,
    sessionNotes: initialConsent.sessionNotes || false,
    recordings: initialConsent.recordings || false,
    marketing: initialConsent.marketing || false,
    dataSharing: initialConsent.dataSharing || false,
    extendedStorage: initialConsent.extendedStorage || false
  });
  
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const updateConsent = (key: keyof typeof consents, value: boolean) => {
    const newConsents = { ...consents, [key]: value };
    setConsents(newConsents);
    
    // Create full consent data with metadata
    const consentData: ConsentData = {
      ...newConsents,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1', // In real app, get actual IP
      version: '1.0'
    };
    
    onConsentChange(consentData);
  };

  const consentItems = [
    {
      key: 'basicData' as const,
      title: 'Grundlegende Datenverarbeitung für Coaching-Dienstleistungen',
      required: true,
      description: 'Verarbeitung von Kontaktdaten, Terminen und grundlegenden Coaching-Informationen zur Durchführung der vereinbarten Dienstleistungen.',
      legalBasis: 'Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)',
      dataTypes: ['Name und Kontaktdaten', 'Terminkalender', 'Grundlegende Coaching-Präferenzen', 'Rechnungsdaten'],
      retention: '3 Jahre nach Vertragsende'
    },
    {
      key: 'sessionNotes' as const,
      title: 'Session-Notizen und detaillierte Reflexionen',
      required: false,
      description: 'Speicherung detaillierter Session-Notizen, Ziele, Fortschritte und persönlicher Reflexionen für eine bessere Coaching-Kontinuität.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: ['Session-Protokolle', 'Persönliche Ziele und Herausforderungen', 'Coaching-Fortschritte', 'Reflexionen und Erkenntnisse'],
      retention: '5 Jahre nach Vertragsende'
    },
    {
      key: 'recordings' as const,
      title: 'Session-Aufzeichnungen (Audio/Video)',
      required: false,
      description: 'Audio- oder Video-Aufzeichnungen von Coaching-Sessions für Ihre persönliche Nachbereitung und Reflexion.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: ['Audio-Aufzeichnungen', 'Video-Aufzeichnungen', 'Transkripte', 'Metadaten zu Aufzeichnungen'],
      retention: '2 Jahre nach Aufzeichnung'
    },
    {
      key: 'marketing' as const,
      title: 'Newsletter und Marketing-Kommunikation',
      required: false,
      description: 'Zusendung von Coaching-Tipps, Newsletter, Informationen über neue Angebote und relevante Weiterbildungsmöglichkeiten.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: ['E-Mail-Adresse', 'Name', 'Präferenzen', 'Interaktionsdaten'],
      retention: 'Bis zum Widerruf'
    },
    {
      key: 'dataSharing' as const,
      title: 'Anonymisierte Datenweitergabe für Forschung und Qualitätsverbesserung',
      required: false,
      description: 'Verwendung anonymisierter und pseudonymisierter Daten für Coaching-Forschung, Methodenverbesserung und Qualitätssicherung.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: ['Anonymisierte Session-Statistiken', 'Coaching-Erfolgsmetriken', 'Demografische Daten (anonymisiert)'],
      retention: 'Unbegrenzt (anonymisiert)'
    },
    {
      key: 'extendedStorage' as const,
      title: 'Erweiterte Datenspeicherung (7 Jahre)',
      required: false,
      description: 'Aufbewahrung der Coaching-Daten über die gesetzliche Mindestfrist hinaus für Langzeit-Coaching-Kontinuität und Referenzzwecke.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: ['Vollständige Coaching-Historie', 'Langzeit-Entwicklungsdaten', 'Referenzmaterialien'],
      retention: '7 Jahre nach Vertragsende'
    }
  ];

  const requiredConsents = consentItems.filter(item => item.required);
  const optionalConsents = consentItems.filter(item => !item.required);
  const grantedConsents = Object.values(consents).filter(Boolean).length;
  const requiredGranted = requiredConsents.every(item => consents[item.key]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Datenschutz-Einverständniserklärung
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Liebe/r <strong>{clientName}</strong>, gemäß der Datenschutz-Grundverordnung (DSGVO) 
              benötigen wir Ihr Einverständnis für die Verarbeitung Ihrer personenbezogenen Daten 
              im Rahmen unserer Coaching-Dienstleistung.
            </p>
            <div className="bg-blue-100 rounded p-3">
              <p className="text-xs text-blue-800">
                <strong>Ihre Rechte:</strong> Sie können diese Einverständnisse jederzeit widerrufen. 
                Der Widerruf berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              requiredGranted ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">
              Einverständnisse: {grantedConsents} von {consentItems.length} erteilt
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {requiredGranted ? 'Coaching kann starten' : 'Erforderliche Einverständnisse fehlen'}
          </div>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              requiredGranted ? 'bg-green-500' : 'bg-orange-500'
            }`}
            style={{ width: `${(grantedConsents / consentItems.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Required Consents */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
          Erforderliche Einverständnisse
        </h4>
        <div className="space-y-3">
          {requiredConsents.map((item) => (
            <div key={item.key} className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id={item.key}
                  checked={consents[item.key]}
                  onChange={(e) => updateConsent(item.key, e.target.checked)}
                  className="mr-3 h-5 w-5 text-red-600 focus:ring-red-500 border-red-300 rounded mt-0.5"
                />
                <div className="flex-1">
                  <label htmlFor={item.key} className="font-medium text-red-900 cursor-pointer">
                    {item.title} *
                  </label>
                  <p className="text-sm text-red-700 mt-1 mb-2">{item.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowDetails(showDetails === item.key ? null : item.key)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Info className="w-3 h-3 mr-1" />
                      Details anzeigen
                    </button>
                    <span className="text-xs text-red-600">
                      Rechtsgrundlage: {item.legalBasis}
                    </span>
                  </div>

                  {showDetails === item.key && (
                    <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                      <div className="space-y-2 text-xs text-red-800">
                        <div>
                          <strong>Verarbeitete Datenarten:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {item.dataTypes.map((type, index) => (
                              <li key={index}>{type}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong>Speicherdauer:</strong> {item.retention}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Consents */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Check className="w-4 h-4 text-green-500 mr-2" />
          Optionale Einverständnisse
        </h4>
        <div className="space-y-3">
          {optionalConsents.map((item) => (
            <div key={item.key} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id={item.key}
                  checked={consents[item.key]}
                  onChange={(e) => updateConsent(item.key, e.target.checked)}
                  className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <div className="flex-1">
                  <label htmlFor={item.key} className="font-medium text-gray-900 cursor-pointer">
                    {item.title}
                  </label>
                  <p className="text-sm text-gray-600 mt-1 mb-2">{item.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowDetails(showDetails === item.key ? null : item.key)}
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                    >
                      <Info className="w-3 h-3 mr-1" />
                      Details anzeigen
                    </button>
                    <span className="text-xs text-gray-500">
                      Rechtsgrundlage: {item.legalBasis}
                    </span>
                  </div>

                  {showDetails === item.key && (
                    <div className="mt-3 p-3 bg-gray-100 rounded border">
                      <div className="space-y-2 text-xs text-gray-700">
                        <div>
                          <strong>Verarbeitete Datenarten:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {item.dataTypes.map((type, index) => (
                              <li key={index}>{type}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong>Speicherdauer:</strong> {item.retention}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Information */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-2">Wichtige Informationen</h5>
        <div className="space-y-1 text-xs text-gray-600">
          <p>• Diese Einverständniserklärung wird digital archiviert und mit Zeitstempel versehen</p>
          <p>• Sie erhalten eine Kopie dieser Erklärung per E-Mail</p>
          <p>• Bei Fragen zum Datenschutz kontaktieren Sie uns unter datenschutz@coaching-platform.de</p>
          <p>• Unsere vollständige Datenschutzerklärung finden Sie unter www.coaching-platform.de/datenschutz</p>
        </div>
      </div>

      {/* Validation Status */}
      {!requiredGranted && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <X className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-red-800">
              Bitte erteilen Sie alle erforderlichen Einverständnisse, um das Coaching zu starten.
            </span>
          </div>
        </div>
      )}

      {requiredGranted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-green-800">
              Alle erforderlichen Einverständnisse wurden erteilt. Das Coaching kann beginnen!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DSGVOConsent;