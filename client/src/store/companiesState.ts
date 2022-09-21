import axios from "axios";
import { State } from "./index";
import { ICompanyDetail, ICompanyInfo } from "@/types";
import { Module } from "vuex";

export interface ICompaniesState {
  companies: ICompanyInfo[];
  companyDetail: ICompanyDetail | null;
}

export const companiesState: Module<ICompaniesState, State> = {
  state: {
    companies: [],
    companyDetail: null,
  },
  getters: {},
  mutations: {
    setCompanies(state, payload: ICompanyInfo[]) {
      state.companies = payload;
    },
    setCompanyDetail(state, payload: ICompanyDetail) {
      state.companyDetail = payload;
    },
  },
  actions: {
    async getCompanies(context) {
      const res = await axios("http://localhost:5000/company");
      context.commit("setCompanies", res.data);
    },
    async getCompanyDetail(contact, payload: string) {
      try {
        const res = await axios("http://localhost:5000/company/" + payload);
        contact.commit("setCompanyDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
  },
};
