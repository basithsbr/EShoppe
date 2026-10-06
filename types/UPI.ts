export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface PaymentCheckResponse {
  status: PaymentStatus;
  orderId: string;
}

export interface UpiParams {
  pa: string; // Merchant VPA
  pn: string; // Merchant Name
  tr: string; // Transaction Ref / Order ID
  am: string; // Amount
  cu: string; // Currency
  tn?: string; // Transaction Note
}
