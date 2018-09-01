import axios from 'axios';

const state = {
  articleList: [],
  limit: 6,
  movingDirectionY: -1
}
const getters = {
  articleList(state) {
    return state.articleList
  },
  movingDirectionY(state) {
    return state.movingDirectionY
  },
}
const actions = {
  async getArticleList({
    commit
  }, {
    url,
    sort
  }) {
    let currentLength = state.articleList.length;
    let skip = currentLength % state.limit;
    try {
      let result = await axios({
        method: "post",
        url,
        data: {
          endpoint: "article",
          action: "getArticleList",
          limit: state.limit,
          skip,
          sort
        },
        onUploadProgress: function (progressEvent) {
          console.log("onUploadProgress", progressEvent);
          console.time("progress");
          // Do whatever you want with the native progress event
        },
        onDownloadProgress: function (progressEvent) {
          console.log("onDownloadProgress", progressEvent);
          console.timeEnd("progress");
          // Do whatever you want with the native progress event
        },
        params: {}
      });
      console.dir(result)
      let {
        status,
        data: res
      } = result;
      if (status === 200 && res.success) {
        commit('setArticleList', res.data);
      }
    } catch (error) {
      console.dir(error)
    }
  },
}
const mutations = {
  setArticleList(state,
    articleArray
  ) {
    state.articleList = articleArray
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}