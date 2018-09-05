<template>
  <transition name="fade">
    <c-container class="article-wrapper">
      <!-- Article Skeleton -->
      <transition name="fade-cross">
        <c-row class="skeleton" v-show="!isShowArticleList" :style="articleStyle">
          <c-col :options="colOptions" v-for="(item, index) in 15" :key="index">
            <c-card :options="cardOptions">
              <div class="header">
              </div>
              <div class="body">
              </div>
              <div class="footer">
              </div>
            </c-card>
          </c-col>
        </c-row>
      </transition>
      <!-- Article Skeleton End-->

      <!-- Article List-->
      <transition name="fade-cross">
        <c-row class="article" v-show="isShowArticleList" :style="articleStyle" @scroll="articleScroll">
          <c-col :options="colOptions" v-for="(article, index) in articleList" :key="index">
            <c-card :options="cardOptions" :class="[{'open':article.open}]">
              <h3 slot="header" class="header" :style="{background:`url(${article.imgUrl}) center center /cover no-repeat`}">
                {{article.title}}
              </h3>
              <div class="body">
                {{article.desc}}
                <div class="read-more-wrapper">
                  <c-button :options="{class:{
                  primary:true,
                  elevation:true
                }}" @click="showDetail(article, index)">Read</c-button>
                </div>
              </div>
              <div slot="footer">
                <!-- {{(article.updated_at)}} -->
                更新于： {{article.updated_at|articleUpdatedAt}}
              </div>
            </c-card>
          </c-col>
          <c-col :options="colOptions" class="pullup-wrapper">
            <c-button :options="{class:{
                              primary:true,
                              elevation:true,
                              block:true
                }}" @click="getMoreArticle" :disabled="noMore" :class="[{'refresh':isPullUpTrigger}]">
              {{pullUpTips}}
            </c-button>
          </c-col>
        </c-row>
      </transition>
      <!-- Article List End-->

      <!-- Article Detail -->
      <transition name="detail-slide">
        <c-row class="detail" :style="detailStyle" v-show="isShowDetail" @scroll="detailScroll" ref="detail">
          <c-col :options=" { class: { md: { colspan: 8, offset: 2 } } }">
            <c-card>
              <div class="detail-content" v-html="detailArticle.content"></div>
            </c-card>
          </c-col>
        </c-row>
      </transition>
      <!-- Article Detail End-->

    </c-container>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";
let count = 0;

// let TIPS_PULLDOWN_BEFORE = "继续下拉以刷新";
let TIPS_PULLUP_BEFORE = "点击以加载更多内容";
// let TIPS_PULLDOWN_TRIGGER = "正在刷新...";
let TIPS_PULLUP_TRIGGER = "正在加载...";
let TIPS_PULLUP_NOMORE = "没有更多数据了";

export default {
  name: "Article",
  created() {
    if (this.articleList.length < 1) {
      console.time("getArticleList");
      this.getArticleList({
        url: this.hostName,
        sort: { updated_at: -1 }
      });
      console.timeEnd("getArticleList");
    }
  },
  mounted() {
    console.log("Article mounted");
    setTimeout(() => {
      this.$emit("mounted", this.$el);
    }, 30);
  },
  beforeRouteEnter: (to, from, next) => {
    let { query, params } = to;
    next(vm => {
      vm.setArticleStyle(vm.movingDirectionY);
      if (query.id && params.article && params.article.id === query.id) {
        next();
      } else {
        vm.$router.push({
          name: "home.article"
        });
      }
    });
  },
  data() {
    return {
      detailArticle: {},
      isPullUpTrigger: false,
      msg: "",
      colOptions: { class: { md: { colspan: 4 } } },
      cardOptions: { class: { radius: true } },
      articleStyle: {
        "padding-top": 0,
        "padding-bottom": 0
      },
      isShowDetail: false
    };
  },
  computed: {
    ...mapGetters(["hostName", "appHeight", "appWidth"]),
    ...mapGetters("home", [
      "homeHeight",
      "toolHeight",
      "navHeight",
      "isInitCompleted",
      "currentShow"
    ]),
    ...mapGetters("article", [
      "articleList",
      "noMore",
      "articleScrollY",
      "articleScrollYMax",
      "movingDirectionY"
    ]),
    pullUpTips() {
      return this.noMore
        ? TIPS_PULLUP_NOMORE
        : this.isPullUpTrigger ? TIPS_PULLUP_TRIGGER : TIPS_PULLUP_BEFORE;
    },
    isShowArticleList() {
      return this.articleList && this.articleList.length > 0;
    },
    detailStyle() {
      return {
        height: `${this.appHeight}px`,
        // width: `${this.appWidth}px`,
        "margin-top": `${this.toolHeight}px`,
        "padding-bottom": `${this.toolHeight}px`
      };
    }
  },
  filters: {
    articleUpdatedAt(updated) {
      return dayjs(updated).format("YYYY年MM月DD日");
    }
  },
  methods: {
    ...mapActions("article", [
      "getArticleList",
      "setMovingDirectionY",
      "setArticleScroll"
    ]),
    ...mapActions("home", [
      "setCurrentShow",
      "setShowToolBar",
      "setShowNavBar"
    ]),
    detailScroll(event) {
      // console.log(this.$refs.detail);
    },
    setArticleStyle(movingDirectionY) {
      this.articleStyle =
        movingDirectionY === 1
          ? {
              height: `${this.appHeight}px`,
              // width: `${this.appWidth}px`,
              "padding-top": `1rem`,
              "padding-bottom": `1rem`
            }
          : {
              height: `${this.appHeight}px`,
              // width: `${this.appWidth}px`,
              "margin-top": `${this.toolHeight}px`,
              "margin-bottom": `${this.navHeight}px`
            };
    },
    getMoreArticle(event) {
      this.isPullUpTrigger = true;
      this.getArticleList({
        url: this.hostName,
        sort: { updated_at: -1 }
      });
    },
    articleScroll(event) {
      console.log("articleScroll");
      let { scrollHeight, scrollLeft, scrollTop, scrollWidth } = event.target;
      this.setArticleScroll({
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth
      });
    },
    showDetail(article, index) {
      this.detailArticle = article;
      // 只是一个专场动画
      article.open = true;
      this.$set(this.articleList, index, article);
      setTimeout(() => {
        article.open = false;
        this.$set(this.articleList, index, article);
      }, 1000 * 2);

      setTimeout(() => {
        this.$router.push({
          name: "home.article.detail",
          query: {
            id: article.id
          },
          params: {
            article
          }
        });
      }, 30);
      // this.setCurrentShow("home.article.detail");
    }
  },
  watch: {
    detailArticle(newV, oldV) {
      // 如果是新的，scrollTop=0
      setTimeout(() => {
        this.$refs.detail.$el.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 30);
    },
    currentShow(currentShow, oldV) {
      console.log(currentShow, oldV);
      this.isShowDetail = currentShow === "home.article.detail";
      if (this.isShowDetail) {
        this.setShowToolBar(true);
        this.setShowNavBar(false);
      }
    },
    articleList(newV, oldV) {
      this.isPullUpTrigger = false;
      // console.log("模拟数据");
      // this.detailArticle = newV.length > 0 ? newV[0] : {};
    },
    articleScrollY(newV, oldV) {
      this.setMovingDirectionY(newV - oldV > 0 ? 1 : -1);
    },
    movingDirectionY(newV, oldV) {
      console.log("count", count++, newV);
      // 1是向下滑动的意思
      this.setArticleStyle(newV);
    }
  },
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
    "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
    "c-scroll": () => import(/* webpackChunkName: "c-scroll" */ "@cps/Scroll"),
    "c-card": () => import(/* webpackChunkName: "c-card" */ "@cps/Card"),
    "c-bubble": () => import(/* webpackChunkName: "c-bubble" */ "@cps/Bubble"),
    "c-detail": () => import(/* webpackChunkName: "c-bubble" */ "./Detail")
  }
};
</script>

<style lang="scss" >
@import "../../../components/stylesheets/vm";
.article-wrapper,
.skeleton,
.detail {
  height: 100%;
  overflow: hidden;
}
.article-wrapper {
  .hide {
    display: none;
  }
  .skeleton {
    .card {
      background-color: white;
      div {
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        &:last-child {
          margin-bottom: 0;
        }
      }

      .header,
      .body,
      .footer {
        background-color: $skeleton-nomarl;
      }

      .header {
        height: 3rem;
      }
      .body {
        height: 8rem;
      }
      .footer {
        width: 80%;
        height: 4rem;
      }
    }
  }

  .article {
    position: relative;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    // transition: all 0.3s;
    background-color: white;

    .card {
      background-color: white;
      &.open {
        animation: zoomOutDown 1s;
      }
      .header {
        margin-top: 1rem;
        border-radius: 1rem 1rem 0 0;
        text-align: center;
        color: white;
        font-weight: 700;
        text-shadow: 0.1rem 0.1rem 0.1rem black;
        line-height: 5rem;
      }

      .body {
        .read-more-wrapper {
          text-align: right;
        }
      }
    }
    .pullup-wrapper {
      margin-top: 1rem;
      text-align: center;
      transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);

      .refresh {
        animation: bounceIn 2s infinite alternate;
      }
    }
  }

  .detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-left: 0; //因为absolute的关系,修复container padding 15 row margin -15的问题
    z-index: 1;
    overflow-y: scroll;
    background-color: white;

    .detail-content {
      h1,
      h2,
      h3,
      h4 {
        text-align: center;
      }
      h2 {
        font-size: 2rem;
        ~ p {
          @include elevation2();
          padding: 1rem;
          border-radius: 1rem;
          text-indent: 2rem;
          a[href^="htt"] {
            display: inline-block;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          img {
            display: inline-block;
            margin-left: -2rem; //修复text-indent
            border-radius: 1rem;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
