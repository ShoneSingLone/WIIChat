const login = () =>
  import ( /* webpackChunkName: "login" */ '@/pages/Login')

export default {
  path: '/login',
  name: 'login',
  component: login
}
// http: //localhost:8080/?code=c66cec5e36bea4ee7410