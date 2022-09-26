import axios, { AxiosError } from "axios";
import { State } from "./index";
import { IOrder, IOrderHistoryInfo } from "@/types";
import { Module } from "vuex";

export interface IOrdersState {
  ordersHistory: IOrderHistoryInfo[];
  ordersInfo: Array<IOrder>;
}

interface OrdersHistoryPayload {
  type: string;
  id: string;
}

export const ordersState: Module<IOrdersState, State> = {
  state: {
    ordersHistory: [],
    ordersInfo: [],
  },
  getters: {},
  mutations: {
    setOrdersHistory(state, payload: IOrderHistoryInfo[]) {
      state.ordersHistory = payload;
    },
    setOrdersInfo(state, payload: Array<IOrder>) {
      state.ordersInfo = payload;
    },
  },
  actions: {
    async getOrdersHistory(context, payload: OrdersHistoryPayload) {
      const res = await axios(
        `http://localhost:5000/order/${payload.type}/${payload.id}`
      );
      context.commit("setOrdersHistory", res.data);
    },
    async getOrdersInfo(context) {
      try {
        const res = await axios("http://localhost:5000/order/");
        context.commit("setOrdersInfo", res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.request.status);
      }
    },
  },
};
