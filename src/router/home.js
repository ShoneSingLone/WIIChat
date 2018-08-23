const home = () =>
  import ( /* webpackChunkName: "home" */ '@/pages/Home')

export default {
  path: '/home',
  name: 'home',
  component: home,
  children: [{
    path: '/about',
    name: 'home.about',
  }, {
    path: '/about/about/',
    name: 'home.about.subAbout',
    component: () =>
      import ( /* webpackChunkName: "about" */ '@/views/About.vue')
  }]
}