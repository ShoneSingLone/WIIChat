import axios from 'axios';
import Marked from 'marked';
import Highlight from 'highlight.js';
import jquery from 'jquery';

let imgUrlCache = []


/*************对显示的数据做初始化的一些配置。主要是Markdown的处理 **/
let renderer = new Marked.Renderer();
renderer.headerIdPrefix = 0;
renderer.heading = function (text, level, raw) {
  return '<h' + level + ' id="' + (this.headerIdPrefix++) + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '" class="content">' +
    text +
    '</h' + level + '>\n';
}
renderer.link = function (href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a target="_blank" href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

/* renderer.image = function (href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + `https://raw.githubusercontent.com/ShoneSingLone/GitBook/master/` + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
}; */

renderer.image = function (href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  imgUrlCache.push({
    title: title || Date.now(),
    href
  })
  out += this.options.xhtml ? '/>' : '>';
  return out;
};


Marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    code = Highlight.highlightAuto(code).value;
    return code;
  }
});
/***************************************** */







const state = {
  noMore: false,
  articleList: [],
  limit: 4,
  movingDirectionY: -1
}
const getters = {
  articleList(state) {
    return state.articleList
  },
  noMore(state) {
    return state.noMore
  },
  movingDirectionY(state) {
    return state.movingDirectionY
  },
}
const actions = {
  async setMovingDirectionY({
    commit
  }, movingDirectionY) {
    commit("setMovingDirectionY", movingDirectionY);
  },
  async getArticleList({
    commit
  }, {
    url,
    sort
  }) {
    let currentLength = state.articleList.length;

    let skip = (currentLength / state.limit) * state.limit;
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
        let originArticles = res.data;
        if (originArticles.length === 0) commit("setArticleNoMore");
        let articleArray = originArticles.map((originArticle) => {
          let content = Marked(originArticle.body);
          console.log(imgUrlCache);
          let html = jquery(content).html();
          let text = jquery(content).text();
          let desc = text.length > 120 ? text.substring(0, 120) + "..." : text;
          return {
            imgUrl: "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg",
            desc,
            html,
            content, //由markdown转换为HTML的字符
            imgUrlCache,
            ...originArticle
          }
        });

        commit('setArticleList', articleArray);
      }
    } catch (error) {
      console.dir(error)
    }
  },
}
const mutations = {
  setMovingDirectionY(state,
    movingDirectionY
  ) {
    state.movingDirectionY = movingDirectionY
  },
  setArticleNoMore(state) {
    state.noMore = true;
  },
  setArticleList(state,
    articleArray
  ) {
    state.articleList = [...state.articleList, ...articleArray];
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}