export default {
  path: '/home',
  name: 'home',
  redirect: '/home/article',
  component: () =>
    import ( /* webpackChunkName: "home" */ '@/pages/Home/Home'),
  children: [{
    path: 'article',
    name: 'home.article',
    component: () =>
      import ( /* webpackChunkName: "article" */ '@/pages/Home/Article/Article')
  }, {
    path: 'article/detail',
    name: 'home.article.detail',
    component: () =>
      import ( /* webpackChunkName: "article.detail" */ '@/pages/Home/Article/Article')
  }]
}