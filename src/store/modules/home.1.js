const state = {
  blogList: {},
  blogDetail: {},
  blogDetailCurrent: {}
}
const getters = {
  blogList (state) {
    return state.blogList
  },
  blogDetail (state) {
    return state.blogDetail
  },
  blogDetailCurrent (state) {
    return state.blogDetailCurrent
  }
}
const actions = {
  async getBlogList ({
    commit
  }, params) {},
  async getBlogDetail ({
    commit
  }, params) {},
  async getBlogDetailCurrent ({
    commit
  }, path) {}
}
const mutations = {
  setBlogList (state, {
    blogs
  }) {
    state.blogList = blogs
  },
  setBlogDetail (state, {
    blogDetail
  }) {},
  setBlogDetailCurrent (state, {
    blogDetail
  }) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
