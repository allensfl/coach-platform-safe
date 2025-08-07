import React from 'react';
import { useBrandingStore } from '../store/brandingStore';

export const BrandingSettings: React.FC = () => {
  const { settings, updateCompanyInfo } = useBrandingStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Branding & Design</h1>
        <p className="text-gray-600">
          Personalisiere das Erscheinungsbild deiner Coach-Platform
        </p>
      </div>

      {/* Basic Company Info Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Firmendaten</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Firmenname
            </label>
            <input
              type="text"
              value={settings.companyInfo.name}
              onChange={(e) => updateCompanyInfo({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ihr Firmenname"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              value={settings.companyInfo.email}
              onChange={(e) => updateCompanyInfo({ email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="contact@ihre-firma.de"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon
            </label>
            <input
              type="tel"
              value={settings.companyInfo.phone}
              onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+41 XX XXX XX XX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={settings.companyInfo.website || ''}
              onChange={(e) => updateCompanyInfo({ website: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://www.ihre-website.de"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => alert('Branding-Einstellungen gespeichert! 🎨')}
          >
            Einstellungen speichern
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Vorschau</h2>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {settings.companyInfo.name ? settings.companyInfo.name[0] : 'L'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900">
              {settings.companyInfo.name || 'Ihr Firmenname'}
            </h3>
            
            <div className="mt-2 text-gray-600 space-y-1">
              <p>{settings.companyInfo.email || 'contact@ihre-firma.de'}</p>
              <p>{settings.companyInfo.phone || '+41 XX XXX XX XX'}</p>
              {settings.companyInfo.website && (
                <p className="text-blue-600">{settings.companyInfo.website}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;
