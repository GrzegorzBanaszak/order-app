import { IData } from "./fakeData";
import { key } from "./store/index";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    data: import("./types").IData;
  }
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
