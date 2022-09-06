import { State } from "./index";
import { ICustomer } from "@/types";
import axios from "axios";
import { ActionContext } from "vuex";

export interface ICustomersState {
  customers: ICustomer[];
}

type Context = ActionContext<ICustomersState, State>;

export const customersState = {
  namespace: true,
  state: { customers: [] } as ICustomersState,
  getters: {},
  mutations: {
    setCustomers(state: ICustomersState, payload: ICustomer[]) {
      state.customers = payload;
    },
  },
  actions: {
    async getCustomers(context: Context) {
      const res = await axios("http://localhost:5000/customer");
      context.commit("setCustomers", res.data);
    },
  },
};
