const state = {
  windowScrollY: 0
}
const getters = {
  windowScrollY (state) {
    return state.windowScrollY
  }
}
const actions = {
  setWindowScrollY ({
    commit
  }, y) {
    return commit('setWindowScrollY', y)
  }
}
const mutations = {
  setWindowScrollY (state, y) {
    state.windowScrollY = y
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
