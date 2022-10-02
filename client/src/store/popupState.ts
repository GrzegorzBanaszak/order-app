import { Module } from "vuex";
import { State } from "./index";
export interface IPopupState {
  isShow: boolean;
  type: string;
  title: string;
  message: Array<string>;
}

export const popupState: Module<IPopupState, State> = {
  state: {
    isShow: false,
    type: "",
    message: [],
    title: "",
  },
  getters: {},
  mutations: {
    displayErrorPopup(state, payload: Array<string>) {
      state.isShow = true;
      state.message = payload;
      state.type = "type-error";
      state.title = "Błąd";
    },
    displaySuccessPopup(state, payload: Array<string>) {
      state.isShow = true;
      state.message = payload;
      state.type = "type-success";
      state.title = "Pomyślnie dodano";
    },
    popupReset(state) {
      state.isShow = false;
      state.message = [];
      state.type = "";
      state.title = "";
    },
  },
};
