import React from 'react';
import { Calendar, MapPin, Phone, Mail, Shield, FileText } from 'lucide-react';

interface ClientData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  birthDate?: string;
}

interface ConsentData {
  basicData: boolean;
  sessionNotes: boolean;
  recordings: boolean;
  marketing: boolean;
  dataSharing: boolean;
  extendedStorage: boolean;
  timestamp: string;
  ipAddress?: string;
  version: string;
}

interface DSGVOConsentFormProps {
  clientData: ClientData;
  consentData: ConsentData;
  formId?: string;
  coachData?: {
    name: string;
    title: string;
    company: string;
    street: string;
    zipCode: string;
    city: string;
    phone: string;
    email: string;
  };
}

const DSGVOConsentForm: React.FC<DSGVOConsentFormProps> = ({ 
  clientData, 
  consentData, 
  formId = `DSGVO-${Date.now()}`,
  coachData = {
    name: "Dr. Sarah Schmidt",
    title: "Certified Professional Coach",
    company: "Schmidt Coaching Solutions",
    street: "Coaching Straße 123",
    zipCode: "10115",
    city: "Berlin",
    phone: "+49 30 12345678",
    email: "info@schmidt-coaching.de"
  }
}) => {
  const currentDate = new Date().toLocaleDateString('de-DE');
  const currentTime = new Date().toLocaleTimeString('de-DE');

  const consentItems = [
    {
      key: 'basicData',
      title: 'Grundlegende Datenverarbeitung für Coaching-Dienstleistungen',
      required: true,
      description: 'Verarbeitung von Kontaktdaten, Terminen und grundlegenden Coaching-Informationen zur Durchführung der vereinbarten Dienstleistungen.',
      legalBasis: 'Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)',
      dataTypes: 'Name, Kontaktdaten, Terminkalender, Grundlegende Coaching-Präferenzen, Rechnungsdaten',
      retention: '3 Jahre nach Vertragsende',
      purpose: 'Durchführung der Coaching-Dienstleistung, Terminverwaltung, Rechnungsstellung'
    },
    {
      key: 'sessionNotes',
      title: 'Session-Notizen und detaillierte Reflexionen',
      required: false,
      description: 'Speicherung detaillierter Session-Notizen, Ziele, Fortschritte und persönlicher Reflexionen für eine bessere Coaching-Kontinuität.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: 'Session-Protokolle, Persönliche Ziele und Herausforderungen, Coaching-Fortschritte, Reflexionen',
      retention: '5 Jahre nach Vertragsende',
      purpose: 'Kontinuierliches Coaching, Fortschrittsverfolgung, Qualitätssicherung'
    },
    {
      key: 'recordings',
      title: 'Session-Aufzeichnungen (Audio/Video)',
      required: false,
      description: 'Audio- oder Video-Aufzeichnungen von Coaching-Sessions für Ihre persönliche Nachbereitung und Reflexion.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: 'Audio-Aufzeichnungen, Video-Aufzeichnungen, Transkripte, Metadaten',
      retention: '2 Jahre nach Aufzeichnung',
      purpose: 'Persönliche Nachbereitung, Reflexion, Lernunterstützung'
    },
    {
      key: 'marketing',
      title: 'Newsletter und Marketing-Kommunikation',
      required: false,
      description: 'Zusendung von Coaching-Tipps, Newsletter, Informationen über neue Angebote und relevante Weiterbildungsmöglichkeiten.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: 'E-Mail-Adresse, Name, Präferenzen, Interaktionsdaten',
      retention: 'Bis zum Widerruf',
      purpose: 'Newsletter-Versand, Marketing, Informationen über neue Angebote'
    },
    {
      key: 'dataSharing',
      title: 'Anonymisierte Datenweitergabe für Forschung',
      required: false,
      description: 'Verwendung anonymisierter und pseudonymisierter Daten für Coaching-Forschung, Methodenverbesserung und Qualitätssicherung.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: 'Anonymisierte Session-Statistiken, Coaching-Erfolgsmetriken, Demografische Daten',
      retention: 'Unbegrenzt (anonymisiert)',
      purpose: 'Forschung, Methodenverbesserung, Qualitätssicherung'
    },
    {
      key: 'extendedStorage',
      title: 'Erweiterte Datenspeicherung (7 Jahre)',
      required: false,
      description: 'Aufbewahrung der Coaching-Daten über die gesetzliche Mindestfrist hinaus für Langzeit-Coaching-Kontinuität.',
      legalBasis: 'Art. 6 Abs. 1 lit. a DSGVO (Einverständnis)',
      dataTypes: 'Vollständige Coaching-Historie, Langzeit-Entwicklungsdaten, Referenzmaterialien',
      retention: '7 Jahre nach Vertragsende',
      purpose: 'Langzeit-Coaching-Kontinuität, Referenzzwecke, Entwicklungsverfolgung'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-4 text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Datenschutz-Einverständniserklärung
            </h1>
            <p className="text-lg text-gray-700">gemäß EU-Datenschutz-Grundverordnung (DSGVO)</p>
          </div>
          <div className="text-right">
            <div className="bg-gray-100 p-3 rounded">
              <p className="font-mono text-xs">Formular-ID: {formId}</p>
              <p className="text-xs text-gray-600">Erstellt: {currentDate} um {currentTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coach Information */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Verantwortlicher für die Datenverarbeitung
        </h2>
        <div className="bg-gray-50 border rounded p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">{coachData.name}</p>
              <p className="text-gray-600">{coachData.title}</p>
              <p className="font-medium mt-2">{coachData.company}</p>
            </div>
            <div>
              <p className="flex items-center mb-1">
                <MapPin className="w-4 h-4 mr-2" />
                {coachData.street}, {coachData.zipCode} {coachData.city}
              </p>
              <p className="flex items-center mb-1">
                <Phone className="w-4 h-4 mr-2" />
                {coachData.phone}
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {coachData.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Betroffene Person (Klient/in)</h2>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">{clientData.firstName} {clientData.lastName}</p>
              {clientData.birthDate && (
                <p className="text-gray-600">
                  Geboren: {new Date(clientData.birthDate).toLocaleDateString('de-DE')}
                </p>
              )}
            </div>
            <div>
              <p className="flex items-center mb-1">
                <Mail className="w-4 h-4 mr-2" />
                {clientData.email}
              </p>
              {clientData.phone && (
                <p className="flex items-center mb-1">
                  <Phone className="w-4 h-4 mr-2" />
                  {clientData.phone}
                </p>
              )}
              {(clientData.street || clientData.city) && (
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {clientData.street && `${clientData.street}, `}
                  {clientData.zipCode && `${clientData.zipCode} `}
                  {clientData.city}
                  {clientData.country && clientData.country !== 'Deutschland' && `, ${clientData.country}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Consent Declarations */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Einverständniserklärungen</h2>
        
        <div className="space-y-6">
          {consentItems.map((item, index) => {
            const isGranted = consentData[item.key as keyof ConsentData] as boolean;
            
            return (
              <div key={item.key} className="border rounded-lg p-4">
                <div className="flex items-start mb-3">
                  <div className="mt-1 mr-4">
                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                      isGranted ? 'bg-green-500 border-green-500' : 'border-gray-400'
                    }`}>
                      {isGranted && <span className="text-white text-sm">✓</span>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {index + 1}. {item.title}
                      {item.required && <span className="text-red-600 ml-1">*</span>}
                    </h3>
                    <p className="text-gray-700 mb-3">{item.description}</p>
                    
                    <div className="bg-gray-50 rounded p-3 space-y-2 text-xs">
                      <div><strong>Rechtsgrundlage:</strong> {item.legalBasis}</div>
                      <div><strong>Zweck der Verarbeitung:</strong> {item.purpose}</div>
                      <div><strong>Verarbeitete Datenarten:</strong> {item.dataTypes}</div>
                      <div><strong>Speicherdauer:</strong> {item.retention}</div>
                    </div>
                    
                    <div className="mt-3 text-sm">
                      <strong>Einverständnis:</strong>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        isGranted 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {isGranted ? '✓ ERTEILT' : '✗ NICHT ERTEILT'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rights Information */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Ihre Rechte gemäß DSGVO</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="mb-3">Als betroffene Person haben Sie folgende Rechte:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p>• <strong>Art. 15 DSGVO:</strong> Recht auf Auskunft</p>
              <p>• <strong>Art. 16 DSGVO:</strong> Recht auf Berichtigung</p>
              <p>• <strong>Art. 17 DSGVO:</strong> Recht auf Löschung</p>
              <p>• <strong>Art. 18 DSGVO:</strong> Recht auf Einschränkung</p>
            </div>
            <div>
              <p>• <strong>Art. 20 DSGVO:</strong> Recht auf Datenübertragbarkeit</p>
              <p>• <strong>Art. 21 DSGVO:</strong> Widerspruchsrecht</p>
              <p>• <strong>Art. 7 Abs. 3 DSGVO:</strong> Recht auf Widerruf</p>
              <p>• <strong>Art. 77 DSGVO:</strong> Beschwerderecht</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            Der Widerruf einer Einverständniserklärung berührt nicht die Rechtmäßigkeit der 
            bis zum Widerruf erfolgten Verarbeitung.
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Dokumentation</h2>
        <div className="bg-gray-100 rounded p-4 space-y-2 text-xs font-mono">
          <p><strong>Digital erfasst am:</strong> {new Date(consentData.timestamp).toLocaleString('de-DE')}</p>
          <p><strong>Formular-Version:</strong> {consentData.version}</p>
          <p><strong>IP-Adresse:</strong> {consentData.ipAddress || 'Nicht erfasst'}</p>
          <p><strong>Formular-ID:</strong> {formId}</p>
        </div>
      </div>

      {/* Signatures */}
      <div className="border-t-2 border-gray-800 pt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Unterschriften</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Client Signature */}
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Klient/in:</p>
              <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
              <p className="text-sm text-gray-600">
                {clientData.firstName} {clientData.lastName}
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Ort, Datum:</p>
              <div className="border-b-2 border-gray-400 h-8"></div>
            </div>
          </div>

          {/* Coach Signature */}
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Coach:</p>
              <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
              <p className="text-sm text-gray-600">
                {coachData.name}
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Ort, Datum:</p>
              <div className="border-b-2 border-gray-400 h-8"></div>
            </div>
          </div>
        </div>

        {/* Witness (Optional) */}
        <div className="mt-8 pt-4 border-t border-gray-300">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Zeuge (optional):</p>
              <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
            </div>
            <div>
              <p className="font-medium mb-2">Ort, Datum:</p>
              <div className="border-b-2 border-gray-400 h-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500">
        <div className="flex justify-between">
          <p>© {new Date().getFullYear()} {coachData.company} - Alle Rechte vorbehalten</p>
          <p>Seite 1 von 1</p>
        </div>
        <p className="mt-2 text-center">
          Diese Einverständniserklärung wurde gemäß den Anforderungen der EU-DSGVO erstellt.
        </p>
      </div>

      {/* Print Button (hidden in print) */}
      <div className="print:hidden mt-8 text-center">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          Formular drucken
        </button>
      </div>
    </div>
  );
};

export default DSGVOConsentForm;