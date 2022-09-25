export interface IOrderHistoryInfo {
  id: string;
  orderNumber: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  status: string;
}
