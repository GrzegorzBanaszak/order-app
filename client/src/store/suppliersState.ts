import axios from "axios";
import { State } from "./index";
import { ISupplierDetail, ISupplierInfo } from "@/types";
import { Module } from "vuex";

export interface ISuppliersState {
  suppliers: ISupplierInfo[];
  supplierDetail: ISupplierDetail | null;
}

export const suppliersState: Module<ISuppliersState, State> = {
  state: {
    suppliers: [],
    supplierDetail: null,
  },
  getters: {},
  mutations: {
    setSuppliers(state, payload: ISupplierInfo[]) {
      state.suppliers = payload;
    },
    setSupplierDetail(state, payload: ISupplierDetail) {
      state.supplierDetail = payload;
    },
  },
  actions: {
    async getSuppliers(context) {
      const res = await axios("http://localhost:5000/supplier");
      context.commit("setSuppliers", res.data);
    },
    async getSupplierDetail(context, payload: string) {
      try {
        const res = await axios("http://localhost:5000/supplier/" + payload);
        context.commit("setSupplierDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
  },
};
