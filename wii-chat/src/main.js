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
import { ls } from "@/utils/localStorageHelper";
import createAPI from "@/components/tools/createAPI";
import Snackbar from "@/components/Snackbar";

Vue.use(createAPI);
Vue.prototype.$Snackbar = Vue.createAPI("Snackbar", Snackbar);
Vue.prototype.$Snackbar.success = function(text) {
  this.show({
    text,
    color: "success"
  });
};

Vue.prototype.$Snackbar.error = function(text) {
  this.show({
    text,
    color: "error"
  });
};

Vue.prototype.$ls = ls;
Vue.prototype.$http = http;
Vue.config.productionTip = false;

export const APP = new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: h => h(App)
});

APP.$on("change-theme", () => {
  APP.$vuetify.theme.dark = !APP.$vuetify.theme.dark;
});
