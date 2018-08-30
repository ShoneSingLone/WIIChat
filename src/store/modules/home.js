const state = {
  homeRect: {
    bottom: 667.2000122070312,
    height: 667.2000122070312,
    left: 0,
    right: 375.20001220703125,
    top: 0,
    width: 375.20001220703125,
    x: 0,
    y: 0
  },
  toolRect: {
    height: 670
  },
  navRect: {
    height: 670
  }
}
const getters = {
  homeHeight(state) {
    return parseInt(state.homeRect.height);
  }
}

const actions = {
  async setHomeRect({
    commit
  }, rect) {
    return commit('setHomeRect', rect)
  }
}

const mutations = {
  setHomeRect(state,
    rect
  ) {
    state.homeRect = rect;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}