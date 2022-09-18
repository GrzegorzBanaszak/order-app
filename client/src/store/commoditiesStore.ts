import axios from "axios";
import { State } from "./index";
import { ICommodityInfo } from "@/types";
import { Module } from "vuex";

export interface ICommoditiesState {
  commodities: ICommodityInfo[];
}

export const commoditiesState: Module<ICommoditiesState, State> = {
  state: {
    commodities: [],
  },
  getters: {},
  mutations: {
    setCommodities(state, payload: ICommodityInfo[]) {
      state.commodities = payload;
    },
  },
  actions: {
    async setCommodities(context) {
      const res = await axios("http://localhost:5000/commodity");
      context.commit("setCommodities", res.data);
    },
  },
};
