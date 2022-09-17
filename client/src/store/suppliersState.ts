import axios from "axios";
import { State } from "./index";
import { ISupplierInfo } from "@/types";
import { Module } from "vuex";

export interface ISuppliersState {
  suppliers: ISupplierInfo[];
}

export const suppliersState: Module<ISuppliersState, State> = {
  state: {
    suppliers: [],
  },
  getters: {},
  mutations: {
    getSuppliers(state, payload: ISupplierInfo[]) {
      state.suppliers = payload;
    },
  },
  actions: {
    async getSuppliers(context) {
      const res = await axios("http://localhost:5000/supplier");
      context.commit("getSuppliers", res.data);
    },
  },
};
