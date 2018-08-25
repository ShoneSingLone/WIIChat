import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import './registerServiceWorker'
import '@cm/mdlComponentHandler.js'
import '@cm/ripple/ripple.js'
import '@cm/ripple/_ripple.scss'
import '@cb/Core.scss'

Vue.config.productionTip = false
Vue.use(Meta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')