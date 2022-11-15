import { IPopupData, IPopUpShowPayload, PopupTypeEnum } from "./../types";
import { IPopupConfirmData } from "@/types";
import { Module } from "vuex";
import { State } from "./index";
import { v4 as uuidv4 } from "uuid";

export interface IPopupState {
  popups: Map<string, IPopupData>;
}

export enum PopUpMutations {
  POPUP_SHOW = "popupShowMessages",
  REMOVE_POPUP = "removePopup",
}

export const popupState: Module<IPopupState, State> = {
  state: {
    popups: new Map(),
  },
  getters: {},
  mutations: {
    //Display messages from a backend response
    [PopUpMutations.POPUP_SHOW](state, payload: IPopUpShowPayload) {
      const id = uuidv4();
      const popupData: IPopupData = {
        id,
        type: payload.type,
        data: payload.data,
      };

      console.log(popupData);
      state.popups.set(id, popupData);
    },
    [PopUpMutations.REMOVE_POPUP](state, payload: string) {
      state.popups.delete(payload);
    },
    displayRemovePopup(state, payload: IPopupConfirmData) {
      // const id = uuidv4();
      // const popupData: IPopupData = {
      //   id,
      //   styleType: "type-error",
      //   layoutType: "confirm",
      //   title: "Uwaga",
      //   message: payload.messages,
      //   remove: payload.remove,
      // };
      // state.popups.set(id, popupData);
    },
  },
  actions: {
    // async removeConfirm(context, payload: string) {
    //   const popup = context.state.popups.get(payload);
    //   if (popup && popup.remove) {
    //     await popup.remove();
    //     context.commit("popupRemove", payload);
    //   }
    // },
  },
};
