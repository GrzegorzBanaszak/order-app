import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  IOrder,
  IOrderDetail,
  IOrderElementEditData,
  IOrderFormListElement,
  IOrderHistoryInfo,
  IOrderPost,
} from "@/types";
import { Module } from "vuex";

export interface IOrdersState {
  ordersHistory: IOrderHistoryInfo[];
  ordersInfo: Array<IOrder>;
  orderDetail: IOrderDetail | null;
  ordersFormElements: Map<string, IOrderFormListElement>;
  isError: boolean;
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
    ordersFormElements: new Map(),
    isError: false,
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
    addFormElement(state, payload: IOrderFormListElement) {
      state.ordersFormElements.set(payload.id, payload);
    },
    editFormElement(state, payload: IOrderElementEditData) {
      const item = state.ordersFormElements.get(payload.id);
      if (item) {
        item.price = payload.price;
        item.quantity = payload.quantity;
      }
    },
    resetOrdersElements(state) {
      state.ordersFormElements = new Map();
    },
    toggleOrderError(state) {
      state.isError = !state.isError;
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
    async addOrder(context, payload: IOrderPost) {
      try {
        const res = await axios.post(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/order/add`,
          payload
        );
        context.commit("displaySuccessPopup", [
          `Udało sie dodać zamówienie ${res.data.orderNumber}`,
        ]);
        setTimeout(() => {
          context.commit("popupReset");
        }, 5000);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleOrderError");
        context.commit("displayErrorPopup", err.response?.data.message);
      }
    },
  },
};
