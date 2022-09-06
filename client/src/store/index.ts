import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { IOpenListElement, IOrder } from "@/types";
import axios from "axios";
import { customersState, ICustomersState } from "./customersState";

export interface State {
  bestCustomers: IOpenListElement[];
  bestCommodities: IOpenListElement[];
  filteredOrders: IOrder[];
  customersState?: ICustomersState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: { customersState },
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
      const res = await axios("http://localhost:5000/order");
      commit("setFilteredOrders", res.data);
    },
    async getBestCustomers({ commit }) {
      const res = await axios("http://localhost:5000/order/best/customers");
      commit("setBestCustomers", res.data);
    },
    async getBestCommodities({ commit }) {
      const res = await axios("http://localhost:5000/order/best/commodities");
      commit("setBestCommodities", res.data);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
