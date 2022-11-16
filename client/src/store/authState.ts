import { State } from "./index";
import { Module } from "vuex";
import axios, { AxiosError } from "axios";
import { AxiosErrorDataType } from "@/types";

export interface IAuthState {
  user: any;
  token: string;
  isError: boolean;
}

export enum AuthMutations {
  SET_TOKEN = "setToken",
  TOGGLE_AUTH_ERROR = "toggleAuthError",
  SET_LOGIN_DATA = "setLoginData",
  SET_USER_DATA = "setUserData",
}

export enum AuthGetters {
  IS_AUTH = "isAuth",
  GET_AUTH_HEADER = "getAuthHeader",
  GET_USERNAME = "getUsername",
}

export enum AuthActions {
  LOGIN_USER = "loginUser",
  GET_USERS = "getUsers",
}

export const authState: Module<IAuthState, State> = {
  state: {
    user: null,
    token: "",
    isError: false,
  },
  getters: {
    [AuthGetters.IS_AUTH](state) {
      return state.token !== "" ? true : false;
    },
    [AuthGetters.GET_AUTH_HEADER](state) {
      const header = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      return header;
    },
    [AuthGetters.GET_USERNAME](state) {
      if (state.user) {
        return state.user.name;
      } else {
        return "";
      }
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
      state.token = payload.token;
    },
    [AuthMutations.SET_USER_DATA](state, payload: any) {
      state.user = payload;
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
          token: res.data.accese_token,
        });
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
      }
    },

    async [AuthActions.GET_USERS](context) {
      try {
        const res = await axios.get(
          `http://${process.env.VUE_APP_BACKEND_IP}:5000/employer`,
          context.getters.getAuthHeader
        );

        return res.data;
      } catch (error) {
        const err = error as AxiosError<AxiosErrorDataType>;
      }
    },
  },
};
