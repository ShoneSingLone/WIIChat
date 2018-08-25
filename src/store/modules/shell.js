const state = {
  isMobile: true,
  windowScrollY: 0,
  login: {},
  userInfo: {},
  hostName: (location.port ? 'http://192.168.137.1:3000' : 'https://shonesinglone.leanapp.cn') + '/n/wiichat'
}
const getters = {
  windowScrollY(state) {
    return state.windowScrollY
  },
  hostName(state) {
    return state.hostName
  },
  userInfo(state) {
    return state.userInfo
  }
}
const actions = {
  setWindowScrollY({
    commit
  }, y) {
    return commit('setWindowScrollY', y)
  },
  setUserInfo({
    commit
  }, {
    token,
    name,
    avatar
  }) {
    debugger
    localStorage.setItem("userToken", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userAvatar", avatar);

    return commit('setUserInfo', {
      token,
      name,
      avatar
    })
  }
}
const mutations = {
  setWindowScrollY(state, y) {
    state.windowScrollY = y
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}