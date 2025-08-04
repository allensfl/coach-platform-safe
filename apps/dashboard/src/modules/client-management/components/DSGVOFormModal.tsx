import React, { useState } from 'react';
import { X, FileText, Download, Print, Eye, Shield } from 'lucide-react';
import DSGVOConsentForm from './DSGVOConsentForm';

interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  birthDate?: string;
  consentBasicData?: boolean;
  consentSessionNotes?: boolean;
  consentRecordings?: boolean;
  consentMarketing?: boolean;
  consentDataSharing?: boolean;
  consentExtendedStorage?: boolean;
}

interface DSGVOFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: ClientData;
}

const DSGVOFormModal: React.FC<DSGVOFormModalProps> = ({ 
  isOpen, 
  onClose, 
  clientData 
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [formId] = useState(`DSGVO-${Date.now()}`);

  if (!isOpen) return null;

  // Convert client data to consent data format
  const consentData = {
    basicData: clientData.consentBasicData || false,
    sessionNotes: clientData.consentSessionNotes || false,
    recordings: clientData.consentRecordings || false,
    marketing: clientData.consentMarketing || false,
    dataSharing: clientData.consentDataSharing || false,
    extendedStorage: clientData.consentExtendedStorage || false,
    timestamp: new Date().toISOString(),
    ipAddress: '127.0.0.1', // In real app, get actual IP
    version: '1.0'
  };

  const grantedConsents = Object.values(consentData).filter(Boolean).length - 3; // Subtract metadata fields
  const totalConsents = 6;

  const handlePrint = () => {
    // Create a new window with the form for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>DSGVO-Einverständniserklärung - ${clientData.firstName} ${clientData.lastName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            @media print { body { margin: 0; } }
            .print-only { display: none; }
            @media print { .print-only { display: block; } }
          </style>
        </head>
        <body>
          <div id="form-content"></div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = () => {
    // In a real application, you would generate a PDF here
    alert('PDF-Download wird implementiert. Verwenden Sie vorerst die Druck-Funktion.');
  };

  const handleSaveToArchive = () => {
    // In a real application, you would save to database/archive
    const archiveData = {
      formId,
      clientId: clientData.id,
      clientName: `${clientData.firstName} ${clientData.lastName}`,
      consentData,
      createdAt: new Date().toISOString(),
      status: 'archived'
    };
    
    console.log('Archiving DSGVO form:', archiveData);
    alert(`DSGVO-Formular wurde archiviert!\nFormular-ID: ${formId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-white mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-white">
                    DSGVO-Einverständniserklärung
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {clientData.firstName} {clientData.lastName} • Formular-ID: {formId}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {!showPreview ? (
              // Overview/Setup View
              <div className="space-y-6">
                {/* Client Overview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-3">Klient-Informationen</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Name:</strong> {clientData.firstName} {clientData.lastName}</p>
                      <p><strong>E-Mail:</strong> {clientData.email}</p>
                      {clientData.phone && <p><strong>Telefon:</strong> {clientData.phone}</p>}
                    </div>
                    <div>
                      {clientData.birthDate && (
                        <p><strong>Geburtsdatum:</strong> {new Date(clientData.birthDate).toLocaleDateString('de-DE')}</p>
                      )}
                      {(clientData.street || clientData.city) && (
                        <p><strong>Adresse:</strong> 
                          {clientData.street && ` ${clientData.street},`}
                          {clientData.zipCode && ` ${clientData.zipCode}`}
                          {clientData.city && ` ${clientData.city}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Consent Status */}
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Einverständnis-Status</h4>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">
                      Erteilte Einverständnisse: {grantedConsents} von {totalConsents}
                    </span>
                    <div className="text-xs text-gray-500">
                      {Math.round((grantedConsents / totalConsents) * 100)}% abgeschlossen
                    </div>
                  </div>
                  
                  <div className="bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(grantedConsents / totalConsents) * 100}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className={`flex items-center p-2 rounded ${
                      consentData.basicData ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        consentData.basicData ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      Grundlegende Datenverarbeitung {consentData.basicData ? '✓' : '✗'}
                    </div>
                    
                    <div className={`flex items-center p-2 rounded ${
                      consentData.sessionNotes ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        consentData.sessionNotes ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      Session-Notizen {consentData.sessionNotes ? '✓' : '✗'}
                    </div>
                    
                    <div className={`flex items-center p-2 rounded ${
                      consentData.recordings ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        consentData.recordings ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      Session-Aufzeichnungen {consentData.recordings ? '✓' : '✗'}
                    </div>
                    
                    <div className={`flex items-center p-2 rounded ${
                      consentData.marketing ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        consentData.marketing ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      Marketing & Newsletter {consentData.marketing ? '✓' : '✗'}
                    </div>
                    
                    <div className={`flex items-center p-2 rounded ${
                      consentData.dataSharing ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        consentData.dataSharing ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      Anonymisierte Datenweitergabe {consentData.dataSharing ? '✓' : '✗'}
                    </div>
                    
                    <div className={`flex items-center p-2 rounded ${
                      consentData.extendedStorage ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        consentData.extendedStorage ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      Erweiterte Datenspeicherung {consentData.extendedStorage ? '✓' : '✗'}
                    </div>
                  </div>
                </div>

                {/* Form Information */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Formular-Informationen</h4>
                  <div className="text-sm text-yellow-800 space-y-1">
                    <p><strong>Zweck:</strong> Rechtssichere Dokumentation der DSGVO-Einverständnisse</p>
                    <p><strong>Format:</strong> Druckbares PDF-kompatibles Formular</p>
                    <p><strong>Verwendung:</strong> Ausdrucken → Unterschreiben → Archivieren</p>
                    <p><strong>Gültigkeit:</strong> Mit Unterschrift rechtlich bindend</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Erstellt am: {new Date().toLocaleDateString('de-DE')} um {new Date().toLocaleTimeString('de-DE')}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Vorschau
                    </button>
                    <button
                      onClick={handleSaveToArchive}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Archivieren
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Preview View
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <h4 className="font-medium text-gray-900">Formular-Vorschau</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDownloadPDF}
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      <Print className="w-4 h-4 mr-1" />
                      Drucken
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
                    >
                      Zurück
                    </button>
                  </div>
                </div>
                
                {/* Form Preview */}
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                  <DSGVOConsentForm 
                    clientData={clientData}
                    consentData={consentData}
                    formId={formId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export also a button component for easy integration
export const DSGVOFormButton: React.FC<{ clientData: ClientData }> = ({ clientData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FileText className="w-4 h-4 mr-2" />
        DSGVO-Formular erstellen
      </button>
      
      <DSGVOFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientData={clientData}
      />
    </>
  );
};

export default DSGVOFormModal;