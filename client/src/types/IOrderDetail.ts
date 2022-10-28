export interface IOrderDetail {
  id: string;
  orderNumber: string;
  createdAt: Date;
  status: string;
  advance: number;
  customer: IOrderDetailCustomer;
  commodities: Array<IOrderDetailCommodity>;
}

export interface IOrderDetailSupplier {
  id: string;
  name: string;
  price: number;
}

export interface IOrderDetailCustomer {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface IOrderDetailCommodity {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  deliveryPrice: number;
  supplierName: string;
  supplierId: string;
  status: string;
}
