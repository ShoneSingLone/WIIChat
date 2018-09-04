<template>
  <transition name="fade">
    <div class="article-wrapper">
      <c-container class="article hide" :style="containerStyle" @scroll="articleScroll">
        <transition name="fade-cross">
          <c-row class="article" v-show="articleList&&articleList.length>0">
            <c-col :options="colOptions" v-for="(article, index) in articleList" :key="index">
              <c-card :options="cardOptions" class="article-card">
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
        <transition name="fade-cross">
          <!-- <c-row class="skeleton"> -->
          <c-row class="skeleton" v-show="articleList&&articleList.length<1">
            <c-col :options="colOptions" v-for="(item, index) in 4" :key="index">
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
      </c-container>
      <c-detail v-show="true" :article="detailArticle">
        <!-- <c-detail v-show="isShowDetail"> -->
      </c-detail>
    </div>
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
      isShowDetail: false,
      detailArticle: {},
      isPullUpTrigger: false,
      msg: "",
      colOptions: { class: { md: { colspan: 4 } } },
      cardOptions: { class: { radius: true } },
      containerStyle: {
        height: "100%",
        "padding-top": `${this.toolHeight}px`,
        "padding-bottom": `${this.navHeight}px`
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
      "movingDirectionY"
    ]),
    pullUpTips() {
      return this.noMore
        ? TIPS_PULLUP_NOMORE
        : this.isPullUpTrigger ? TIPS_PULLUP_TRIGGER : TIPS_PULLUP_BEFORE;
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
    getMoreArticle(event) {
      this.isPullUpTrigger = true;
      this.getArticleList({
        url: this.hostName,
        sort: { updated_at: -1 }
      });
    },
    articleScroll(event) {
      let { scrollHeight, scrollLeft, scrollTop, scrollWidth } = event.target;
      this.setArticleScroll({
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth
      });
    },
    showDetail(article, index) {
      this.isShowDetail = true;
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
      console.log("count", count++);
      this.containerStyle =
        newV === 1
          ? {
              height: "100%",
              "padding-top": `1rem`,
              "padding-bottom": `1rem`
            }
          : {
              height: "100%",
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
  .article {
    // outline: 1rem solid rebeccapurple;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 1s;
    // color: #337ab7;
    .skeleton {
      &.row {
        margin-left: 0;
        // outline: 1px solid rebeccapurple;
      }
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
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
        .header {
          // outline: 1px solid rebeccapurple;
          height: 3rem;
          background-color: $skeleton-nomarl;
        }
        .body {
          // outline: 1px solid rebeccapurple;
          background-color: $skeleton-nomarl;
          height: 8rem;
        }
        .footer {
          // outline: 1px solid rebeccapurple;
          background-color: $skeleton-nomarl;
          width: 80%;
          height: 4rem;
        }
      }
    }
    .pulldown-wrapper {
      // outline: 1px solid rebeccapurple;
      text-align: center;
    }
    .article-card {
      background-color: white;
      .header {
        margin: 0 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        text-align: center;
        color: white;
        // color: $brand-primary;
        font-weight: 700;
        text-shadow: 0.1rem 0.1rem 0.1rem black;
        // outline: 1px solid rebeccapurple;
        line-height: 5rem;
        // background: url("https://user-images.githubusercontent.com/9244211/43367698-dc44e8cc-9383-11e8-9d41-57667d2b51f9.png");
      }
      .open {
        animation: zoomIn 3s;
      }
      .body {
        .read-more-wrapper {
          text-align: right;
        }
      }
    }

    .pullup-wrapper {
      // outline: 1px solid rebeccapurple;
      text-align: center;
      // transform: translateY(100%);
      transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);
      margin: 2rem 0 2rem 0;
      .refresh {
        animation: bounceIn 2s infinite alternate;
      }
    }
  }
}
</style>
