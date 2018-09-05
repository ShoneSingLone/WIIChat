import axios from 'axios';
import Marked from 'marked';
import Highlight from 'highlight.js';
import jquery from 'jquery';

let imgUrlCache = []
let imgUrlCacheIndex = 0;


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
  imgUrlCache[imgUrlCacheIndex] = imgUrlCache[imgUrlCacheIndex] || [];
  imgUrlCache[imgUrlCacheIndex].push({
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
  isShowDetail: false, //是否显示Detail，影响ToolBar的显示，在Home中处理
  limit: 4,
  movingDirectionY: -1,
  scroll: {
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }
}
const getters = {
  articleList(state) {
    return state.articleList;
  },
  isShowDetail(state) {
    return state.isShowDetail;
  },
  noMore(state) {
    return state.noMore;
  },
  movingDirectionY(state) {
    return state.movingDirectionY;
  },
  articleScrollY(state) {
    return state.scroll.top;
  },
  articleScrollYMax(state) {
    return state.scroll.height;
  },
}
const actions = {
  async setArticleScroll({
    commit
  }, scroll) {
    commit("setArticleScroll", scroll);
  },
  async setMovingDirectionY({
    commit
  }, movingDirectionY) {
    commit("setMovingDirectionY", movingDirectionY);
  },
  async setShowDetail({
    commit
  }, isShow) {
    commit("setShowDetail", isShow);
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
      });
      let {
        status,
        data: res
      } = result;
      if (status === 200 && res.success) {
        let originArticles = res.data;
        if (originArticles.length === 0) {
          commit("setArticleNoMore");
        }
        let articleArray = originArticles.map((originArticle, index) => {
          let content = Marked(originArticle.body);
          let html = jquery(content).html();
          let text = jquery(content).text();
          let desc = text.length > 120 ? text.substring(0, 120) + "..." : text;
          return {
            imgUrl: imgUrlCache && imgUrlCache[imgUrlCacheIndex] && imgUrlCache[imgUrlCacheIndex][0] && imgUrlCache[imgUrlCacheIndex][0].href || "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg",
            desc,
            html,
            content, //由markdown转换为HTML的字符
            imgUrlCache: imgUrlCache[imgUrlCacheIndex++],
            ...originArticle
          }
        });

        commit('setArticleList', articleArray);
      }
    } catch (error) {
      console.dir(error)
    }
  },
  async getDetail(article) {
    let content = Marked(article.body);
    let html = jquery(content).html();
    return {
      html,
      content, //由markdown转换为HTML的字符
      ...article
    }
  }
}
const mutations = {
  setArticleScroll(state, {
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth
  }) {
    state.scroll.height = scrollHeight
    state.scroll.left = scrollLeft
    state.scroll.top = scrollTop
    state.scroll.width = scrollWidth
  },
  setArticleNoMore(state) {
    state.noMore = true;
  },
  setMovingDirectionY(state,
    movingDirectionY
  ) {
    state.movingDirectionY = movingDirectionY
  },
  setArticleList(state,
    articleArray
  ) {
    state.articleList = [...state.articleList, ...articleArray];
  },
  setShowDetail(state,
    isShow
  ) {
    state.isShowDetail = isShow;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}