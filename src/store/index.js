import Vue from 'vue'
import Vuex from 'vuex'

import shell from './modules/shell'
import home from './modules/home'
import xxr from './modules/xxr'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shell,
    home,
    xxr
  }
})