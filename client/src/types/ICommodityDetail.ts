export interface ICommodityDetail {
  id: string;
  name: string;
  description: string;
  indexNumber: string;
  suppliers: Array<CommodityDetailSupplier>;
}

export interface CommodityDetailSupplier {
  id: string;
  name: string;
}
