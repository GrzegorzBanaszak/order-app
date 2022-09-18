import { companiesState, ICompaniesState } from "./companiesState";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { customersState, ICustomersState } from "./customersState";
import { IOpenState, openState } from "./openState";
import { ISuppliersState, suppliersState } from "./suppliersState";
import { commoditiesState, ICommoditiesState } from "./commoditiesStore";

export interface State {
  customersState: ICustomersState;
  companiesState: ICompaniesState;
  openState: IOpenState;
  suppliersState: ISuppliersState;
  commoditiesState: ICommoditiesState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    customersState,
    companiesState,
    openState,
    suppliersState,
    commoditiesState,
  },
});

export function useStore() {
  return baseUseStore(key);
}
