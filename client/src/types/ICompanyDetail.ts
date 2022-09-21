export interface ICompanyDetail {
  id: string;
  name: string;
  workers: Array<Worker>;
  nip: string;
}

export interface Worker {
  id: string;
  name: string;
  phoneNumber: string;
}
