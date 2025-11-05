import { PaymentStatus } from "./paymentStatus.mode";

export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  status: PaymentStatus  // Because API sends enum as string
  createdAt: string;
}
