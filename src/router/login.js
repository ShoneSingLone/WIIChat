const login = () =>
  import ( /* webpackChunkName: "login" */ '@/pages/Login')

export default {
  path: '/login',
  name: 'login',
  component: login,
}