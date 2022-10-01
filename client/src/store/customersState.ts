import { State } from "./index";
import { ICustomerDetail, ICustomerInfo, ICustomerPost } from "@/types";
import axios, { AxiosError } from "axios";
import { Module } from "vuex";

export interface ICustomersState {
  customers: ICustomerInfo[];
  customerDetail: ICustomerDetail | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorsMessages: Array<string>;
}

export const customersState: Module<ICustomersState, State> = {
  state: {
    customers: [],
    customerDetail: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorsMessages: [],
  } as ICustomersState,
  getters: {},
  mutations: {
    setCustomers(state: ICustomersState, payload: ICustomerInfo[]) {
      state.customers = payload;
    },
    setCustomerDetail(state: ICustomersState, payload: ICustomerDetail) {
      state.customerDetail = payload;
    },
    setCustomerError(state: ICustomersState, payload: Array<string>) {
      state.isError = true;
      state.errorsMessages = payload;
    },
  },
  actions: {
    async getCustomers(context) {
      const res = await axios("http://localhost:5000/customer");
      context.commit("setCustomers", res.data);
    },

    async getCustomerDetail(contact, payload: string) {
      try {
        const res = await axios("http://localhost:5000/customer/" + payload);
        contact.commit("setCustomerDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
    async addCustomer(contect, payload: ICustomerPost) {
      try {
        const res = await axios.post(
          "http://localhost:5000/customer/add",
          payload
        );
      } catch (error) {
        const err = error as AxiosError<any>;
        console.log();
        this.commit("setCustomerError", err.response?.data.message);
      }
    },
  },
};
