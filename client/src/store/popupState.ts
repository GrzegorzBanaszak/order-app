import { IPopupData } from "./../types/IPopupData";
import { IPopupConfirmData } from "@/types";
import { Module } from "vuex";
import { State } from "./index";
import { v4 as uuidv4 } from "uuid";

export interface IPopupState {
  popups: Map<string, IPopupData>;
}

export const popupState: Module<IPopupState, State> = {
  state: {
    popups: new Map(),
  },
  getters: {},
  mutations: {
    displayErrorPopup(state, payload: Array<string>) {
      const id = uuidv4();
      const popupData: IPopupData = {
        id,
        styleType: "type-error",
        layoutType: "info",
        title: "Uwaga",
        message: payload,
      };
      state.popups.set(id, popupData);
    },
    displaySuccessPopup(state, payload: Array<string>) {
      const id = uuidv4();
      const popupData: IPopupData = {
        id,
        styleType: "type-success",
        layoutType: "info",
        title: "Pomyślne dodanie",
        message: payload,
      };
      state.popups.set(id, popupData);
    },
    popupRemove(state, payload: string) {
      state.popups.delete(payload);
    },
    displayRemovePopup(state, payload: IPopupConfirmData) {
      const id = uuidv4();
      const popupData: IPopupData = {
        id,
        styleType: "type-error",
        layoutType: "confirm",
        title: "Uwaga",
        message: payload.messages,
        remove: payload.remove,
      };
      state.popups.set(id, popupData);
    },
  },
  actions: {
    async removeConfirm(context, payload: string) {
      const popup = context.state.popups.get(payload);

      if (popup && popup.remove) {
        await popup.remove();
        context.commit("popupRemove", payload);
      }
    },
  },
};
