import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { key, store } from "./store";
import "./styles/form.scss";

createApp(App).use(store, key).use(router).mount("#app");
