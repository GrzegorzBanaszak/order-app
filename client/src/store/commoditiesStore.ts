import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  ICommodityDetail,
  ICommodityEditData,
  ICommodityInfo,
  ICommodityPost,
  IPopUpShowPayload,
  PopupTypeEnum,
} from "@/types";
import { Module } from "vuex";
import { PopUpMutations } from "./popupState";

export interface ICommoditiesState {
  commodities: ICommodityInfo[];
  commodityDetail: ICommodityDetail | null;
  isError: boolean;
}

export const commoditiesState: Module<ICommoditiesState, State> = {
  state: {
    commodities: [],
    commodityDetail: null,
    isError: false,
  },
  getters: {
    getFiltredCommodities: (state) => (search: string) => {
      const lowerCaseSearch = search.toLowerCase();
      return state.commodities.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSearch)
      );
    },
  },
  mutations: {
    setCommodities(state, payload: ICommodityInfo[]) {
      state.commodities = payload;
    },
    setCommodityDetail(state, payload: ICommodityDetail) {
      state.commodityDetail = payload;
    },
    toggleCommodityError(state) {
      state.isError = !state.isError;
    },
    resetCommodityDetail(state) {
      state.commodityDetail = null;
    },
  },
  actions: {
    async setCommodities(context) {
      const res = await axios(
        `${process.env.VUE_APP_BACKEND_IP}/commodity`,
        context.getters.getAuthHeader
      );
      context.commit("setCommodities", res.data);
    },
    async getCommodityDetail(context, payload: string) {
      try {
        const res = await axios(
          `${process.env.VUE_APP_BACKEND_IP}/commodity/${payload}`,
          context.getters.getAuthHeader
        );
        context.commit("setCommodityDetail", res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.request.status);
      }
    },
    async addCommodity(context, payload: ICommodityPost) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_BACKEND_IP}/commodity/add`,
          payload,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się dodać towar ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCommodityError");
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
    async editCommodity(context, payload: ICommodityEditData) {
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_BACKEND_IP}/commodity/update/${payload.id}`,
          payload.data,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się zaktualizować towar ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCommodityError");
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

    async removeCommodity(context, payload: string) {
      try {
        const res = await axios.delete(
          `${process.env.VUE_APP_BACKEND_IP}/commodity/delete/${payload}`,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się usunąć towar ${res.data.name}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
        context.dispatch("setCommodities");
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
