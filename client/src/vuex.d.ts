import { IData } from "./fakeData";
import { key } from "./store/index";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<import("./store").State>;
  }
}
