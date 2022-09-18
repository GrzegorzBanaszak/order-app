export interface ICustomerDetail {
  id: string;
  name: string;
  description: string;
  suppliers: Array<SupplierForCustomerDetail>;
}

interface SupplierForCustomerDetail {
  id: string;
  name: string;
}
