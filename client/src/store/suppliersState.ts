import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  IPopUpShowPayload,
  ISupplierDetail,
  ISupplierEditData,
  ISupplierInfo,
  ISupplierPost,
  PopupTypeEnum,
} from "@/types";
import { Module } from "vuex";
import { PopUpMutations } from "./popupState";

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

        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się dodać dostawcę ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleSupplierError");

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
    async editSupplier(context, payload: ISupplierEditData) {
      try {
        const res = await axios.put(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier/update/${payload.id}`,
          payload.data,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się edytować dostawcę ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleSupplierError");
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
    async removeSupplier(context, payload: string) {
      try {
        const res = await axios.delete(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/supplier/delete/${payload}`,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się usunąć dostawcę ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
        context.dispatch("setSuppliers");
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
