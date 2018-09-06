export default {
  path: '/home',
  name: 'home',
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
      import ( /* webpackChunkName: "article" */ '@/pages/Home/Article/Article')
  }, {
    path: 'chat',
    name: 'home.chat',
    component: () =>
      import ( /* webpackChunkName: "chat" */ '@/pages/Home/Chat/Chat')
  }, {
    path: 'question',
    name: 'home.question',
    component: () =>
      import ( /* webpackChunkName: "question" */ '@/pages/Home/Question/Question')
  }, {
    path: 'user',
    name: 'home.user',
    component: () =>
      import ( /* webpackChunkName: "user" */ '@/pages/Home/User/User')
  }]
}