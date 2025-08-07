// types/invoice.ts
// 🧾 INVOICE SYSTEM - COMPLETE DATA MODELS
// Coach Platform Universal Dashboard

// ==========================================
// CORE INVOICE INTERFACES
// ==========================================

export interface Invoice {
  // Primary Keys
  id: string;
  invoiceNumber: string;
  
  // Client Information
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
  // Coach/Business Information
  coachInfo: {
    name: string;
    businessName?: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    taxId?: string;
    vatNumber?: string;
    bankDetails?: {
      accountHolder: string;
      iban: string;
      bic?: string;
      bankName: string;
    };
  };
  
  // Invoice Dates & Status
  date: Date;
  dueDate: Date;
  status: InvoiceStatus;
  
  // Line Items & Calculations
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number; // Percentage (e.g., 19 for 19%)
  taxAmount: number;
  total: number;
  currency: string; // ISO code (EUR, USD, CHF)
  
  // Additional Information
  notes?: string;
  terms?: string;
  paymentTerms?: string; // e.g., "Net 30", "Upon receipt"
  
  // Payment Tracking
  paymentStatus: PaymentStatus;
  paymentDate?: Date;
  paymentMethod?: string;
  paymentReference?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Coach ID
  
  // File Management
  pdfPath?: string;
  documentId?: string; // Link to DocumentsModule
  
  // Template & Branding
  templateId?: string;
  brandingConfig?: BrandingConfig;
}

// ==========================================
// INVOICE LINE ITEMS
// ==========================================

export interface InvoiceItem {
  id: string;
  description: string;
  
  // Session Connection (Optional)
  sessionId?: string;
  sessionDate?: Date;
  sessionType?: SessionType;
  sessionDuration?: number; // minutes
  
  // Pricing
  quantity: number;
  rate: number; // Price per unit
  amount: number; // quantity × rate
  
  // Tax Handling
  taxable: boolean;
  taxRate?: number; // Item-specific tax rate if different
  
  // Metadata
  category?: ItemCategory;
  notes?: string;
}

// ==========================================
// ENUMS & STATUS TYPES
// ==========================================

export type InvoiceStatus = 
  | 'draft'      // Being created
  | 'review'     // Ready for review
  | 'sent'       // Sent to client
  | 'viewed'     // Client has viewed
  | 'paid'       // Payment received
  | 'overdue'    // Past due date
  | 'cancelled'  // Cancelled
  | 'refunded';  // Payment refunded

export type PaymentStatus = 
  | 'pending'    // Awaiting payment
  | 'partial'    // Partially paid
  | 'paid'       // Fully paid
  | 'failed'     // Payment failed
  | 'refunded';  // Refunded

export type SessionType = 
  | 'individual'     // 1:1 coaching
  | 'group'          // Group session
  | 'workshop'       // Workshop/seminar
  | 'consultation'   // Initial consultation
  | 'followup'       // Follow-up session
  | 'package'        // Multi-session package
  | 'other';

export type ItemCategory = 
  | 'coaching'       // Coaching sessions
  | 'consultation'   // Consultations
  | 'workshop'       // Workshops
  | 'materials'      // Course materials
  | 'travel'         // Travel expenses
  | 'other';

// ==========================================
// CLIENT DATA MODEL
// ==========================================

export interface Client {
  id: string;
  
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  
  // Address
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
  // Business Info (for B2B clients)
  isBusinessClient: boolean;
  businessName?: string;
  vatNumber?: string;
  
  // Coaching Relationship
  startDate: Date;
  status: ClientStatus;
  coachingPackage?: string;
  preferredSessionType?: SessionType;
  
  // Financial Info
  defaultRate?: number;
  currency: string;
  paymentTerms?: string;
  
  // Session History
  totalSessions: number;
  lastSessionDate?: Date;
  totalRevenue: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  tags?: string[];
}

export type ClientStatus = 
  | 'active'      // Currently coaching
  | 'inactive'    // Paused/break
  | 'completed'   // Coaching completed
  | 'prospect';   // Potential client

// ==========================================
// BRANDING & TEMPLATES
// ==========================================

export interface BrandingConfig {
  // Logo & Colors
  logoPath?: string;
  primaryColor: string;   // Hex color
  secondaryColor: string; // Hex color
  
  // Typography
  fontFamily?: string;
  fontSize?: {
    header: number;
    body: number;
    small: number;
  };
  
  // Layout
  headerHeight?: number;
  footerHeight?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  description?: string;
  
  // Default Values
  defaultTerms: string;
  defaultPaymentTerms: string;
  defaultTaxRate: number;
  
  // Branding
  brandingConfig: BrandingConfig;
  
  // Layout Configuration
  showLogo: boolean;
  showBankDetails: boolean;
  showNotes: boolean;
  showPaymentTerms: boolean;
  
  // Metadata
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// CALCULATION HELPERS
// ==========================================

export interface InvoiceCalculation {
  subtotal: number;
  taxAmount: number;
  total: number;
  
  // Detailed breakdown
  itemsSubtotal: number;
  taxableAmount: number;
  nonTaxableAmount: number;
  
  // By tax rate (for mixed tax rates)
  taxBreakdown: {
    rate: number;
    taxableAmount: number;
    taxAmount: number;
  }[];
}

// ==========================================
// PAYMENT & INTEGRATION
// ==========================================

export interface PaymentInfo {
  paymentId?: string;
  paymentProvider?: 'stripe' | 'paypal' | 'bank' | 'cash' | 'other';
  paymentUrl?: string; // For online payments
  
  // Payment Details
  amountPaid: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionId?: string;
  
  // Fees
  processingFee?: number;
  netAmount?: number;
  
  // Notes
  paymentNotes?: string;
}

// ==========================================
// FORM & VALIDATION TYPES
// ==========================================

export interface InvoiceFormData {
  // Client Selection
  clientId: string;
  newClient?: Partial<Client>;
  
  // Invoice Details
  date: string; // ISO date string for forms
  dueDate: string;
  paymentTerms: string;
  
  // Items
  items: Partial<InvoiceItem>[];
  
  // Settings
  taxRate: number;
  currency: string;
  templateId?: string;
  
  // Additional
  notes?: string;
  terms?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// ==========================================
// EXPORT TYPES FOR API
// ==========================================

export interface CreateInvoiceRequest {
  invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt' | 'updatedAt'>;
}

export interface UpdateInvoiceRequest {
  id: string;
  updates: Partial<Invoice>;
}

export interface InvoiceFilters {
  status?: InvoiceStatus[];
  paymentStatus?: PaymentStatus[];
  clientId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  amountMin?: number;
  amountMax?: number;
  searchQuery?: string;
}

export interface InvoiceListResponse {
  invoices: Invoice[];
  totalCount: number;
  totalAmount: number;
  totalPaid: number;
  totalOutstanding: number;
}