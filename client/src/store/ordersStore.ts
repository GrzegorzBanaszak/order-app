import axios from "axios";
import { State } from "./index";
import { IOrderHistoryInfo } from "@/types";
import { Module } from "vuex";

export interface IOrdersState {
  ordersHistory: IOrderHistoryInfo[];
}

interface OrdersHistoryPayload {
  type: string;
  id: string;
}

export const ordersState: Module<IOrdersState, State> = {
  state: {
    ordersHistory: [],
  },
  getters: {},
  mutations: {
    setOrdersHistory(state, payload: IOrderHistoryInfo[]) {
      state.ordersHistory = payload;
    },
  },
  actions: {
    async getOrdersHistory(context, payload: OrdersHistoryPayload) {
      const res = await axios(
        `http://localhost:5000/order/${payload.type}/${payload.id}`
      );
      context.commit("setOrdersHistory", res.data);
    },
  },
};
