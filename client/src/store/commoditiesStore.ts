import axios, { AxiosError } from "axios";
import { State } from "./index";
import { ICommodityDetail, ICommodityInfo } from "@/types";
import { Module } from "vuex";

export interface ICommoditiesState {
  commodities: ICommodityInfo[];
  commodityDetail: ICommodityDetail | null;
}

export const commoditiesState: Module<ICommoditiesState, State> = {
  state: {
    commodities: [],
    commodityDetail: null,
  },
  getters: {},
  mutations: {
    setCommodities(state, payload: ICommodityInfo[]) {
      state.commodities = payload;
    },
    setCommodityDetail(state, payload: ICommodityDetail) {
      state.commodityDetail = payload;
    },
  },
  actions: {
    async setCommodities(context) {
      const res = await axios("http://localhost:5000/commodity");
      context.commit("setCommodities", res.data);
    },
    async getCommodityDetail(context, payload: string) {
      try {
        const res = await axios("http://localhost:5000/commodity/" + payload);
        context.commit("setCommodityDetail", res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.request.status);
      }
    },
  },
};
