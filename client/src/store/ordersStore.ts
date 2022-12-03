import axios, { AxiosError } from "axios";
import { State } from "./index";
import {
  AxiosErrorDataType,
  IOrder,
  IOrderDetail,
  IOrderEditData,
  IOrderElementEditData,
  IOrderFormListElement,
  IOrderHistoryInfo,
  IOrderPost,
  IPopUpShowPayload,
  IStatusUpdate,
  PopupTypeEnum,
} from "@/types";
import { Module } from "vuex";
import { PopUpMutations } from "./popupState";

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
  getters: {
    getFiltredOrders: (state) => (search: string) => {
      const lowerCaseSearch = search.toLowerCase();
      return state.ordersInfo.filter((item) =>
        item.customer.toLowerCase().includes(lowerCaseSearch)
      );
    },
  },
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
    setOrderFormElements(state, payload: Map<string, IOrderFormListElement>) {
      state.ordersFormElements = payload;
    },
    addFormElement(state, payload: IOrderFormListElement) {
      state.ordersFormElements.set(payload.id, payload);
    },
    editFormElement(state, payload: IOrderElementEditData) {
      const item = state.ordersFormElements.get(payload.id);
      if (item) {
        item.price = payload.price;
        item.quantity = payload.quantity;
        item.isCustomerPayForDelivery = payload.isCustomerPayForDelivery;
      }
    },
    removeFormElement(state, payload: string) {
      const item = state.ordersFormElements.get(payload);

      if (item) {
        state.ordersFormElements.delete(payload);
      }
    },
    resetOrdersElements(state) {
      state.ordersFormElements = new Map();
    },
    toggleOrderError(state) {
      state.isError = !state.isError;
    },
    resetOrderDetail(state) {
      state.orderDetail = null;
    },
  },
  actions: {
    async getOrdersHistory(context, payload: OrdersHistoryPayload) {
      const res = await axios(
        `${process.env.VUE_APP_BACKEND_IP}/order/${payload.type}/${payload.id}`,
        context.getters.getAuthHeader
      );
      context.commit("setOrdersHistory", res.data);
    },
    async getOrdersInfo(context) {
      try {
        const res = await axios(
          `${process.env.VUE_APP_BACKEND_IP}/order/`,
          context.getters.getAuthHeader
        );
        context.commit("setOrdersInfo", res.data);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async getOrderDetail(context, payload: string) {
      try {
        const res = await axios(
          `${process.env.VUE_APP_BACKEND_IP}/order/${payload}`,
          context.getters.getAuthHeader
        );
        context.commit("setOrderDetail", res.data);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async addOrder(context, payload: IOrderPost) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_BACKEND_IP}/order/add`,
          payload,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [`Udało się dodać zamówienie ${res.data.orderNumber}`],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleOrderError");
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async editOrder(context, payload: IOrderEditData) {
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_BACKEND_IP}/order/update/${payload.id}`,
          payload.data,
          context.getters.getAuthHeader
        );
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Pomyślnie",
            messages: [
              `Udało się zaktualizować zamówienie ${res.data.orderNumber}`,
            ],
            type: "success",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        context.commit("toggleOrderError");
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
    async updateStatus(context, payload: IStatusUpdate) {
      try {
        const res = await axios.patch(
          `${process.env.VUE_APP_BACKEND_IP}/order/${payload.id}/${payload.status}`,
          {},
          context.getters.getAuthHeader
        );
        context.commit("setOrderDetail", res.data);
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
        const payloadData: IPopUpShowPayload = {
          type: PopupTypeEnum.DISPLAY_MESSAGES,
          data: {
            title: "Błąd",
            messages: err.response?.data.message,
            type: "error",
          },
        };

        context.commit(PopUpMutations.POPUP_SHOW, payloadData);
      }
    },
  },
};
