import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import http from "@/utils/http";
import { createAPI } from "@/components/tools/createAPI";
import Snackbar from "@/components/Snackbar";

Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.createAPI = createAPI;

Vue.prototype.$Snackbar = createAPI("Snackbar", Snackbar);
Vue.prototype.$Snackbar.success = function(text) {
  this.show({
    text
  });
};

export const APP = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
