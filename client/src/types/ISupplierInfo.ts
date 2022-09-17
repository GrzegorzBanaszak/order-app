export interface ISupplierInfo {
  id: string;
  name: string;
  price: number;
  numberOfOrders: number;
  lastOrder: Date | null;
}
