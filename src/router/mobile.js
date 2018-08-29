const Home = () =>
  import ( /* webpackChunkName: "home" */ '@/pages/Home/Home')
const Weekly = () =>
  import ( /* webpackChunkName: "home" */ '@/pages/Home/Weekly/Weekly')

export default {
  path: '/home',
  name: 'home',
  redirect: '/home/weekly',
  component: Home,
  children: [{
    path: 'weekly',
    name: 'home.weekly',
    component: Weekly
  }, {
    path: 'about/about/',
    name: 'home.about.subAbout',
    component: () =>
      import ( /* webpackChunkName: "about" */ '@/views/About.vue')
  }]
}