import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
// import 'reset-css'
import './registerServiceWorker'
// import './assets/bootstrap-sass-3.3.7/stylesheets/_bootstrap.scss'
import '@m/material-design-lite/material.js'
import '@m/material-design-lite/material.css'

Vue.config.productionTip = false
Vue.use(Meta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')