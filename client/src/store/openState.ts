import axios from "axios";
import { State } from "./index";
import { IOpenListElement, IOrder } from "@/types";
import { Module } from "vuex";

export interface IOpenState {
  bestCustomers: IOpenListElement[];
  bestCommodities: IOpenListElement[];
  filteredOrders: IOrder[];
  location: Array<string>;
}

export const openState: Module<IOpenState, State> = {
  state: {
    bestCommodities: [],
    bestCustomers: [],
    filteredOrders: [],
    location: new Array<string>(0),
  },
  getters: {
    getBestCustomers(state) {
      return state.bestCustomers.slice(0, 9);
    },
    getBestCommodities(state) {
      return state.bestCommodities.slice(0, 9);
    },
  },
  mutations: {
    setFilteredOrders(state, payload: IOrder[]) {
      state.filteredOrders = payload;
    },
    setBestCustomers(state, payload: IOpenListElement[]) {
      state.bestCustomers = payload;
    },
    setBestCommodities(state, payload: IOpenListElement[]) {
      state.bestCommodities = payload;
    },
    setLocation(state, payload: Array<string>) {
      state.location = payload;
    },
  },
  actions: {
    async getOrders(context) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/last/5`,
        context.getters.getAuthHeader
      );
      context.commit("setFilteredOrders", res.data);
    },
    async getBestCustomers(context) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/best/customers`,
        context.getters.getAuthHeader
      );
      context.commit("setBestCustomers", res.data);
    },
    async getBestCommodities(context) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/best/commodities`,
        context.getters.getAuthHeader
      );
      context.commit("setBestCommodities", res.data);
    },
  },
};
