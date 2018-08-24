const mobile = () =>
  import ( /* webpackChunkName: "mobile" */ '@/pages/M/Mobile')

import login from './login.js'

export default {
  path: '/m',
  name: 'm',
  component: mobile,
  children: [login,
    login
  ]
}