import React, { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { Client } from '../types/client.types';
import AddClientModal from './NewClientModal';



const ClientList: React.FC = () => {
  const { clients, deleteClient, searchClients } = useClientStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  
  // NEW: Details Modal State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);

  // Filter und Suche
  const filteredClients = clients.filter(client => {
    const matchesSearch = searchClients(searchTerm).includes(client) || searchTerm === '';
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'active' && client.status === 'active') ||
      (selectedFilter === 'inactive' && client.status === 'inactive');
    
    return matchesSearch && matchesFilter;
  });

  const handleDeleteClient = (clientId: string) => {
    setClientToDelete(clientId);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      deleteClient(clientToDelete);
      setClientToDelete(null);
    }
  };

  // NEW: Handle Client Details - FIXED!
  const handleClientDetails = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  // Mock data for fallback (if store is empty)
  const mockClients = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Müller',
      email: 'sarah@example.com',
      phone: '+41 44 123 45 67',
      address: {
        street: 'Bahnhofstrasse 123',
        city: 'Zürich',
        postalCode: '8001',
        country: 'Schweiz'
      },
      birthDate: new Date('1990-05-15'),
      profession: 'Führungskraft',
      company: 'Tech Solutions AG',
      status: 'active' as const,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      notes: 'Schwerpunkt auf Teamführung und Work-Life-Balance',
      sessions: [],
      documents: []
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Schmidt',
      email: 'michael@example.com',
      phone: '+41 44 987 65 43',
      address: {
        street: 'Limmatstrasse 456',
        city: 'Zürich',
        postalCode: '8005',
        country: 'Schweiz'
      },
      birthDate: new Date('1982-03-20'),
      profession: 'Entrepreneur',
      company: 'Schmidt Consulting AG',
      status: 'active' as const,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      notes: 'Fokus auf Unternehmensstrategie und Delegation',
      sessions: [],
      documents: []
    },
    {
      id: '3',
      firstName: 'Anna',
      lastName: 'Weber',
      email: 'anna@example.com',
      phone: '+41 44 555 12 34',
      address: {
        street: 'Universitätstrasse 789',
        city: 'Zürich',
        postalCode: '8006',
        country: 'Schweiz'
      },
      birthDate: new Date('1986-11-08'),
      profession: 'Ärztin',
      company: 'Universitätsspital Zürich',
      status: 'inactive' as const,
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      notes: 'Burnout-Prävention und Karriereentwicklung',
      sessions: [],
      documents: []
    }
  ];

  // Use store clients or fallback to mock data
  const displayClients = filteredClients.length > 0 ? filteredClients : mockClients.filter(client => {
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'active' && client.status === 'active') ||
      (selectedFilter === 'inactive' && client.status === 'inactive');
    const matchesSearch = searchTerm === '' || 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Klienten</h1>
          <p className="text-gray-600">{displayClients.length} von {clients.length || mockClients.length} Klienten</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Neuer Klient
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Klienten suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="inactive">Inaktiv</option>
        </select>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontakt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {client.firstName?.[0]}{client.lastName?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {client.profession}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.createdAt?.toLocaleDateString('de-DE') || '15.01.2024'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {/* FIXED DETAILS BUTTON */}
                    <button
                      onClick={() => handleClientDetails(client)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayClients.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Klienten gefunden</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Versuchen Sie, Ihre Suchkriterien anzupassen.'
                : 'Fügen Sie Ihren ersten Klienten hinzu, um zu beginnen.'
              }
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ersten Klienten hinzufügen
            </button>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <AddClientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={(clientData) => {
            console.log('New client added:', clientData);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Klient löschen</h3>
            <p className="text-gray-600 mb-6">
              Sind Sie sicher, dass Sie diesen Klienten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: CLIENT DETAILS MODAL - FIXED! */}
      {showClientDetails && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Klient Details</h3>
              <button
                onClick={() => setShowClientDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Persönliche Informationen</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedClient.firstName} {selectedClient.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Geburtsdatum</label>
                      <p className="text-sm text-gray-900">
                        {selectedClient.birthDate?.toLocaleDateString('de-DE') || 'Nicht angegeben'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Beruf</label>
                      <p className="text-sm text-gray-900">{selectedClient.profession}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unternehmen</label>
                      <p className="text-sm text-gray-900">{selectedClient.company || 'Nicht angegeben'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Kontaktinformationen</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedClient.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telefon</label>
                      <p className="text-sm text-gray-900">{selectedClient.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adresse</label>
                      <p className="text-sm text-gray-900">
                        {selectedClient.address?.street}<br />
                        {selectedClient.address?.postalCode} {selectedClient.address?.city}<br />
                        {selectedClient.address?.country}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedClient.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedClient.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedClient.notes && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notizen</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900">{selectedClient.notes}</p>
                  </div>
                </div>
              )}

              {/* Sessions Summary */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Session-Übersicht</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-blue-600">{selectedClient.sessions?.length || 0}</p>
                      <p className="text-sm text-blue-600">Gesamt Sessions</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-blue-600">
                        {selectedClient.createdAt?.toLocaleDateString('de-DE') || '15.01.2024'}
                      </p>
                      <p className="text-sm text-blue-600">Klient seit</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-blue-600">
                        {selectedClient.updatedAt?.toLocaleDateString('de-DE') || '15.01.2024'}
                      </p>
                      <p className="text-sm text-blue-600">Letzte Aktivität</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ENTWICKLUNGSSPUREN - NEU */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">🌱 Entwicklungsspuren</h4>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">Reflexion & Entwicklungsverlauf</p>
                <div className="space-y-2 text-sm">
                  <div>• Erste Session: Vertrauen aufgebaut, Ziele definiert</div>
                  <div>• Session 3: Durchbruch bei Konflikt-Thema</div>
                  <div>• Aktuell: Arbeitet an Work-Life-Balance</div>
                </div>
                <button 
  onClick={() => {
    const newReflection = prompt("Neue Reflexion eingeben:");
    if (newReflection) {
      alert(`✅ REFLEXION HINZUGEFÜGT!\n\n"${newReflection}"\n\nIn der finalen Version wird das in die Datenbank gespeichert.`);
    }
  }}
  className="mt-3 text-sm text-blue-600 hover:text-blue-800"
>
  + Reflexion hinzufügen
</button>
              </div>
            </div>
            </div>

            
          

          
            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowClientDetails(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Schließen
              </button>
              <button
                onClick={() => {
                  // TODO: Navigate to edit client
                  alert('Klient bearbeiten - Feature wird implementiert');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bearbeiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;