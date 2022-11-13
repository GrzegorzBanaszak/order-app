import { State } from "./index";
import { Module } from "vuex";
import axios, { AxiosError } from "axios";
import { AxiosErrorDataType } from "@/types";

export interface IAuthState {
  username: string;
  token: string;
  isError: boolean;
}

export enum AuthMutations {
  SET_TOKEN = "setToken",
  TOGGLE_AUTH_ERROR = "toggleAuthError",
  SET_LOGIN_DATA = "setLoginData",
}

export enum AuthGetters {
  IS_AUTH = "isAuth",
  GET_AUTH_HEADER = "getAuthHeader",
}

export enum AuthActions {
  LOGIN_USER = "loginUser",
}

export const authState: Module<IAuthState, State> = {
  state: {
    username: "",
    token: "",
    isError: false,
  },
  getters: {
    [AuthGetters.IS_AUTH](state) {
      return state.token !== "" && state.username !== "";
    },
    [AuthGetters.GET_AUTH_HEADER](state) {
      const header = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      return header;
    },
  },
  mutations: {
    [AuthMutations.SET_TOKEN](state, payload: string) {
      state.token = payload;
    },
    [AuthMutations.TOGGLE_AUTH_ERROR](state, payload: boolean) {
      state.isError = payload;
    },
    [AuthMutations.SET_LOGIN_DATA](state, payload: any) {
      (state.username = payload.username), (state.token = payload.token);
    },
  },
  actions: {
    async [AuthActions.LOGIN_USER](context, payload) {
      try {
        const res = await axios.post(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/auth/login`,
          payload
        );

        context.commit(AuthMutations.SET_LOGIN_DATA, {
          username: res.data.user.username,
          token: res.data.accese_token,
        });
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
      }
    },
  },
};
