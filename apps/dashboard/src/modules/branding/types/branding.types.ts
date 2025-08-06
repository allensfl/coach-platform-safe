export interface BrandingSettings {
  logo: {
    file: File | null
    url: string | null
    position: 'left' | 'right'
  }
  companyInfo: {
    name: string
    website?: string
    email?: string
    phone?: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      small: string
      medium: string
      large: string
    }
  }
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  invoiceSettings: {
    logoPosition: 'left' | 'right'
    showCompanyInfo: boolean
    customFooter?: string
  }
}
