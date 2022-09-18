import { State } from "./index";
import { ICustomerDetail, ICustomerInfo } from "@/types";
import axios from "axios";
import { Module } from "vuex";

export interface ICustomersState {
  customers: ICustomerInfo[];
  customerDetail: ICustomerDetail | null;
}

export const customersState: Module<ICustomersState, State> = {
  state: { customers: [], customerDetail: null } as ICustomersState,
  getters: {},
  mutations: {
    setCustomers(state: ICustomersState, payload: ICustomerInfo[]) {
      state.customers = payload;
    },
    setCustomerDetail(state: ICustomersState, payload: ICustomerDetail) {
      state.customerDetail = payload;
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
  },
};
