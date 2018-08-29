const Components = () =>
  import ( /* webpackChunkName: "c-components" */ '@/pages/Components/Components')

export default {
  path: '/components',
  name: 'components',
  component: Components,
}