import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  ICompanyDetail,
  ICompanyEditData,
  ICompanyInfo,
  ICustomerPost,
  IPopUpShowPayload,
  PopupTypeEnum,
} from "@/types";
import { Module } from "vuex";
import { PopUpMutations } from "./popupState";

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
    resetCompanyDetail(state) {
      state.companyDetail = null;
    },
  },
  actions: {
    async getCompanies(context) {
      const res = await axios(
        `${process.env.VUE_APP_BACKEND_IP}/company`,
        context.getters.getAuthHeader
      );
      context.commit("setCompanies", res.data);
    },
    async getCompanyDetail(context, payload: string) {
      try {
        const res = await axios(
          `${process.env.VUE_APP_BACKEND_IP}/company/${payload}`,
          context.getters.getAuthHeader
        );
        context.commit("setCompanyDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
    async addCompany(context, payload: ICustomerPost) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_BACKEND_IP}/company/add`,
          payload,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się dodać firmę ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCompanyError");
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async editCompany(context, payload: ICompanyEditData) {
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_BACKEND_IP}/company/update/${payload.id}`,
          payload.data,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się zaktualizować firmę ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCompanyError");

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async removeCompany(context, payload: string) {
      try {
        const res = await axios.delete(
          `${process.env.VUE_APP_BACKEND_IP}/company/delete/${payload}`,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się usunąć firme ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
        context.dispatch("getCompanies");
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
  },
};
