import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import './registerServiceWorker'
//style
import 'reset-css'
import "@cps/ResetDandDependencies.scss";

Vue.config.productionTip = false
Vue.use(Meta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')