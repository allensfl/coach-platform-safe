export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  topics: string[];
  startDate: Date;
  status: 'active' | 'inactive';
  totalSessions: number;
  totalRevenue: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  isBusinessClient: boolean;
  businessName?: string;
}
