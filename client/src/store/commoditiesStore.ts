import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  ICommodityDetail,
  ICommodityInfo,
  ICommodityPost,
} from "@/types";
import { Module } from "vuex";

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
  getters: {},
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
  },
  actions: {
    async setCommodities(context) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/commodity`
      );
      context.commit("setCommodities", res.data);
    },
    async getCommodityDetail(context, payload: string) {
      try {
        const res = await axios(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/commodity/${payload}`
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
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/commodity/add`,
          payload
        );
        context.commit("displaySuccessPopup", [
          `Udało sie dodać towar ${res.data.name}`,
        ]);
        setTimeout(() => {
          context.commit("popupReset");
        }, 5000);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCommodityError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
  },
};
