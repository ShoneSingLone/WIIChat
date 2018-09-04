import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import home from './modules/home'
import indexedDB from './modules/indexedDB'
import article from './modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    home,
    indexedDB,
    article
  }
})