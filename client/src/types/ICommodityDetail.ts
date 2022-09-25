export interface ICommodityDetail {
  id: string;
  name: string;
  description: string;
  suppliers: Array<CommodityDetailSupplier>;
}

export interface CommodityDetailSupplier {
  id: string;
  name: string;
}
