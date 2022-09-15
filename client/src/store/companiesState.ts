import axios from "axios";
import { State } from "./index";
import { ICompanyInfo } from "@/types";
import { ActionContext, Module } from "vuex";

export interface ICompaniesState {
  companies: ICompanyInfo[];
}

export const companiesState: Module<ICompaniesState, State> = {
  state: {
    companies: [],
  },
  getters: {},
  mutations: {
    setCompanies(state, payload: ICompanyInfo[]) {
      state.companies = payload;
    },
  },
  actions: {
    async getCompanies(context) {
      const res = await axios("http://localhost:5000/company");
      context.commit("setCompanies", res.data);
    },
  },
};
