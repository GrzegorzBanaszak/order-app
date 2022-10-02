import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  ICompanyDetail,
  ICompanyInfo,
  ICustomerPost,
} from "@/types";
import { Module } from "vuex";

export interface ICompaniesState {
  companies: ICompanyInfo[];
  companyDetail: ICompanyDetail | null;
  isError: boolean;
}

export const companiesState: Module<ICompaniesState, State> = {
  state: {
    companies: [],
    companyDetail: null,
    isError: false,
  },
  getters: {
    getFiltredCompanies: (state) => (search: string) => {
      const lowerCaseSearch = search.toLowerCase();
      return state.companies.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSearch)
      );
    },
  },
  mutations: {
    setCompanies(state, payload: ICompanyInfo[]) {
      state.companies = payload;
    },
    setCompanyDetail(state, payload: ICompanyDetail) {
      state.companyDetail = payload;
    },
    toggleCompanyError(state) {
      state.isError = !state.isError;
    },
  },
  actions: {
    async getCompanies(context) {
      const res = await axios("http://localhost:5000/company");
      context.commit("setCompanies", res.data);
    },
    async getCompanyDetail(context, payload: string) {
      try {
        const res = await axios("http://localhost:5000/company/" + payload);
        context.commit("setCompanyDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
    async addCompany(context, payload: ICustomerPost) {
      try {
        const res = await axios.post(
          "http://localhost:5000/company/add",
          payload
        );
        context.commit("displaySuccessPopup", [
          `Udało sie dodać firmę ${res.data.name}`,
        ]);
        setTimeout(() => {
          context.commit("popupReset");
        }, 5000);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCompanyError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
  },
};
