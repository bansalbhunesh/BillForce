export interface Invoice {
  id: string;
  vendorName: string;
  vendorId?: string; // e.g. Udyam Number
  date: string;
  amount: number;
  daysOverdue: number;
  status: 'safe' | 'warning' | 'critical';
}

export interface NoticeData {
  buyerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: number;
  udyamNumber: string;
  daysOverdue: number;
  taxDisallowance: number;
  interestAccrued: number;
}
