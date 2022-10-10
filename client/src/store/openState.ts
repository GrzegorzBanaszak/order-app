import axios from "axios";
import { State } from "./index";
import { IOpenListElement, IOrder } from "@/types";
import { Module } from "vuex";

export interface IOpenState {
  bestCustomers: IOpenListElement[];
  bestCommodities: IOpenListElement[];
  filteredOrders: IOrder[];
}

export const openState: Module<IOpenState, State> = {
  state: {
    bestCommodities: [],
    bestCustomers: [],
    filteredOrders: [],
  },
  getters: {},
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
  },
  actions: {
    async getOrders({ commit }) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/last/5`
      );
      commit("setFilteredOrders", res.data);
    },
    async getBestCustomers({ commit }) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/best/customers`
      );
      commit("setBestCustomers", res.data);
    },
    async getBestCommodities({ commit }) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/best/commodities`
      );
      commit("setBestCommodities", res.data);
    },
  },
};
