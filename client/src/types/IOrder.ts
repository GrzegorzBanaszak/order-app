export interface IOrder {
  id: string;

  orderNumber: string;

  createdAt: Date;

  status: string;

  quantity: number;

  customer: string;

  advance: number;

  totalPrice: number;
}
