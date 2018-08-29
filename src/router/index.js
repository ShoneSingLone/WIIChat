import Vue from 'vue'
import Router from 'vue-router'
// 小写开始为Router
import mobile from './mobile'
import components from './components'

// 大写开始为Component
import Login from '@/pages/Login/Login'
const Checkout = () =>
  import ( /* webpackChunkName: "checkout" */ '@/pages/Login/Checkout')
const ErrorPage = () =>
  import ( /* webpackChunkName: "error" */ '@/pages/Error/Error')
Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
  }, {
    path: '/error',
    name: 'error',
    component: ErrorPage,
  }, mobile, components]
})