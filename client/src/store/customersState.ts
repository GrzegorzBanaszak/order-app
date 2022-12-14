import { State } from "./index";
import {
  AxiosErrorDataType,
  ICustomerDetail,
  ICustomerEditData,
  ICustomerInfo,
  ICustomerPost,
  IPopUpShowPayload,
  PopupTypeEnum,
} from "@/types";
import axios, { AxiosError } from "axios";
import { Module } from "vuex";
import { PopUpMutations } from "./popupState";

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
    resetCustomerDetail(state) {
      state.customerDetail = null;
    },
  },
  actions: {
    async getCustomers(context) {
      const res = await axios(
        `${process.env.VUE_APP_BACKEND_IP}/customer`,
        context.getters.getAuthHeader
      );
      context.commit("setCustomers", res.data);
    },

    async getCustomerDetail(context, payload: string) {
      try {
        const res = await axios(
          `${process.env.VUE_APP_BACKEND_IP}/customer/${payload}`,
          context.getters.getAuthHeader
        );
        context.commit("setCustomerDetail", res.data);
      } catch (error: any) {
        console.log(error.request.status);
      }
    },
    async addCustomer(context, payload: ICustomerPost) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_BACKEND_IP}/customer/add`,
          payload,
          context.getters.getAuthHeader
        );

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomy??lnie",
            messages: [`Uda??o si?? doda?? klienta ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCustomerError");

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "B????d",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async editCustomer(context, payload: ICustomerEditData) {
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_BACKEND_IP}/customer/update/${payload.id}`,
          payload.data,
          context.getters.getAuthHeader
        );

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomy??lnie",
            messages: [`Uda??o si?? zaktualizowa?? klienta ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCustomerError");

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "B????d",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async removeCustomer(context, payload: string) {
      try {
        const res = await axios.delete(
          `${process.env.VUE_APP_BACKEND_IP}/customer/delete/${payload}`,
          context.getters.getAuthHeader
        );

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomy??lnie",
            messages: [`Uda??o si?? usun???? klienta ${res.data.name}`],
            type: "success",
          },
        };
        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
        context.dispatch("getCustomers");
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "B????d",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
  },
};
