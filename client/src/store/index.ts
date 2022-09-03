import { createStore, Store, useStore as baseUseStore } from "vuex";
import { data } from "@/fakeData";
import { InjectionKey } from "vue";
import { IData } from "@/types";

export interface State {
  data: IData;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    data,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});

export function useStore() {
  return baseUseStore(key);
}
