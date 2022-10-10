import axios, { AxiosError } from "axios";
import { State } from "./index";
import { IOrder, IOrderDetail, IOrderHistoryInfo } from "@/types";
import { Module } from "vuex";

export interface IOrdersState {
  ordersHistory: IOrderHistoryInfo[];
  ordersInfo: Array<IOrder>;
  orderDetail: IOrderDetail | null;
}

interface OrdersHistoryPayload {
  type: string;
  id: string;
}

export const ordersState: Module<IOrdersState, State> = {
  state: {
    ordersHistory: [],
    ordersInfo: [],
    orderDetail: null,
  },
  getters: {},
  mutations: {
    setOrdersHistory(state, payload: IOrderHistoryInfo[]) {
      state.ordersHistory = payload;
    },
    setOrdersInfo(state, payload: Array<IOrder>) {
      state.ordersInfo = payload;
    },
    setOrderDetail(state, payload: IOrderDetail) {
      state.orderDetail = payload;
    },
  },
  actions: {
    async getOrdersHistory(context, payload: OrdersHistoryPayload) {
      const res = await axios(
        `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/${payload.type}/${payload.id}`
      );
      context.commit("setOrdersHistory", res.data);
    },
    async getOrdersInfo(context) {
      try {
        const res = await axios(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/`
        );
        context.commit("setOrdersInfo", res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.request.status);
      }
    },
    async getOrderDetail(context, payload: string) {
      try {
        const res = await axios(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/${payload}`
        );
        context.commit("setOrderDetail", res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.request.status);
      }
    },
  },
};
