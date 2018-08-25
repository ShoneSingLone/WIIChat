import Vue from 'vue'
import Router from 'vue-router'

import home from './home.js'
import login from './login.js'
const checkout = () =>
  import ( /* webpackChunkName: "checkout" */ '@/pages/Login/Checkout')
const error = () =>
  import ( /* webpackChunkName: "error" */ '@/pages/Error')


Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/login'
  }, {
    path: '/checkout',
    name: 'checkout',
    component: checkout,
  }, {
    path: '/error',
    name: 'error',
    component: error,
  }, login, home]
})