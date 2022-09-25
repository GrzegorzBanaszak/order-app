import { ICustomer, ISupplier, ICommodity } from "./";

export interface IOrder {
  id: string;

  orderNumber: string;

  createdAt: Date;

  status: string;

  quantity: number;

  customer: string;

  supplier: string;

  totalPrice: number;
}
