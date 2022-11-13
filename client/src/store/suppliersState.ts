import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  ISupplierDetail,
  ISupplierEditData,
  ISupplierInfo,
  ISupplierPost,
} from "@/types";
import { Module } from "vuex";

export interface ISuppliersState {
  suppliers: ISupplierInfo[];
  supplierDetail: ISupplierDetail | null;
  isError: boolean;
}

export const suppliersState: Module<ISuppliersState, State> = {
  state: {
    suppliers: [],
    supplierDetail: null,
    isError: false,
  },
  getters: {
    getFiltredSupplier: (state) => (search: string) => {
      const lowerCaseSearch = search.toLowerCase();
      return state.suppliers.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSearch)
      );
    },
  },
  mutations: {
    setSuppliers(state, payload: ISupplierInfo[]) {
      state.suppliers = payload;
    },
    setSupplierDetail(state, payload: ISupplierDetail) {
      state.supplierDetail = payload;
    },
    toggleSupplierError(state) {
      state.isError = !state.isError;
    },
    resetSupplierDetail(state) {
      state.supplierDetail = null;
    },
  },
  actions: {
    async getSuppliers(context) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier`,
        context.getters.getAuthHeader
      );
      context.commit("setSuppliers", res.data);
    },
    async getSupplierDetail(context, payload: string) {
      try {
        const res = await axios(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier/${payload}`,
          context.getters.getAuthHeader
        );
        context.commit("setSupplierDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
    async addSupplier(context, payload: ISupplierPost) {
      try {
        const res = await axios.post(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier/add`,
          payload,
          context.getters.getAuthHeader
        );
        context.commit("displaySuccessPopup", [
          `Udało sie dodać dostawcę ${res.data.name}`,
        ]);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleSupplierError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
    async editSupplier(context, payload: ISupplierEditData) {
      try {
        const res = await axios.put(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier/update/${payload.id}`,
          payload.data,
          context.getters.getAuthHeader
        );
        context.commit("displaySuccessPopup", [
          `Udało sie edytować dostawcę ${res.data.name}`,
        ]);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleSupplierError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
    async removeSupplier(context, payload: string) {
      try {
        const res = await axios.delete(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier/delete/${payload}`,
          context.getters.getAuthHeader
        );
        context.commit("displaySuccessPopup", [
          `Udało sie usunąc klienta ${res.data.name}`,
        ]);
        context.dispatch("setSuppliers");
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const messages = [err.response?.data.message];
        context.commit("displayErrorPopup", messages);
      }
    },
  },
};
