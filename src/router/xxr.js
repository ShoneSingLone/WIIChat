const xxr = () =>
  import(/* webpackChunkName: "home" */ '@/pages/XXR')
export default {
  path: '/xxr',
  name: 'xxr',
  component: xxr
}
