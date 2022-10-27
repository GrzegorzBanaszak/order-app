import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  ICommodityDetail,
  ICommodityEditData,
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
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCommodityError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
    async editCommodity(context, payload: ICommodityEditData) {
      try {
        const res = await axios.put(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/commodity/update/${payload.id}`,
          payload.data
        );
        context.commit("displaySuccessPopup", [
          `Udało sie edytować towar ${res.data.name}`,
        ]);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleCommodityError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },

    async removeCommodity(context, payload: string) {
      try {
        const res = await axios.delete(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/commodity/delete/${payload}`
        );
        context.commit("displaySuccessPopup", [
          `Udało sie usunąc towar ${res.data.name}`,
        ]);
        context.dispatch("setCommodities");
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const messages = [err.response?.data.message];
        context.commit("displayErrorPopup", messages);
      }
    },
  },
};
