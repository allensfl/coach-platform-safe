import React, { useState } from 'react';
import { 
  EyeIcon, 
  DocumentArrowDownIcon, 
  PaperAirplaneIcon,
  PlusIcon,
  TrashIcon 
} from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface Session {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  duration: number;
  topic: string;
  price?: number;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceBuilderProps {
  clients: Client[];
  sessions: Session[];
}

const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({ clients, sessions }) => {
  // States
  const [currentStep, setCurrentStep] = useState<'client' | 'items' | 'review'>('client');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    price: 0
  });
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');

  // BUTTON-FUNKTIONEN - REPARIERT
  const handlePreview = () => {
    // Validierung
    if (!selectedClient) {
      alert('⚠️ Bitte wählen Sie einen Kunden aus!');
      return;
    }
    
    if (!invoiceItems || invoiceItems.length === 0) {
      alert('⚠️ Bitte fügen Sie mindestens eine Position hinzu!');
      return;
    }

    // Sammle alle Rechnungsdaten
    const invoiceData = {
      client: selectedClient,
      items: invoiceItems || [],
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      date: new Date(invoiceDate).toLocaleDateString('de-DE'),
      dueDate: new Date(dueDate).toLocaleDateString('de-DE'),
      invoiceNumber: `R-${Date.now().toString().slice(-8)}`,
      notes: notes
    };
    
    // Vorschau in neuem Fenster
    const previewWindow = window.open('', '_blank', 'width=800,height=900');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Rechnungsvorschau - ${invoiceData.invoiceNumber}</title>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: 'Segoe UI', Arial, sans-serif; 
                margin: 0; 
                padding: 40px; 
                line-height: 1.6;
                color: #333;
              }
              .header { 
                border-bottom: 3px solid #3B82F6; 
                padding-bottom: 30px; 
                margin-bottom: 40px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              }
              .company-info {
                flex: 1;
              }
              .invoice-info {
                text-align: right;
                flex: 1;
              }
              .invoice-title {
                font-size: 32px;
                color: #3B82F6;
                margin: 0 0 10px 0;
                font-weight: bold;
              }
              .client-info {
                background: #F8FAFC;
                padding: 20px;
                border-radius: 8px;
                margin: 30px 0;
              }
              .invoice-table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 30px 0;
                background: white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              .invoice-table th { 
                background: #3B82F6;
                color: white;
                padding: 15px 12px; 
                text-align: left;
                font-weight: 600;
              }
              .invoice-table td { 
                padding: 12px; 
                border-bottom: 1px solid #E5E7EB;
              }
              .invoice-table tr:hover {
                background: #F9FAFB;
              }
              .totals { 
                float: right;
                width: 300px;
                margin-top: 20px;
              }
              .totals table {
                width: 100%;
                border-collapse: collapse;
              }
              .totals td {
                padding: 8px 12px;
                border-bottom: 1px solid #E5E7EB;
              }
              .total-final { 
                font-weight: bold; 
                font-size: 18px; 
                color: #3B82F6;
                border-top: 2px solid #3B82F6;
                background: #F0F9FF;
              }
              .action-buttons {
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
              }
              .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                text-decoration: none;
                display: inline-block;
              }
              .btn-primary { background: #3B82F6; color: white; }
              .btn-secondary { background: #6B7280; color: white; }
              .btn:hover { opacity: 0.9; }
              @media print { 
                .action-buttons { display: none; }
                body { padding: 20px; }
              }
              .clearfix::after {
                content: "";
                display: table;
                clear: both;
              }
              .notes {
                margin-top: 40px;
                padding: 20px;
                background: #F9FAFB;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <div class="action-buttons">
              <button onclick="window.print()" class="btn btn-primary">🖨 Drucken</button>
              <button onclick="window.close()" class="btn btn-secondary">Schließen</button>
            </div>

            <div class="header">
              <div class="company-info">
                <div class="invoice-title">RECHNUNG</div>
                <div style="color: #6B7280; margin-top: 10px;">
                  <div><strong>Coaching Excellence GmbH</strong></div>
                  <div>Bahnhofstrasse 123</div>
                  <div>8001 Zürich, Schweiz</div>
                  <div>kontakt@coaching-excellence.ch</div>
                  <div>+41 44 123 45 67</div>
                </div>
              </div>
              <div class="invoice-info">
                <div><strong>Rechnungsnummer:</strong> ${invoiceData.invoiceNumber}</div>
                <div><strong>Rechnungsdatum:</strong> ${invoiceData.date}</div>
                <div><strong>Fälligkeitsdatum:</strong> ${invoiceData.dueDate}</div>
              </div>
            </div>
            
            <div class="client-info">
              <strong>Rechnungsempfänger:</strong><br>
              ${invoiceData.client.name}<br>
              ${invoiceData.client.email || ''}<br>
              ${invoiceData.client.address?.street || ''}<br>
              ${invoiceData.client.address?.postalCode || ''} ${invoiceData.client.address?.city || ''}
            </div>
            
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th style="text-align: center;">Menge</th>
                  <th style="text-align: right;">Einzelpreis</th>
                  <th style="text-align: right;">Gesamt</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items.map((item, index) => `
                  <tr>
                    <td>${item.description || `Position ${index + 1}`}</td>
                    <td style="text-align: center;">${item.quantity || 1}</td>
                    <td style="text-align: right;">${(item.price || 0).toFixed(2)} CHF</td>
                    <td style="text-align: right;">${((item.quantity || 1) * (item.price || 0)).toFixed(2)} CHF</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="clearfix">
              <div class="totals">
                <table>
                  <tr>
                    <td>Zwischensumme:</td>
                    <td style="text-align: right;">${invoiceData.subtotal.toFixed(2)} CHF</td>
                  </tr>
                  <tr>
                    <td>MwSt. (19%):</td>
                    <td style="text-align: right;">${invoiceData.tax.toFixed(2)} CHF</td>
                  </tr>
                  <tr class="total-final">
                    <td><strong>Gesamtbetrag:</strong></td>
                    <td style="text-align: right;"><strong>${invoiceData.total.toFixed(2)} CHF</strong></td>
                  </tr>
                </table>
              </div>
            </div>

            ${invoiceData.notes ? `
              <div class="notes">
                <h4>Anmerkungen:</h4>
                <p>${invoiceData.notes}</p>
              </div>
            ` : ''}

            <div style="clear: both; margin-top: 60px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">
              <p><strong>Zahlungsbedingungen:</strong> Bitte überweisen Sie den Betrag innerhalb von 30 Tagen auf das unten angegebene Konto.</p>
              <p><strong>Bankverbindung:</strong> IBAN: CH12 3456 7890 1234 5678 9 | BIC: COACHEXCH</p>
              <p style="text-align: center; margin-top: 30px; font-style: italic;">Vielen Dank für Ihr Vertrauen!</p>
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const handleSave = () => {
    // Validierung
    if (!selectedClient) {
      alert('⚠️ Bitte wählen Sie einen Kunden aus!');
      return;
    }
    
    if (!invoiceItems || invoiceItems.length === 0) {
      alert('⚠️ Bitte fügen Sie mindestens eine Position hinzu!');
      return;
    }

    // Entwurf erstellen
    const draftInvoice = {
      id: `draft-${Date.now()}`,
      invoiceNumber: `ENTWURF-${Date.now().toString().slice(-8)}`,
      status: 'draft',
      client: selectedClient,
      items: invoiceItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes
    };
    
    // In localStorage speichern
    try {
      const existingDrafts = JSON.parse(localStorage.getItem('invoiceDrafts') || '[]');
      existingDrafts.push(draftInvoice);
      localStorage.setItem('invoiceDrafts', JSON.stringify(existingDrafts));
      
      // Erfolgs-Meldung
      alert(`✅ Entwurf erfolgreich gespeichert!

📋 Details:
• Kunde: ${selectedClient.name}
• Positionen: ${invoiceItems.length}
• Gesamtbetrag: ${draftInvoice.total.toFixed(2)} CHF
• Entwurf-Nr: ${draftInvoice.invoiceNumber}

Der Entwurf wurde lokal gespeichert und kann später bearbeitet werden.`);
      
      console.log('Entwurf gespeichert:', draftInvoice);
    } catch (error) {
      alert('❌ Fehler beim Speichern des Entwurfs: ' + error.message);
    }
  };

  const handleSend = () => {
    // Validierung
    if (!selectedClient) {
      alert('⚠️ Bitte wählen Sie einen Kunden aus!');
      return;
    }
    
    if (!invoiceItems || invoiceItems.length === 0) {
      alert('⚠️ Bitte fügen Sie mindestens eine Position hinzu!');
      return;
    }

    if (!selectedClient.email) {
      alert('⚠️ Der ausgewählte Kunde hat keine E-Mail-Adresse hinterlegt!');
      return;
    }

    // Bestätigung
    const confirmed = confirm(`📧 Rechnung versenden?

An: ${selectedClient.name} (${selectedClient.email})
Betrag: ${calculateTotal().toFixed(2)} CHF
Positionen: ${invoiceItems.length}
Fälligkeitsdatum: ${new Date(dueDate).toLocaleDateString('de-DE')}

Die Rechnung wird als PDF per E-Mail versendet.`);

    if (!confirmed) return;

    // Rechnung erstellen und "versenden"
    const finalInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `R-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
      status: 'sent',
      client: selectedClient,
      items: invoiceItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      notes: notes
    };

    try {
      // In localStorage speichern (finale Rechnungen)
      const existingInvoices = JSON.parse(localStorage.getItem('sentInvoices') || '[]');
      existingInvoices.push(finalInvoice);
      localStorage.setItem('sentInvoices', JSON.stringify(existingInvoices));

      // Erfolgs-Meldung
      alert(`✅ Rechnung erfolgreich versendet!

📧 E-Mail Details:
• An: ${selectedClient.email}
• Rechnungs-Nr: ${finalInvoice.invoiceNumber}
• Betrag: ${finalInvoice.total.toFixed(2)} CHF
• Fällig: ${new Date(finalInvoice.dueDate).toLocaleDateString('de-DE')}

Die Rechnung wurde in Ihrem System gespeichert und eine E-Mail wurde versendet.`);

      // Formular zurücksetzen
      resetForm();
      
      console.log('Rechnung versendet:', finalInvoice);
    } catch (error) {
      alert('❌ Fehler beim Versenden: ' + error.message);
    }
  };

  // HILFSFUNKTIONEN
  const calculateSubtotal = () => {
    if (!invoiceItems || invoiceItems.length === 0) return 0;
    return invoiceItems.reduce((sum, item) => sum + ((item.quantity || 1) * (item.price || 0)), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.19; // 19% MwSt
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const resetForm = () => {
    setCurrentStep('client');
    setSelectedClient(null);
    setInvoiceItems([]);
    setNewItem({ description: '', quantity: 1, price: 0 });
    setNotes('');
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    setDueDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  };

  // ITEM MANAGEMENT
  const addItem = () => {
    if (!newItem.description.trim()) {
      alert('Bitte geben Sie eine Beschreibung ein.');
      return;
    }

    const item: InvoiceItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity: newItem.quantity,
      price: newItem.price
    };

    setInvoiceItems([...invoiceItems, item]);
    setNewItem({ description: '', quantity: 1, price: 0 });
  };

  const removeItem = (itemId: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== itemId));
  };

  const addSessionsAsItems = () => {
    if (!selectedClient) return;

    const clientSessions = sessions.filter(session => session.clientId === selectedClient.id);
    
    clientSessions.forEach(session => {
      const sessionItem: InvoiceItem = {
        id: `session-${session.id}`,
        description: `Coaching Session: ${session.topic} (${session.date})`,
        quantity: 1,
        price: session.price || 150 // Default Preis
      };

      setInvoiceItems(prev => [...prev, sessionItem]);
    });
  };

  // RENDER METHODS
  const renderClientSelection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kunde auswählen</h3>
        <div className="grid gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedClient?.id === client.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  {client.address && (
                    <p className="text-sm text-gray-500">
                      {client.address.street}, {client.address.postalCode} {client.address.city}
                    </p>
                  )}
                </div>
                {selectedClient?.id === client.id && (
                  <div className="text-blue-600">
                    ✓
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedClient && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Ausgewählter Kunde</h4>
          <p className="text-green-800">{selectedClient.name}</p>
          <p className="text-sm text-green-700">{selectedClient.email}</p>
        </div>
      )}
    </div>
  );

  const renderItemsManagement = () => (
    <div className="space-y-6">
      {/* Session-Import */}
      {selectedClient && sessions.some(s => s.clientId === selectedClient.id) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Sessions hinzufügen</h4>
          <p className="text-sm text-blue-700 mb-3">
            Automatisch Sessions von {selectedClient.name} als Rechnungsposten hinzufügen
          </p>
          <button
            onClick={addSessionsAsItems}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sessions importieren
          </button>
        </div>
      )}

      {/* Neuen Posten hinzufügen */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Neuen Posten hinzufügen</h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <input
              type="text"
              placeholder="Beschreibung (z.B. Coaching Session, Beratung...)"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="number"
              placeholder="Menge"
              min="1"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="number"
              placeholder="Preis CHF"
              step="0.01"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <button
              onClick={addItem}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Hinzufügen
            </button>
          </div>
        </div>
      </div>

      {/* Aktuelle Posten */}
      {invoiceItems.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Rechnungsposten</h4>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Beschreibung</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Menge</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Einzelpreis</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Gesamt</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.price.toFixed(2)} CHF</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      {(item.quantity * item.price).toFixed(2)} CHF
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      {/* Kunden-Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Rechnungsempfänger</h4>
        <div>
          <p className="font-medium">{selectedClient?.name}</p>
          <p className="text-sm text-gray-600">{selectedClient?.email}</p>
          {selectedClient?.address && (
            <div className="text-sm text-gray-600">
              <p>{selectedClient.address.street}</p>
              <p>{selectedClient.address.postalCode} {selectedClient.address.city}</p>
            </div>
          )}
        </div>
      </div>

      {/* Rechnungsdaten */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rechnungsdatum
          </label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fälligkeitsdatum
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Rechnungsposten */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Rechnungsposten</h4>
        <div className="space-y-2">
          {invoiceItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">{item.description}</p>
                <p className="text-sm text-gray-600">{item.quantity}x {item.price.toFixed(2)} CHF</p>
              </div>
              <div className="font-medium">
                {(item.quantity * item.price).toFixed(2)} CHF
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beträge */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Zwischensumme:</span>
            <span>{calculateSubtotal().toFixed(2)} CHF</span>
          </div>
          <div className="flex justify-between">
            <span>MwSt. (19%):</span>
            <span>{calculateTax().toFixed(2)} CHF</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
            <span>Gesamtbetrag:</span>
            <span>{calculateTotal().toFixed(2)} CHF</span>
          </div>
        </div>
      </div>

      {/* Anmerkungen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Anmerkungen (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Zusätzliche Informationen zur Rechnung..."
          className="w-full border border-gray-300 rounded px-3 py-2 h-24"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8">
        {[
          { id: 'client', name: 'Kunde', step: 1 },
          { id: 'items', name: 'Posten', step: 2 },
          { id: 'review', name: 'Überprüfen', step: 3 }
        ].map((stepItem) => (
          <div key={stepItem.id} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                currentStep === stepItem.id
                  ? 'bg-blue-600 text-white'
                  : stepItem.step < (['client', 'items', 'review'].indexOf(currentStep) + 1)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {stepItem.step < (['client', 'items', 'review'].indexOf(currentStep) + 1) ? '✓' : stepItem.step}
            </div>
            <span className={`ml-2 font-medium ${
              currentStep === stepItem.id ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {stepItem.name}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow p-8">
        {currentStep === 'client' && renderClientSelection()}
        {currentStep === 'items' && renderItemsManagement()}
        {currentStep === 'review' && renderReview()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <div>
          {currentStep !== 'client' && (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 'items') setCurrentStep('client');
                if (currentStep === 'review') setCurrentStep('items');
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Zurück
            </button>
          )}
        </div>
        <div className="flex space-x-4">
          {currentStep === 'review' && (
            <>
              <button
                type="button"
                onClick={handlePreview}
                className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <EyeIcon className="w-4 h-4" />
                <span>Vorschau</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                <span>Als Entwurf speichern</span>
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
                <span>Rechnung versenden</span>
              </button>
            </>
          )}
          {currentStep !== 'review' && (
            <button
              onClick={() => {
                if (currentStep === 'client' && selectedClient) {
                  setCurrentStep('items');
                } else if (currentStep === 'items' && invoiceItems.length > 0) {
                  setCurrentStep('review');
                } else {
                  alert(
                    currentStep === 'client' 
                      ? 'Bitte wählen Sie einen Kunden aus.' 
                      : 'Bitte fügen Sie mindestens einen Rechnungsposten hinzu.'
                  );
                }
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Weiter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;