const Components = () =>
  import ( /* webpackChunkName: "c-components" */ '@/pages/Components/Components')

export default {
  path: '/components',
  name: 'components',
  component: Components,
  children: [{
    path: 'button',
    name: 'c.button',
    component: () =>
      import ( /* webpackChunkName: "button" */ '@cps/Input.md')
  }]
}