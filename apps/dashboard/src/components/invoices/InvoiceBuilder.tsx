// components/invoices/InvoiceBuilder.tsx
// 🧾 COMPLETE INVOICE BUILDER COMPONENT
// Coach Platform Universal Dashboard

import React, { useState, useEffect, useMemo } from 'react';
import { 
  DocumentTextIcon, 
  UserIcon, 
  CalendarIcon,
  CurrencyEuroIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  PaperAirplaneIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

// Import our types
import { 
  Invoice, 
  InvoiceItem, 
  Client, 
  InvoiceFormData, 
  InvoiceCalculation,
  SessionType,
  ItemCategory 
} from '../../types/invoice';

// ==========================================
// MAIN INVOICE BUILDER COMPONENT
// ==========================================

interface InvoiceBuilderProps {
  onSave: (invoice: Partial<Invoice>) => void;
  onPreview: (invoice: Partial<Invoice>) => void;
  onSend: (invoice: Partial<Invoice>) => void;
  existingInvoice?: Invoice;
  clients: Client[];
  onCreateClient: (client: Partial<Client>) => void;
}

export const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({
  onSave,
  onPreview,
  onSend,
  existingInvoice,
  clients,
  onCreateClient
}) => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientId: existingInvoice?.clientId || '',
    date: existingInvoice?.date ? new Date(existingInvoice.date).toISOString().split('T')[0] : 
          new Date().toISOString().split('T')[0],
    dueDate: existingInvoice?.dueDate ? new Date(existingInvoice.dueDate).toISOString().split('T')[0] : 
             new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    paymentTerms: existingInvoice?.paymentTerms || 'Net 30',
    items: existingInvoice?.items || [{
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      taxable: true,
      category: 'coaching' as ItemCategory
    }],
    taxRate: existingInvoice?.taxRate || 19, // Default German VAT
    currency: existingInvoice?.currency || 'EUR',
    notes: existingInvoice?.notes || '',
    terms: existingInvoice?.terms || 'Zahlung innerhalb von 30 Tagen nach Rechnungsdatum.'
  });

  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<'client' | 'items' | 'review'>('client');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ==========================================
  // CALCULATIONS
  // ==========================================
  
  const calculations = useMemo((): InvoiceCalculation => {
    const itemsSubtotal = formData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const taxableAmount = formData.items
      .filter(item => item.taxable)
      .reduce((sum, item) => sum + (item.amount || 0), 0);
    const nonTaxableAmount = itemsSubtotal - taxableAmount;
    const taxAmount = (taxableAmount * formData.taxRate) / 100;
    const total = itemsSubtotal + taxAmount;

    return {
      subtotal: itemsSubtotal,
      taxAmount,
      total,
      itemsSubtotal,
      taxableAmount,
      nonTaxableAmount,
      taxBreakdown: [{
        rate: formData.taxRate,
        taxableAmount,
        taxAmount
      }]
    };
  }, [formData.items, formData.taxRate]);

  // ==========================================
  // FORM HANDLERS
  // ==========================================

  const updateFormData = (updates: Partial<InvoiceFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addItem = () => {
    const newItem: Partial<InvoiceItem> = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      taxable: true,
      category: 'coaching'
    };
    updateFormData({ items: [...formData.items, newItem] });
  };

  const updateItem = (index: number, updates: Partial<InvoiceItem>) => {
    const updatedItems = [...formData.items];
    const item = { ...updatedItems[index], ...updates };
    
    // Auto-calculate amount
    if ('quantity' in updates || 'rate' in updates) {
      item.amount = (item.quantity || 0) * (item.rate || 0);
    }
    
    updatedItems[index] = item;
    updateFormData({ items: updatedItems });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      updateFormData({ items: updatedItems });
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientId) {
      newErrors.client = 'Bitte wählen Sie einen Kunden aus';
    }

    if (!formData.date) {
      newErrors.date = 'Rechnungsdatum ist erforderlich';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Fälligkeitsdatum ist erforderlich';
    }

    if (formData.items.some(item => !item.description || item.quantity! <= 0 || item.rate! <= 0)) {
      newErrors.items = 'Alle Positionen müssen vollständig ausgefüllt sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // ACTION HANDLERS
  // ==========================================

  const handleSave = () => {
    if (!validateForm()) return;

    const selectedClient = clients.find(c => c.id === formData.clientId);
    if (!selectedClient) return;

    const invoice: Partial<Invoice> = {
      clientId: formData.clientId,
      clientName: `${selectedClient.firstName} ${selectedClient.lastName}`,
      clientEmail: selectedClient.email,
      clientAddress: selectedClient.address,
      date: new Date(formData.date),
      dueDate: new Date(formData.dueDate),
      items: formData.items as InvoiceItem[],
      subtotal: calculations.subtotal,
      taxRate: formData.taxRate,
      taxAmount: calculations.taxAmount,
      total: calculations.total,
      currency: formData.currency,
      notes: formData.notes,
      terms: formData.terms,
      paymentTerms: formData.paymentTerms,
      status: 'draft'
    };
    
    onSave(invoice);
  };

  const handlePreview = () => {
  if (!validateForm()) return;
  
  const invoice = {
    // ... existing invoice object from handleSave
    clientId: formData.clientId,
    clientEmail: clients.find(c => c.id === formData.clientId)?.email,
    items: formData.items,
    subtotal: calculations.subtotal,
    taxRate: formData.taxRate,
    taxAmount: calculations.taxAmount,
    total: calculations.total,
    currency: formData.currency,
    notes: formData.notes,
    terms: formData.terms,
    paymentTerms: formData.paymentTerms,
    status: 'draft'
  };
  
  onPreview(invoice);
};

const handleSend = () => {
  if (!validateForm()) return;
  
  const invoice = {
    // ... existing invoice object from handleSave
    clientId: formData.clientId,
    clientEmail: clients.find(c => c.id === formData.clientId)?.email,
    items: formData.items,
    subtotal: calculations.subtotal,
    taxRate: formData.taxRate,
    taxAmount: calculations.taxAmount,
    total: calculations.total,
    currency: formData.currency,
    notes: formData.notes,
    terms: formData.terms,
    paymentTerms: formData.paymentTerms,
    status: 'draft'
  };
  
  onSend(invoice);
};

  // ==========================================
  // STEP NAVIGATION
  // ==========================================

  const canProceedToItems = formData.clientId !== '';
  const canProceedToReview = canProceedToItems && formData.items.every(item => 
    item.description && item.quantity! > 0 && item.rate! > 0
  );

  // ==========================================
  // RENDER COMPONENTS
  // ==========================================

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Client Step */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          currentStep === 'client' ? 'bg-blue-100 text-blue-700' : 
          canProceedToItems ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <UserIcon className="w-5 h-5" />
          <span className="font-medium">Kunde</span>
        </div>
        
        <div className="w-8 h-px bg-gray-300"></div>
        
        {/* Items Step */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          currentStep === 'items' ? 'bg-blue-100 text-blue-700' : 
          canProceedToReview ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <DocumentTextIcon className="w-5 h-5" />
          <span className="font-medium">Positionen</span>
        </div>
        
        <div className="w-8 h-px bg-gray-300"></div>
        
        {/* Review Step */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          currentStep === 'review' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <EyeIcon className="w-5 h-5" />
          <span className="font-medium">Überprüfung</span>
        </div>
      </div>
    </div>
  );

  const renderClientStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Kunde auswählen</h3>
      
      {/* Client Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kunde *
        </label>
        <select
          value={formData.clientId}
          onChange={(e) => updateFormData({ clientId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Kunde auswählen...</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.firstName} {client.lastName} ({client.email})
            </option>
          ))}
        </select>
        {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client}</p>}
      </div>

      {/* Quick Add Client */}
      <button
        type="button"
        onClick={() => setShowNewClientForm(!showNewClientForm)}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        + Neuen Kunden hinzufügen
      </button>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rechnungsdatum *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData({ date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fälligkeitsdatum *
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => updateFormData({ dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zahlungsbedingungen
          </label>
          <select
            value={formData.paymentTerms}
            onChange={(e) => updateFormData({ paymentTerms: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Net 7">7 Tage</option>
            <option value="Net 14">14 Tage</option>
            <option value="Net 30">30 Tage</option>
            <option value="Due on receipt">Sofort fällig</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Währung
          </label>
          <select
            value={formData.currency}
            onChange={(e) => updateFormData({ currency: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="CHF">CHF (Fr.)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderItemsStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Rechnungspositionen</h3>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Position hinzufügen</span>
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {formData.items.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Description */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beschreibung *
                </label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(index, { description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="z.B. Coaching Session 60 Min"
                />
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategorie
                </label>
                <select
                  value={item.category || 'coaching'}
                  onChange={(e) => updateItem(index, { category: e.target.value as ItemCategory })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="coaching">Coaching</option>
                  <option value="consultation">Beratung</option>
                  <option value="workshop">Workshop</option>
                  <option value="materials">Materialien</option>
                  <option value="other">Sonstiges</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menge *
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={item.quantity || 1}
                  onChange={(e) => updateItem(index, { quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Rate */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preis *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate || 0}
                  onChange={(e) => updateItem(index, { rate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Amount */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Betrag
                </label>
                <input
                  type="text"
                  value={`${(item.amount || 0).toFixed(2)} ${formData.currency}`}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                />
              </div>

              {/* Actions */}
              <div className="md:col-span-1 flex items-end">
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Tax Checkbox */}
            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                id={`taxable-${index}`}
                checked={item.taxable || false}
                onChange={(e) => updateItem(index, { taxable: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`taxable-${index}`} className="ml-2 text-sm text-gray-700">
                Steuerpflichtig ({formData.taxRate}% MwSt.)
              </label>
            </div>
          </div>
        ))}
      </div>

      {errors.items && <p className="text-sm text-red-600">{errors.items}</p>}

      {/* Tax Rate Setting */}
      <div className="border-t pt-4">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Steuersatz (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formData.taxRate}
            onChange={(e) => updateFormData({ taxRate: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => {
    const selectedClient = clients.find(c => c.id === formData.clientId);
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Rechnung überprüfen</h3>
        
        {/* Client Info */}
        {selectedClient && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Kunde</h4>
            <p className="text-gray-700">
              {selectedClient.firstName} {selectedClient.lastName}<br/>
              {selectedClient.email}<br/>
              {selectedClient.address.street}<br/>
              {selectedClient.address.postalCode} {selectedClient.address.city}
            </p>
          </div>
        )}

        {/* Invoice Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900">Rechnungsdetails</h4>
            <div className="text-sm text-gray-600">
              Datum: {new Date(formData.date).toLocaleDateString('de-DE')} | 
              Fällig: {new Date(formData.dueDate).toLocaleDateString('de-DE')}
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2 mb-6">
            {formData.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {item.rate?.toFixed(2)} {formData.currency}
                    {item.taxable && ` (inkl. ${formData.taxRate}% MwSt.)`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {item.amount?.toFixed(2)} {formData.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Zwischensumme:</span>
              <span>{calculations.subtotal.toFixed(2)} {formData.currency}</span>
            </div>
            {calculations.taxAmount > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>MwSt. ({formData.taxRate}%):</span>
                <span>{calculations.taxAmount.toFixed(2)} {formData.currency}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-2">
              <span>Gesamtbetrag:</span>
              <span>{calculations.total.toFixed(2)} {formData.currency}</span>
            </div>
          </div>
        </div>

        {/* Notes & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notizen
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => updateFormData({ notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Zusätzliche Informationen für den Kunden..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geschäftsbedingungen
            </label>
            <textarea
              value={formData.terms}
              onChange={(e) => updateFormData({ terms: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {existingInvoice ? 'Rechnung bearbeiten' : 'Neue Rechnung erstellen'}
        </h1>
        <p className="text-gray-600">
          Erstellen Sie professionelle Rechnungen für Ihre Coaching-Services
        </p>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {currentStep === 'client' && renderClientStep()}
        {currentStep === 'items' && renderItemsStep()}
        {currentStep === 'review' && renderReviewStep()}
      </div>

      {/* Navigation & Actions */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex space-x-4">
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
              type="button"
              onClick={() => {
                if (currentStep === 'client' && canProceedToItems) setCurrentStep('items');
                if (currentStep === 'items' && canProceedToReview) setCurrentStep('review');
              }}
              disabled={
                (currentStep === 'client' && !canProceedToItems) ||
                (currentStep === 'items' && !canProceedToReview)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          )}
        </div>
      </div>

      {/* Calculation Summary (Always Visible) */}
      {formData.items.some(item => item.amount && item.amount > 0) && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-700">Zwischensumme:</span>
            <span className="font-medium text-blue-900">
              {calculations.subtotal.toFixed(2)} {formData.currency}
            </span>
          </div>
          {calculations.taxAmount > 0 && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-blue-700">MwSt. ({formData.taxRate}%):</span>
              <span className="font-medium text-blue-900">
                {calculations.taxAmount.toFixed(2)} {formData.currency}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-lg font-bold text-blue-900 border-t border-blue-200 pt-2 mt-2">
            <span>Gesamtbetrag:</span>
            <span>{calculations.total.toFixed(2)} {formData.currency}</span>
          </div>
        </div>
      )}
    </div>
  );
};export default InvoiceBuilder;
