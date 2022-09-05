import { ICustomer, ISupplier, ICommodity } from "./";

export interface IOrder {
  _id: string;
  customer: ICustomer;
  supplier: ISupplier;
  commodities: ICommodity[];
  status: string;
  createdAt?: Date;
}
