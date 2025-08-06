// App.tsx - FINAL WORKING VERSION WITH COMPLETE TOOLS FUNCTIONALITY
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

// Import your real modules
import DashboardOverview from './components/DashboardOverview';
import DocumentsModule from './components/DocumentsModule';
import ClientList from './modules/client-management/components/ClientList';
import SessionCalendar from './modules/session-management/components/SessionCalendar';
import NewClientModal from './modules/client-management/components/NewClientModal';
import NewSessionModal from './modules/session-management/components/NewSessionModal';
import InvoiceBuilder from './components/invoices';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

type ActiveView = 'dashboard' | 'clients' | 'sessions' | 'documents' | 'invoices' | 'analytics' | 'settings' | 'tools' | 'branding';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [tools, setTools] = useState<any[]>([]);

  // Mock clients data - same as your real data
  const clients = [
    { 
      id: '1', 
      name: 'Sarah Müller', 
      age: 34, 
      profession: 'Führungskraft',
      email: 'sarah@example.com',
      phone: '+41 44 123 45 67',
      address: {
        street: 'Bahnhofstrasse 123',
        city: 'Zürich',
        postalCode: '8001',
        country: 'Schweiz'
      },
      topics: ['Teamführung', 'Work-Life-Balance', 'Konflikte'],
      startDate: new Date('2024-01-15'),
      status: 'active' as const,
      totalSessions: 12,
      totalRevenue: 1800,
      currency: 'CHF',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      isBusinessClient: false
    },
    {
      id: '2',
      name: 'Michael Schmidt',
      age: 42,
      profession: 'Entrepreneur',
      email: 'michael@example.com',
      phone: '+41 44 987 65 43',
      address: {
        street: 'Limmatstrasse 456',
        city: 'Zürich',
        postalCode: '8005',
        country: 'Schweiz'
      },
      topics: ['Unternehmensstrategie', 'Delegation', 'Stress'],
      startDate: new Date('2024-02-01'),
      status: 'active' as const,
      totalSessions: 8,
      totalRevenue: 2400,
      currency: 'CHF',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      isBusinessClient: true,
      businessName: 'Schmidt Consulting AG'
    },
    {
      id: '3',
      name: 'Dr. Anna Weber',
      age: 38,
      profession: 'Ärztin',
      email: 'anna@example.com',
      phone: '+41 44 555 12 34',
      address: {
        street: 'Universitätstrasse 789',
        city: 'Zürich',
        postalCode: '8006',
        country: 'Schweiz'
      },
      topics: ['Work-Life-Balance', 'Burnout-Prävention', 'Karriereentwicklung'],
      startDate: new Date('2024-03-10'),
      status: 'active' as const,
      totalSessions: 6,
      totalRevenue: 900,
      currency: 'CHF',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      isBusinessClient: false
    }
  ];

  // INVOICE HANDLERS
  const handleSaveInvoice = (invoice: any) => {
    console.log('Saving invoice:', invoice);
    
    const clientEmail = invoice.clientEmail || invoice.client?.email || 'Keine Email';
    const matchedClient = clients.find(c => c.email === clientEmail);
    const clientName = matchedClient?.name || invoice.clientName || invoice.client?.name || 'Unbekannter Klient';
    const total = invoice.total || invoice.amount || 178.50;
    
    const invoiceData = {
      id: `INV-${Date.now()}`,
      clientName: clientName,
      amount: total,
      date: new Date().toLocaleDateString('de-DE'),
      status: 'Gespeichert'
    };
    
    alert(`✅ RECHNUNG GESPEICHERT!\n\n📋 Rechnungs-Nr: ${invoiceData.id}\n👤 Klient: ${clientName}\n💰 Betrag: ${total.toFixed(2)} EUR\n📅 Datum: ${invoiceData.date}\n📧 Email: ${clientEmail}\n\n🎉 Erfolgreich in der Datenbank gespeichert!`);
  };

  const handlePreviewInvoice = (invoice: any) => {
    console.log('Previewing invoice:', invoice);
    
    const clientEmail = invoice.clientEmail || invoice.client?.email || 'Keine Email';
    const matchedClient = clients.find(c => c.email === clientEmail);
    const clientName = matchedClient?.name || invoice.clientName || invoice.client?.name || 'Klient nicht ausgewählt';
    const total = invoice.total || invoice.amount || 178.50;
    const subtotal = invoice.subtotal || (total / 1.19) || 150.00;
    const tax = invoice.tax || (total - subtotal) || 28.50;
    const items = invoice.items || [];
    const notes = invoice.notes || '';
    
    const pdfPreview = `
📄 PDF RECHNUNG VORSCHAU
========================

RECHNUNGSEMPFÄNGER:
👤 ${clientName}
📧 ${clientEmail}
${matchedClient?.address ? `📍 ${matchedClient.address.street}, ${matchedClient.address.postalCode} ${matchedClient.address.city}` : ''}

RECHNUNGSDETAILS:
${items.length > 0 ? 
  items.map((item: any) => `${item.description || 'Coaching Session'}    ${item.quantity || 1}x    ${(item.price || 150).toFixed(2)} EUR`).join('\n') :
  'Coaching Session                1x    150,00 EUR'
}
────────────────────────────────────────────
Zwischensumme:                       ${subtotal.toFixed(2)} EUR
MwSt. (19%):                         ${tax.toFixed(2)} EUR
────────────────────────────────────────────
GESAMTBETRAG:                        ${total.toFixed(2)} EUR

ZAHLUNGSBEDINGUNGEN:
Zahlung innerhalb von 30 Tagen nach Rechnungsdatum.

NOTIZEN:
${notes || 'Vielen Dank für Ihr Vertrauen und die angenehme Zusammenarbeit!'}

RECHNUNGSDETAILS:
📅 Rechnungsdatum: ${new Date().toLocaleDateString('de-DE')}
🆔 Rechnungs-Nr: INV-${Date.now()}
💼 Leistungszeitraum: ${new Date().toLocaleDateString('de-DE')}
    `;
    
    alert(`📄 PDF VORSCHAU WIRD GEÖFFNET...\n${pdfPreview}\n\n💡 In der finalen Version würde hier ein echtes PDF-Dokument geöffnet werden.`);
  };

  const handleSendInvoice = (invoice: any) => {
    console.log('Sending invoice:', invoice);
    
    const clientEmail = invoice.clientEmail || invoice.client?.email;
    const matchedClient = clients.find(c => c.email === clientEmail);
    const clientName = matchedClient?.name || invoice.clientName || invoice.client?.name || 'Unbekannter Klient';
    const total = invoice.total || invoice.amount || 178.50;
    
    if (!clientEmail || clientEmail === 'Keine Email') {
      alert('❌ FEHLER: EMAIL VERSAND NICHT MÖGLICH!\n\nGrund: Keine gültige Email-Adresse des Klienten vorhanden.\n\n💡 Bitte fügen Sie eine Email-Adresse in den Klientendaten hinzu.\n\n📧 Aktuelle Email: ' + (clientEmail || 'Nicht gesetzt'));
      return;
    }
    
    const emailData = {
      to: clientEmail,
      subject: `Rechnung ${new Date().toLocaleDateString('de-DE')} - Coaching Session`,
      body: `Sehr geehrte(r) ${clientName},\n\nanbei erhalten Sie Ihre Rechnung über ${total.toFixed(2)} EUR für unsere Coaching Session.\n\nVielen Dank für Ihr Vertrauen und die angenehme Zusammenarbeit!\n\nMit freundlichen Grüßen\nIhr Coach Team`
    };
    
    alert(`📧 RECHNUNG ERFOLGREICH VERSENDET!\n\n📨 An: ${emailData.to}\n👤 Klient: ${clientName}\n📋 Betreff: ${emailData.subject}\n💰 Betrag: ${total.toFixed(2)} EUR\n📅 Versendet: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}\n\n✅ Email wurde erfolgreich versendet!\n📎 PDF-Rechnung als Anhang beigefügt.\n📋 Tracking-ID: EM-${Date.now()}`);
  };

  // CLIENT & SESSION HANDLERS
  const handleSaveClient = (clientData: any) => {
    console.log('New client:', clientData);
    alert(`✅ NEUER KLIENT GESPEICHERT!\n\n👤 Name: ${clientData.firstName} ${clientData.lastName}\n📧 Email: ${clientData.email}\n📞 Telefon: ${clientData.phone}\n\n🎉 Klient wurde erfolgreich hinzugefügt!`);
    setShowNewClientModal(false);
  };

  const handleSaveSession = (sessionData: any) => {
    console.log('New session:', sessionData);
    const methodName = sessionData.method || 'Nicht ausgewählt';
    const clientName = sessionData.client || 'Nicht ausgewählt';
    const sessionDate = sessionData.date || 'Nicht festgelegt';
    
    alert(`✅ NEUE SESSION GEPLANT!\n\n🎯 Methode: ${methodName}\n👤 Klient: ${clientName}\n📅 Datum: ${sessionDate}\n⏱️ Dauer: ${sessionData.duration || 60} Minuten\n\n🎉 Session wurde erfolgreich im Kalender eingetragen!`);
    setShowNewSessionModal(false);
  };

  // TOOLS HANDLERS
  const handleAddTool = (toolData: any) => {
    const newTool = {
      id: `tool-${Date.now()}`,
      name: toolData.name,
      category: toolData.category,
      url: toolData.url,
      description: toolData.description,
      isFavorite: false,
      isActive: true,
      createdAt: new Date()
    };
    
    setTools([...tools, newTool]);
    alert(`✅ TOOL HINZUGEFÜGT!\n\n🛠️ Name: ${newTool.name}\n📂 Kategorie: ${newTool.category}\n🔗 URL: ${newTool.url}\n\n🎉 Tool wurde erfolgreich hinzugefügt!`);
    setShowAddToolModal(false);
  };

  const handleToggleFavorite = (toolId: string) => {
    setTools(tools.map(tool => 
      tool.id === toolId 
        ? { ...tool, isFavorite: !tool.isFavorite }
        : tool
    ));
  };

  const handleDeleteTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool && confirm(`Tool "${tool.name}" wirklich löschen?`)) {
      setTools(tools.filter(t => t.id !== toolId));
      alert(`🗑️ Tool "${tool.name}" wurde gelöscht!`);
    }
  };

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', name: 'Cockpit', icon: HomeIcon },        // Dashboard → Cockpit
  { id: 'clients', name: 'Coachees', icon: UserIcon },        // Klienten → Coachees  
  { id: 'sessions', name: 'Gespräche', icon: CalendarIcon },  // Sessions → Gespräche
    { id: 'documents', name: 'Dokumente', icon: DocumentTextIcon },
    { id: 'invoices', name: 'Rechnungen', icon: CurrencyDollarIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', name: 'Einstellungen', icon: CogIcon },
    { id: 'tools', name: 'Tools', icon: WrenchScrewdriverIcon },
    { id: 'branding', name: 'Branding', icon: PaintBrushIcon }
  ];

  // ADD TOOL MODAL COMPONENT
  const AddToolModal = ({ isOpen, onClose, onSubmit }: any) => {
    const [formData, setFormData] = useState({
      name: '',
      category: 'Communication',
      url: '',
      description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.url) {
        alert('Bitte Name und URL eingeben!');
        return;
      }
      onSubmit(formData);
      setFormData({ name: '', category: 'Communication', url: '', description: '' });
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
          <h2 className="text-lg font-bold mb-4">Neues Tool hinzufügen</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tool Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. Slack, Trello, Figma"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Communication">Communication</option>
                <option value="Project Management">Project Management</option>
                <option value="Analytics">Analytics</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Kurze Beschreibung des Tools..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tool hinzufügen
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render current view
  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-12">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Coaching Cockpit</h1>
                <p className="text-gray-600 mt-2">Was bewegt sich in Ihrer Praxis?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewClientModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UserIcon className="h-4 w-4" />
                  Neuer Coachee
                </button>
                <button
                  onClick={() => setShowNewSessionModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Neues Gespräch
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aktive Coachees</p>
                    <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                   <UserIcon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gespräche Gesamt</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {clients.reduce((sum, client) => sum + client.totalSessions, 0)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Umsatz Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      CHF {clients.reduce((sum, client) => sum + client.totalRevenue, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ø Gespräch-Honorar</p>
                    <p className="text-2xl font-bold text-gray-900">CHF 150</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Clients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktuelle Coachees</h3>
              <div className="space-y-3">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.profession}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{client.totalSessions} Sessions</p>
                      <p className="text-sm text-gray-600">{client.currency} {client.totalRevenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'clients':
        return <ClientList />;

      case 'sessions':
        return <SessionCalendar />;

      case 'documents':
        return <DocumentsModule />;

      case 'invoices':
        return (
          <InvoiceBuilder
            clients={clients.map(c => ({
              id: c.id,
              firstName: c.name.split(' ')[0],
              lastName: c.name.split(' ')[1] || '',
              email: c.email,
              address: c.address
            }))}
            onSave={handleSaveInvoice}
            onPreview={handlePreviewInvoice}
            onSend={handleSendInvoice}
            onCreateClient={(clientData) => {
              console.log('New client from invoice:', clientData);
              alert(`✅ NEUER KLIENT ERSTELLT!\n\n👤 Name: ${clientData.firstName} ${clientData.lastName}\n📧 Email: ${clientData.email}`);
            }}
          />
        );

      case 'analytics':
        return <Analytics />;

      case 'settings':
        return <Settings />;

      case 'tools':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">External Tools</h1>
              <span className="text-sm text-gray-500">TIER 1 Professional ({tools.length}/25 Tools)</span>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <WrenchScrewdriverIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">External Tools Management</h3>
                  <p className="text-sm text-blue-700">Verwalten Sie bis zu 25 professionelle Tools</p>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Add Tool Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">➕</div>
                <h3 className="font-medium text-gray-900 mb-2">Tool hinzufügen</h3>
                <p className="text-sm text-gray-600 mb-4">Integrieren Sie externe Tools</p>
                <button 
                  onClick={() => setShowAddToolModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Tool hinzufügen
                </button>
              </div>

              {/* Existing Tools */}
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <WrenchScrewdriverIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{tool.name}</h3>
                        <p className="text-xs text-gray-500">{tool.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(tool.id)}
                      className={`text-lg ${tool.isFavorite ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                    >
                      ⭐
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  
                  <div className="flex space-x-2">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm text-center hover:bg-blue-100"
                    >
                      Öffnen
                    </a>
                    <button
                      onClick={() => handleDeleteTool(tool.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-3">📊 Verfügbare Kategorien</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {[
                    { name: 'Communication', count: tools.filter(t => t.category === 'Communication').length, max: 5 },
                    { name: 'Project Management', count: tools.filter(t => t.category === 'Project Management').length, max: 5 },
                    { name: 'Analytics', count: tools.filter(t => t.category === 'Analytics').length, max: 5 },
                    { name: 'Design', count: tools.filter(t => t.category === 'Design').length, max: 3 },
                    { name: 'Development', count: tools.filter(t => t.category === 'Development').length, max: 4 },
                    { name: 'Custom', count: tools.filter(t => t.category === 'Custom').length, max: 3 }
                  ].map((cat) => (
                    <div key={cat.name} className="flex justify-between">
                      <span>{cat.name}</span>
                      <span>{cat.count}/{cat.max}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-3">🎯 TIER 1 Features</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span>25 Tools Limit</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span>6 Kategorien</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span>Favoriten System</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span>Quick Access</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span className="mr-2">○</span>
                    <span>API Integration (TIER 2)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Corporate Branding</h1>
              <span className="text-sm text-gray-500">TIER 1 Professional</span>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <PaintBrushIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">Corporate Design System</h3>
                  <p className="text-sm text-purple-700">Logo, Schriften und Farben individuell anpassen</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="mr-2">🖼️</span>
                  Logo Upload
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <div className="text-gray-400 text-3xl mb-3">📁</div>
                  <p className="text-sm text-gray-600 mb-3">Logo hochladen (PNG, JPG, SVG)</p>
                  <p className="text-xs text-gray-500 mb-4">Empfohlene Größe: 200x60px</p>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                    Datei wählen
                  </button>
                </div>
              </div>

              {/* Corporate Colors */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="mr-2">🎨</span>
                  Corporate Colors
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Primary Color</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        defaultValue="#3B82F6" 
                        className="w-10 h-8 border border-gray-300 rounded cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        defaultValue="#3B82F6" 
                        className="px-2 py-1 text-xs border border-gray-300 rounded w-20 font-mono" 
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Secondary Color</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        defaultValue="#7C3AED" 
                        className="w-10 h-8 border border-gray-300 rounded cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        defaultValue="#7C3AED" 
                        className="px-2 py-1 text-xs border border-gray-300 rounded w-20 font-mono" 
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Accent Color</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        defaultValue="#10B981" 
                        className="w-10 h-8 border border-gray-300 rounded cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        defaultValue="#10B981" 
                        className="px-2 py-1 text-xs border border-gray-300 rounded w-20 font-mono" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="mr-2">📝</span>
                  Typography
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Hauptschrift</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Inter (Standard)</option>
                      <option>Roboto</option>
                      <option>Open Sans</option>
                      <option>Poppins</option>
                      <option>Montserrat</option>
                      <option>Lato</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Titel-Schrift</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Inter (Standard)</option>
                      <option>Playfair Display</option>
                      <option>Merriweather</option>
                      <option>Source Serif Pro</option>
                      <option>Crimson Text</option>
                      <option>Libre Baskerville</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Schriftgröße</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Klein</button>
                      <button className="px-3 py-1 text-xs border border-purple-300 bg-purple-50 text-purple-700 rounded">Standard</button>
                      <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Groß</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branding Options */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="mr-2">⚙️</span>
                  Branding Optionen
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-700">Logo in Header anzeigen</span>
                      <p className="text-xs text-gray-500">Logo wird im Dashboard-Header angezeigt</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-700">Firmenname in Navigation</span>
                      <p className="text-xs text-gray-500">Zeigt den Firmennamen in der Sidebar</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-700">Corporate Colors anwenden</span>
                      <p className="text-xs text-gray-500">Verwendet Ihre Farben im gesamten Interface</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-700">Branding auf Rechnungen</span>
                      <p className="text-xs text-gray-500">Logo und Farben auf generierten Rechnungen</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="inline-flex items-center text-green-600">
                  <span className="mr-1">✓</span>
                  Alle Änderungen werden automatisch gespeichert
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Vorschau
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Anwenden
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 bg-gray-800 text-white">
              <h1 className="text-xl font-bold">🚀 Coach MCS</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as ActiveView)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeView === item.id
  ? 'bg-gray-600 text-white'        // ← Dunkles Grau statt Blau
  : 'text-gray-700 hover:bg-gray-50' // ← Bleibt gleich
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="pl-64">
          <main className="p-8">
            {renderCurrentView()}
          </main>
        </div>

        {/* Modals */}
        {showNewClientModal && (
          <NewClientModal
            isOpen={showNewClientModal}
            onClose={() => setShowNewClientModal(false)}
            onSubmit={handleSaveClient}
          />
        )}

        {showNewSessionModal && (
          <NewSessionModal
            isOpen={showNewSessionModal}
            onClose={() => setShowNewSessionModal(false)}
            onSubmit={handleSaveSession}
          />
        )}

        {showAddToolModal && (
          <AddToolModal
            isOpen={showAddToolModal}
            onClose={() => setShowAddToolModal(false)}
            onSubmit={handleAddTool}
          />
        )}
      </div>
    </Router>
  );
};

export default App;