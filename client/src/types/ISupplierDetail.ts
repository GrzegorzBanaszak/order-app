export interface ISupplierDetail {
  id: string;
  name: string;
  price: string;
  bestOrderCommodities: Array<BestOrderCommodity>;
}

export interface BestOrderCommodity {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
