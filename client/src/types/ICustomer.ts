import { ICompany } from "./";

export interface ICustomer {
  _id: string;
  name: string;
  phoneNumber: number;
  company?: ICompany;
  lastOrder: Date;
}
