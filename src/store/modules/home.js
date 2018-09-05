let rectDemo = {
  bottom: 667.2000122070312,
  height: 667.2000122070312,
  left: 0,
  right: 375.20001220703125,
  top: 0,
  width: 375.20001220703125,
  x: 0,
  y: 0
}
const state = {
  initCompleteCounter: 0, //3 homeRect toolRect navRect都获取完成就可以计算route-view
  homeRect: Object.assign(rectDemo),
  toolRect: Object.assign(rectDemo, {
    height: 50
  }),
  navRect: Object.assign(rectDemo, {
    height: 70
  }),
  isShowToolBar: true,
  isShowNavBar: true,
  currentShow: "home.article"
}

const getters = {
  homeHeight(state) {
    return parseInt(state.homeRect.height);
  },
  toolHeight(state) {
    return parseInt(state.toolRect.height);
  },
  navHeight(state) {
    return parseInt(state.navRect.height);
  },
  isInitCompleted(state) {
    return state.initCompleteCounter === 3;
  },
  isShowToolBar(state) {
    return state.isShowToolBar;
  },
  isShowNavBar(state) {
    return state.isShowNavBar;
  },
  currentShow(state) {
    return state.currentShow;
  },
}

const actions = {
  async setHomeRect({
    commit
  }, rect) {
    return commit('setHomeRect', rect)
  },
  async setToolBarRect({
    commit
  }, rect) {
    return commit('setToolBarRect', rect);
  },
  async setNavBarRect({
    commit
  }, rect) {
    return commit('setNavBarRect', rect);
  },
  // 以上三者只应该在Home初始化各调用一次
  async setShowToolBar({
    commit
  }, isShow) {
    return commit('setShowToolBar', isShow);
  },
  async setShowNavBar({
    commit
  }, isShow) {
    return commit('setShowNavBar', isShow);
  },
  async setCurrentShow({
    commit
  }, showModule) {
    return commit('setCurrentShow', showModule);
  }
}

const mutations = {
  setToolBarRect(state,
    rect
  ) {
    state.initCompleteCounter++
    state.toolRect = rect;
  },
  setNavBarRect(state,
    rect
  ) {
    state.initCompleteCounter++
    state.navRect = rect;
  },
  setHomeRect(state,
    rect
  ) {
    state.initCompleteCounter++
    state.homeRect = rect;
  },
  setShowToolBar(state,
    isShow
  ) {
    state.isShowToolBar = isShow;
  },
  setShowNavBar(state,
    isShow
  ) {
    state.isShowNavBar = isShow;
  },
  setCurrentShow(state,
    showModule
  ) {
    state.currentShow = showModule;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}