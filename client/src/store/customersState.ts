import { State } from "./index";
import {
  AxiosErrorDataType,
  ICustomerDetail,
  ICustomerEditData,
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
  getters: {
    getFiltredCustomer: (state) => (search: string) => {
      const lowerCaseSearch = search.toLowerCase();
      return state.customers.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSearch)
      );
    },
  },
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
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCustomerError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
    async editCustomer(context, payload: ICustomerEditData) {
      try {
        const res = await axios.put(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/customer/update/${payload.id}`,
          payload.data
        );
        context.commit("displaySuccessPopup", [
          `Udało sie zaktualizować klienta ${res.data.name}`,
        ]);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCustomerError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
    async removeCustomer(context, payload: string) {
      try {
        const res = await axios.delete(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/customer/delete/${payload}`
        );
        context.commit("displaySuccessPopup", [
          `Udało sie usunąc klienta ${res.data.name}`,
        ]);
        context.dispatch("getCustomers");
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const messages = [err.response?.data.message];
        context.commit("displayErrorPopup", messages);
      }
    },
  },
};
