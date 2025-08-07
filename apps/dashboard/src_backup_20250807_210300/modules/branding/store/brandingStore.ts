import { create } from 'zustand';
import { BrandingSettings } from '../types/branding.types';

interface BrandingState {
  settings: BrandingSettings;
  isLoading: boolean;
  
  // Actions
  updateLogo: (logo: Partial<BrandingSettings['logo']>) => void;
  updateCompanyInfo: (info: Partial<BrandingSettings['companyInfo']>) => void;
  updateTypography: (typography: Partial<BrandingSettings['typography']>) => void;
  updateColorScheme: (colors: Partial<BrandingSettings['colorScheme']>) => void;
  updateInvoiceSettings: (settings: Partial<BrandingSettings['invoiceSettings']>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: BrandingSettings = {
  logo: {
    file: null,
    url: null,
    position: 'left',
    size: 'medium',
    maxWidth: 200,
    maxHeight: 80
  },
  companyInfo: {
    name: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Deutschland'
    },
    phone: '',
    email: '',
    website: '',
    taxId: '',
    vatId: '',
    registrationNumber: ''
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 'medium',
    headerFontFamily: 'Inter',
    bodyFontFamily: 'Inter'
  },
  colorScheme: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981'
  },
  invoiceSettings: {
    showLogo: true,
    logoPosition: 'left',
    headerColor: '#1F2937',
    accentColor: '#3B82F6'
  }
};

export const useBrandingStore = create<BrandingState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoading: false,

  updateLogo: (logo) => {
    set((state) => ({
      settings: {
        ...state.settings,
        logo: { ...state.settings.logo, ...logo }
      }
    }));
  },

  updateCompanyInfo: (info) => {
    set((state) => ({
      settings: {
        ...state.settings,
        companyInfo: { ...state.settings.companyInfo, ...info }
      }
    }));
  },

  updateTypography: (typography) => {
    set((state) => ({
      settings: {
        ...state.settings,
        typography: { ...state.settings.typography, ...typography }
      }
    }));
  },

  updateColorScheme: (colors) => {
    set((state) => ({
      settings: {
        ...state.settings,
        colorScheme: { ...state.settings.colorScheme, ...colors }
      }
    }));
  },

  updateInvoiceSettings: (invoiceSettings) => {
    set((state) => ({
      settings: {
        ...state.settings,
        invoiceSettings: { ...state.settings.invoiceSettings, ...invoiceSettings }
      }
    }));
  },

  resetToDefaults: () => {
    set({ settings: DEFAULT_SETTINGS });
  }
}));
