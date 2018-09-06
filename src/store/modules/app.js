import axios from 'axios';
import dayjs from "dayjs";

let clientId = "de98ee996939961d39d9";
let redirectUri = (location.port ? 'http://192.168.137.1:8080' : 'https://shonesinglone.github.io/brumaire');
let hostName = (location.port ? 'http://192.168.137.1:3000' : 'https://shonesinglone.leanapp.cn') + '/n/wiichat';
let themeColorDOM = null;

let githubAuthorizeUrl = new URL(
  "https://github.com/login/oauth/authorize"
);
githubAuthorizeUrl.searchParams.append("client_id", clientId);
githubAuthorizeUrl.searchParams.append("redirect_uri", redirectUri);
githubAuthorizeUrl.searchParams.append("scope", "user");

function setLocalStorage({
  token,
  name,
  avatar
}) {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userName", name);
  localStorage.setItem("userAvatar", avatar);
}


const state = {
  meta: {
    themeColor: '#337ab7',
  },
  isMobile: true,
  windowScrollY: 0,
  userInfo: false,
  loginMsg: '',
  githubAuthorizeUrl,
  clientId,
  redirectUri,
  hostName,
  appSize: {
    height: 0,
    width: 0
  }
};

const getters = {
  appHeight(state) {
    return state.appSize.height;
  },
  appWidth(state) {
    return state.appSize.width;
  },
  metaThemeColor(state) {
    return state.meta.themeColor;
  },
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
  githubAuthorizeUrl(state) {
    return state.githubAuthorizeUrl
  },
  loginMsg(state) {
    return state.loginMsg;
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
  setThemeColor({
    commit
  }, color) {
    // LAZY SINGLE
    try {
      themeColorDOM = themeColorDOM ? themeColorDOM : document.getElementById('theme-color');
      themeColorDOM.setAttribute('content', color)
    } catch (error) {
      // TODO:append a meta name=theme-color content=color
    }
    return commit('setThemeColor', color)
  },
  setAppSize({
    commit
  }, rect) {
    return commit('setAppSize', rect)
  },
  setUserInfo({
    commit
  }, userInfo) {
    setLocalStorage(userInfo);
    return commit('setUserInfo', userInfo)
  },
  async login({
    commit
  }, {
    userName,
    userPwd
  }) {
    try {
      let {
        status,
        data: res
      } = await axios({
        method: "post",
        url: hostName,
        data: {
          endpoint: "login",
          action: "loginByAccount",
          userName,
          userPwd
        },
      });
      if (!(status === 200 && res.isSuccess)) throw new Error(res.error);
      setLocalStorage(res.data);
      commit('setUserInfo', res.data)
    } catch (error) {
      setTimeout(() => {
        commit('setLoginMsg', `${error.message} #${dayjs(Date.now()).format("ss")}`);
      }, 1000 * 1.5);
    }
  },
  logOut({
    commit
  }, ) {
    localStorage.clear()
    return commit('setUserInfo', false)
  }
}
const mutations = {
  setThemeColor(state, color) {
    state.meta.themeColor = color
  },
  setAppSize(state, {
    height,
    width,
    top,
    bottom,
    right,
    left,
    x,
    y
  }) {
    state.appSize.height = height;
    state.appSize.width = width;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setLoginMsg(state, msg) {
    state.loginMsg = msg;
    console.log(state.loginMsg);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}