import { IPopupConfirmData } from "@/types";
import { Module } from "vuex";
import { State } from "./index";
export interface IPopupState {
  isShow: boolean;
  styleType: string;
  layoutType: string;
  title: string;
  message: Array<string>;
  remove?: () => Promise<void>;
}

export const popupState: Module<IPopupState, State> = {
  state: {
    isShow: false,
    styleType: "",
    layoutType: "",
    message: [],
    title: "",
  },
  getters: {},
  mutations: {
    displayErrorPopup(state, payload: Array<string>) {
      state.isShow = true;
      state.message = payload;
      state.styleType = "type-error";
      state.title = "Błąd";
      state.layoutType = "info";
    },
    displaySuccessPopup(state, payload: Array<string>) {
      state.isShow = true;
      state.message = payload;
      state.styleType = "type-success";
      state.title = "Pomyślnie dodano";
      state.layoutType = "info";
    },
    popupReset(state) {
      state.isShow = false;
      state.message = [];
      state.styleType = "";
      state.title = "";
      state.layoutType = "";
    },
    displayRemovePopup(state, payload: IPopupConfirmData) {
      state.isShow = true;
      state.layoutType = "confirm";
      state.title = "Potwierdz";
      state.message = payload.messages;
      state.remove = payload.remove;
    },
  },
  actions: {
    async removeConfirm(context) {
      context.commit("popupReset");
      if (context.state.remove) await context.state.remove();
    },
  },
};
