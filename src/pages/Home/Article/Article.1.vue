<template>
  <transition name="fade">
    <!-- <c-container class="article-wrapper" :style="containerStyle" @scroll="articleScroll"> -->
    <c-container class="article-wrapper" :style="containerStyle" @scroll="articleScroll">

      <!-- Article Skeleton -->
      <transition name="fade-cross">
        <c-row class="skeleton" v-show="!isShowArticleList">
          <c-col :options="colOptions" v-for="(item, index) in 10" :key="index">
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
        <c-row class="article" v-show="isShowArticleList">
          <c-col :options="colOptions" v-for="(article, index) in articleList" :key="index">
            <c-card :options="cardOptions">
              <h3 slot="header" :class="['header',{'open':article.open},{'close':!article.open}]" :style="{background:`url(${article.imgUrl}) center center /cover no-repeat`}">
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
      <transition name="fade-cross">
        <c-row class="detail-wrapper" v-show="isShowDetail">
          <c-col>
            <c-card>
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
  data() {
    return {
      detailArticle: {},
      isPullUpTrigger: false,
      msg: "",
      colOptions: { class: { md: { colspan: 4 } } },
      cardOptions: { class: { radius: true } },
      containerStyle: {
        "padding-top": 0,
        "padding-bottom": 0
      },
      detailStyle: {
        "margin-top": 0
      }
    };
  },
  computed: {
    ...mapGetters(["hostName", "appHeight"]),
    ...mapGetters("home", [
      "homeHeight",
      "toolHeight",
      "navHeight",
      "isInitCompleted"
    ]),
    ...mapGetters("article", [
      "articleList",
      "noMore",
      "articleScrollY",
      "articleScrollYMax",
      "movingDirectionY",
      "isShowDetail"
    ]),
    pullUpTips() {
      return this.noMore
        ? TIPS_PULLUP_NOMORE
        : this.isPullUpTrigger ? TIPS_PULLUP_TRIGGER : TIPS_PULLUP_BEFORE;
    },
    isShowArticleList() {
      return this.articleList && this.articleList.length > 0;
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
      "setArticleScroll",
      "setShowDetail"
    ]),
    getMoreArticle(event) {
      this.isPullUpTrigger = true;
      this.getArticleList({
        url: this.hostName,
        sort: { updated_at: -1 }
      });
    },
    articleScroll(event) {
      debugger;
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
      this.setShowDetail(true);
      /*       this.$el.scrollTo({
        top: 500,
        behavior: "smooth"
      }); */

      article.open = !article.open;
      this.detailArticle = article;
      console.log("click", article, index);
    }
  },
  watch: {
    articleList(newV, oldV) {
      this.isPullUpTrigger = false;
      console.log("模拟数据");
      this.detailArticle = newV.length > 0 ? newV[0] : {};
    },
    articleScrollY(newV, oldV) {
      this.setMovingDirectionY(newV - oldV > 0 ? 1 : -1);
    },
    movingDirectionY(newV, oldV) {
      console.log("count", count++, newV);
      this.containerStyle =
        newV === 1
          ? {
              "padding-top": `1rem`,
              "padding-bottom": `1rem`
            }
          : {
              "margin-top": `${this.toolHeight}px`,
              "margin-bottom": `${this.navHeight}px`
            };
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

<style lang="scss" scoped>
@import "../../../components/stylesheets/vm";
.article-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .hide {
    display: none;
  }
  .skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-left: 0; //因为absolute的关系,修复container padding 15 row margin -15的问题
    z-index: 1;

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
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 1s;
    background-color: white;
    .pulldown-wrapper {
      text-align: center;
    }
    .card {
      background-color: white;
      .header {
        margin: 0 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        text-align: center;
        color: white;
        font-weight: 700;
        text-shadow: 0.1rem 0.1rem 0.1rem black;
        line-height: 5rem;
      }
      .open {
        animation: zoomIn 3s;
      }
      .body {
        .read-more-wrapper {
          text-align: right;
        }
      }
      .pullup-wrapper {
        text-align: center;
        transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);
        margin: 2rem 0 2rem 0;
        .refresh {
          animation: bounceIn 2s infinite alternate;
        }
      }
    }
  }
}
</style>
