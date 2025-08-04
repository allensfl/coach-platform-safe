// App.tsx - COMPLETE INVOICE-READY VERSION
// 🚀 Coach Platform Universal Dashboard with Invoice System

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentTextIcon, HomeIcon, FolderIcon, UserIcon, CalendarIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

// Existing Components
// import DocumentsModule from './components/DocumentsModule'; // Temporarily disabled

// New Invoice Components
import { InvoiceBuilder } from './components/invoices';

// Dashboard Layout Component
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-blue-600 text-white">
            <h1 className="text-xl font-bold">Coach Platform</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <a
              href="/"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            
            <a
              href="/clients"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <UserIcon className="w-5 h-5" />
              <span>Kunden</span>
            </a>
            
            <a
              href="/sessions"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <CalendarIcon className="w-5 h-5" />
              <span>Sessions</span>
            </a>
            
            <a
              href="/documents"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <FolderIcon className="w-5 h-5" />
              <span>Dokumente</span>
            </a>
            
            <a
              href="/invoices"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <DocumentTextIcon className="w-5 h-5" />
              <span>Rechnungen</span>
            </a>
            
            <a
              href="/analytics"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <ChartBarIcon className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            
            <a
              href="/settings"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <CogIcon className="w-5 h-5" />
              <span>Einstellungen</span>
            </a>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

// Mock Data (später durch echte API ersetzen)
const mockClients = [
  {
    id: '1',
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    phone: '+49 123 456789',
    address: {
      street: 'Musterstraße 1',
      city: 'München',
      postalCode: '80331',
      country: 'Deutschland'
    },
    isBusinessClient: false,
    startDate: new Date('2024-01-15'),
    status: 'active' as const,
    totalSessions: 12,
    totalRevenue: 1200,
    currency: 'EUR',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'Anna',
    lastName: 'Schmidt',
    email: 'anna@example.com',
    phone: '+49 987 654321',
    address: {
      street: 'Testweg 5',
      city: 'Berlin',
      postalCode: '10115',
      country: 'Deutschland'
    },
    isBusinessClient: true,
    businessName: 'Schmidt Consulting GmbH',
    startDate: new Date('2024-02-01'),
    status: 'active' as const,
    totalSessions: 8,
    totalRevenue: 2400,
    currency: 'EUR',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Main App Component
function App() {
  // Mock Handler Functions (später durch echte API-Calls ersetzen)
  const handleSaveInvoice = (invoice: any) => {
    console.log('Saving invoice:', invoice);
    // TODO: Implement API call to save invoice
    alert('Rechnung gespeichert! (Demo)');
  };

  const handlePreviewInvoice = (invoice: any) => {
    console.log('Previewing invoice:', invoice);
    // TODO: Generate and show PDF preview
    alert('PDF Vorschau wird geöffnet... (Demo)');
  };

  const handleSendInvoice = (invoice: any) => {
    console.log('Sending invoice:', invoice);
    // TODO: Generate PDF and send via email
    alert('Rechnung wird versendet... (Demo)');
  };

  const handleCreateClient = (client: any) => {
    console.log('Creating client:', client);
    // TODO: Implement API call to create client
    alert('Neuer Kunde erstellt! (Demo)');
  };

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          {/* Dashboard Home */}
          <Route path="/" element={
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Willkommen im Coach Dashboard
              </h2>
              <p className="text-gray-600 mb-8">
                Verwalten Sie Ihre Dokumente und erstellen Sie professionelle Rechnungen
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/documents"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Dokumente verwalten
                </a>
                <a
                  href="/invoices"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Neue Rechnung erstellen
                </a>
              </div>
            </div>
          } />
          
          {/* Placeholder Routes für bestehende Features */}
          <Route path="/clients" element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kunden</h2>
              <p className="text-gray-600">Kunden-Management wird hier integriert...</p>
            </div>
          } />
          
          <Route path="/sessions" element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sessions</h2>
              <p className="text-gray-600">Session-Management wird hier integriert...</p>
            </div>
          } />
          
          <Route path="/analytics" element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
              <p className="text-gray-600">Analytics Dashboard wird hier integriert...</p>
            </div>
          } />
          
          <Route path="/settings" element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Einstellungen</h2>
              <p className="text-gray-600">Einstellungen werden hier integriert...</p>
            </div>
          } />

          {/* Documents Module - Temporarily disabled until export is fixed */}
          <Route path="/documents" element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dokumente</h2>
              <p className="text-gray-600">DocumentsModule wird geladen...</p>
            </div>
          } />
          
          {/* Invoice Routes */}
          <Route path="/invoices" element={
            <InvoiceBuilder
              onSave={handleSaveInvoice}
              onPreview={handlePreviewInvoice}
              onSend={handleSendInvoice}
              clients={mockClients}
              onCreateClient={handleCreateClient}
            />
          } />
          
          <Route path="/invoices/new" element={
            <InvoiceBuilder
              onSave={handleSaveInvoice}
              onPreview={handlePreviewInvoice}
              onSend={handleSendInvoice}
              clients={mockClients}
              onCreateClient={handleCreateClient}
            />
          } />
          
          <Route path="/invoices/edit/:id" element={
            <InvoiceBuilder
              // existingInvoice={} // TODO: Load by ID from URL params
              onSave={handleSaveInvoice}
              onPreview={handlePreviewInvoice}
              onSend={handleSendInvoice}
              clients={mockClients}
              onCreateClient={handleCreateClient}
            />
          } />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;