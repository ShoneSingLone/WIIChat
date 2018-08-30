const Home = () =>
  import ( /* webpackChunkName: "home" */ '@/pages/Home/Home')
const Article = () =>
  import ( /* webpackChunkName: "home" */ '@/pages/Home/Article/Article')

export default {
  path: '/home',
  name: 'home',
  redirect: '/home/Article',
  component: Home,
  children: [{
    path: 'Article',
    name: 'home.Article',
    component: Article
  }]
}