let clientId = "de98ee996939961d39d9";
let redirectUri = (location.port ? 'http://192.168.137.1:8080' : 'https://shonesinglone.github.io/brumaire');
let hostName = (location.port ? 'http://192.168.137.1:3000' : 'https://shonesinglone.leanapp.cn') + '/n/wiichat';

let githubAuthorizeUrl = new URL(
  "https://github.com/login/oauth/authorize"
);
githubAuthorizeUrl.searchParams.append("client_id", clientId);
githubAuthorizeUrl.searchParams.append("redirect_uri", redirectUri);
githubAuthorizeUrl.searchParams.append("scope", "user");

const state = {
  isMobile: true,
  windowScrollY: 0,
  userInfo: false,
  githubAuthorizeUrl,
  clientId,
  redirectUri,
  hostName
}
const getters = {
  windowScrollY(state) {
    return state.windowScrollY
  },
  hostName(state) {
    return state.hostName
  },
  redirectUri(state) {
    return state.redirectUri
  },
  clientId(state) {
    return state.clientId
  },
  userInfo(state) {
    if (!state.userInfo) {
      let token = localStorage.getItem("userToken");
      let name = localStorage.getItem("userName");
      let avatar = localStorage.getItem("userAvatar");

      if (token && name && avatar) {
        state.userInfo = {
          token,
          name,
          avatar
        }
      }
    }
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