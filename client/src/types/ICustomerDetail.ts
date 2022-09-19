export interface ICustomerDetail {
  id: string;
  name: string;
  phoneNumber: string;
  company: CompanyForCustomerDetail | null;
}

interface CompanyForCustomerDetail {
  id: string;
  name: string;
  nip: string;
}
