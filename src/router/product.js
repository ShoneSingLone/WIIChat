const product = () =>
  import(/* webpackChunkName: "home" */ '@/pages/Product')
export default {
  path: '/product',
  name: 'product',
  component: product
}
