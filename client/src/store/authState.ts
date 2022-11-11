import { State } from "./index";
import { Module } from "vuex";

export interface IAuthState {
  username: string;
  token: string;
}

export enum AuthMutations {
  SET_TOKEN = "setToken",
}

export const authState: Module<IAuthState, State> = {
  state: {
    username: "",
    token: "",
  },
  getters: {},
  mutations: {
    [AuthMutations.SET_TOKEN](state, payload: string) {
      state.token = payload;
    },
  },
  actions: {},
};
