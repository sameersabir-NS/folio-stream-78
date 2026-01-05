export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface Folio {
  id: string;
  number: string;
  name: string;
  hasRecentCharges: boolean;
  hasRecentPayments: boolean;
  charges: Transaction[];
  payments: Transaction[];
}
