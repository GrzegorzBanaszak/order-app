export {};

declare global {
  interface User {
    email: string;
    password: string;
  }
  interface Order {
    id: string;
    phoneNumber: number;
    customer: Customer;
    orderData: Date;
    commoditys: Commodity[];
    status: string;
    supplayer: Supplier;
    advance: number;
  }

  interface Customer {
    id: string;
    name: string;
    company: Company;
    phoneNumber: number;
  }

  interface Company {
    id: string;
    name: string;
    nip: string;
  }

  interface Supplier {
    id: string;
    name: string;
    price: number;
  }

  interface Commodity {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
  }
}
