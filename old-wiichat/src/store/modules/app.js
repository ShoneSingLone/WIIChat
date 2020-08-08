import axios from 'axios';
import dayjs from "dayjs";

let clientId = "de98ee996939961d39d9";
let redirectUri = (location.port ? 'http://192.168.137.1:8080' : 'https://shonesinglone.github.io/oauth');
let hostName = (location.port ? 'http://192.168.137.1:3000' : 'https://shonesinglone.leanapp.cn') + '/n/wiichat';
let themeColorDOM = null;

let githubAuthorizeUrl = new URL("https://github.com/login/oauth/authorize");
githubAuthorizeUrl.searchParams.append("client_id", clientId);
githubAuthorizeUrl.searchParams.append("redirect_uri", redirectUri);
githubAuthorizeUrl.searchParams.append("scope", "user");

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
    return state.userInfo;
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
      localStorage.setItem("userInfo", res.data);
      commit('setUserInfo');
    } catch (error) {
      setTimeout(() => {
        commit('setLoginMsg', `${error.message} #${dayjs(Date.now()).format("ss")}`);
      }, 1000 * 1.5);
    }
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
  setLoginMsg(state, msg) {
    state.loginMsg = msg;
    console.log(state.loginMsg);
  },
  logout(state) {
    localStorage.setItem('userInfo', "");
    state.userInfo = false;
  },
  setUserInfo(state) {
    // localStorage是同步的
    try {
      let userInfoString = localStorage.getItem('userInfo');
      let {
        name,
        token,
        avatar
      } = JSON.parse(userInfoString);
      if (name && token && avatar) {
        state.userInfo = {
          name,
          token,
          avatar
        };
      } else {
        throw new Error("Not Login");
      }
    } catch (error) {
      console.log(error);
      state.userInfo = false;
    }
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}