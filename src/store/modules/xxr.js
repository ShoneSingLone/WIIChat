const state = {
  windowScrollY: 0
}
const getters = {
  windowScrollY(state) {
    return state.windowScrollY
  }
}
const actions = {
  setAppSize({
    commit
  }, y) {
    return commit('setAppSize', y)
  }
}
const mutations = {
  setAppSize(state, y) {
    state.windowScrollY = y
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}