import { State } from "./index";
import {
  AxiosErrorDataType,
  ICustomerDetail,
  ICustomerInfo,
  ICustomerPost,
} from "@/types";
import axios, { AxiosError } from "axios";
import { Module } from "vuex";

export interface ICustomersState {
  customers: ICustomerInfo[];
  customerDetail: ICustomerDetail | null;
  isError: boolean;
}

export const customersState: Module<ICustomersState, State> = {
  state: {
    customers: [],
    customerDetail: null,
    isError: false,
  },
  getters: {},
  mutations: {
    setCustomers(state: ICustomersState, payload: ICustomerInfo[]) {
      state.customers = payload;
    },
    setCustomerDetail(state: ICustomersState, payload: ICustomerDetail) {
      state.customerDetail = payload;
    },
    toggleCustomerError(state) {
      state.isError = !state.isError;
    },
  },
  actions: {
    async getCustomers(context) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/customer`
      );
      context.commit("setCustomers", res.data);
    },

    async getCustomerDetail(context, payload: string) {
      try {
        const res = await axios(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/customer/${payload}`
        );
        context.commit("setCustomerDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
    async addCustomer(context, payload: ICustomerPost) {
      try {
        const res = await axios.post(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/customer/add`,
          payload
        );
        context.commit("displaySuccessPopup", [
          `Udało sie dodać klienta ${res.data.name}`,
        ]);
        setTimeout(() => {
          context.commit("popupReset");
        }, 5000);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCustomerError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
  },
};
