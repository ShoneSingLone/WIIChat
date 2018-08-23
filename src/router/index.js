import Vue from 'vue'
import Router from 'vue-router'

import home from './home.js'
import login from './login.js'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/login'
  }, home, login]
})