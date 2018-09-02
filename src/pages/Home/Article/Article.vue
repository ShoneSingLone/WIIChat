<template>
  <transition name="fade">
    <c-container class="article wrapper" :style="containerStyle">
      <c-row>
        <transition-group name="fade">
          <c-col :options="colOptions" v-for="(article, index) in articleList" :key="index">
            <c-card class="article-card" :options="cardOptions">
              <h3 slot="header" :class="['header',{'open':article.open},{'close':!article.open}]" :style="{background:`url(${article.imgUrl}) center center /cover no-repeat`}">
                {{article.title}}
              </h3>
              <div class="body">
                {{article.desc}}
                <div class="read-more-wrapper">
                  <c-button @click="showDetail(article, index)">Read</c-button>
                </div>
              </div>
              <div slot="footer">
                <!-- {{(article.updated_at)}} -->
                更新于： {{articleUpdatedAt(article.updated_at)}}
              </div>
            </c-card>
          </c-col>
        </transition-group>
        <c-col :options="colOptions" v-show="isBeforePullUp||isPullUpTrigger" :class="['pullup-wrapper',{'refresh':isPullUpTrigger}]">
          <c-card :options="cardOptions">
            <span>
              {{pullUpTips}}
            </span>
          </c-card>
        </c-col>
      </c-row>
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
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

let dateTest = 0;

let TIPS_PULLDOWN_BEFORE = "继续下拉以刷新";
let TIPS_PULLUP_BEFORE = "继续上拉以加载";
let TIPS_PULLDOWN_TRIGGER = "正在刷新...";
let TIPS_PULLUP_TRIGGER = "正在加载...";
let TIPS_PULLUP_NOMORE = "没有更多数据了";

const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-scroll": () => import(/* webpackChunkName: "c-scroll" */ "@cps/Scroll"),
  "c-card": () => import(/* webpackChunkName: "c-card" */ "@cps/Card"),
  "c-bubble": () => import(/* webpackChunkName: "c-bubble" */ "@cps/Bubble")
};

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
    console.time("Article mounted");
    dateTest = Date.now();
  },
  data() {
    return {
      pullDownTips: TIPS_PULLDOWN_BEFORE,
      pullUpTips: TIPS_PULLUP_BEFORE,
      scrollPos: { x: 0, y: 0 },
      isPullUpTrigger: false,
      isPullDownTrigger: false,
      msg: "",
      scroll: {},
      containerStyle: { height: "550px", "margin-top": "50px" },
      colOptions: { class: { md: { colspan: 4 } } },
      cardOptions: { class: { radius: true } }
    };
  },
  computed: {
    ...mapGetters(["hostName"]),
    ...mapGetters("home", [
      "homeHeight",
      "toolHeight",
      "navHeight",
      "isInitCompleted"
    ]),
    ...mapGetters("article", ["articleList", "noMore"]),
    bubbleY() {
      if (this.scrollPos.y > 0) {
        // 在pullDown的范围内
        return Math.abs(this.scrollPos.y);
      } else if (this.scrollPos.y < this.scroll.maxScrollY) {
        //在pullUp的范围内
        return Math.abs(parseInt(this.scroll.maxScrollY - this.scrollPos.y));
      } else {
        return 0;
      }
    },
    isBeforePullUp() {
      if (this.scrollPos.y < this.scroll.maxScrollY) {
        //在pullUp的范围内
        return true;
      } else {
        return false;
      }
    },
    isBeforePullDown() {
      console.log(this.scrollPos.y);
      if (this.scrollPos.y > 0) {
        // 在pullDown的范围内
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions("article", ["getArticleList", "setMovingDirectionY"]),
    showDetail(article, index) {
      article.open = !article.open;
      this.$set(this.articleList, index, article);
      this.$router.push({
        name: "home.article.detail",
        query: {
          id: article.id
        },
        params: {
          article
        }
      });
      console.log("click", article, index);
    },
    articleUpdatedAt(updated) {
      return dayjs(updated).format("YYYY年MM月DD日");
    }
  },
  watch: {
    articleList(newV, oldV) {
      console.log("articleList", newV);
      if (this.scroll && this.scroll.finishPullUp) {
        // 已经至少初始化一次数据之后才有更新操作
        this.scroll.finishPullUp();
        this.isPullUpTrigger = false;
        this.pullUpTips = TIPS_PULLUP_BEFORE;
        setTimeout(() => {
          this.scroll.refresh();
        }, 30);
      }
    },
    isInitCompleted(newV) {
      if (newV) {
        this.containerStyle = {
          height:
            parseInt(this.homeHeight - this.toolHeight - this.navHeight) + "px",
          "margin-top": this.toolHeight + "px"
        };

        this.$set(
          this,
          "scroll",
          new BScroll(this.$el, {
            probeType: 1,
            click: true,
            bounce: {
              top: true,
              bottom: true
            },
            /* pullDownRefresh: {
                  threshold: 50,
                  stop: 50
                }, */
            pullUpLoad: {
              threshold: -80
            },
            // observeDOM: true,
            mouseWheel: {
              speed: 10,
              invert: false,
              easeTime: 300
            }
          })
        );
        setTimeout(() => {
          this.scroll.on("beforeScrollStart", pos => {
            // console.log("beforeScrollStart", pos);
          });
          this.scroll.on("scrollStart", pos => {
            // console.log("scrollStart", pos);
          });
          this.scroll.on("scroll", pos => {
            this.scrollPos.x = parseInt(pos.x);
            this.scrollPos.y = parseInt(pos.y);
          });
          this.scroll.on("touchEnd", () => {
            this.setMovingDirectionY(this.scroll.movingDirectionY);
          });
          this.scroll.on("scrollCancel", pos => {
            // console.log("scrollCancel", pos);
          });
          this.scroll.on("pullingDown", pos => {
            // console.log("pullingDown", pos);
          });
          this.scroll.on("pullingUp", pos => {
            // console.log("pullingUp", pos);
          });
          this.scroll.on("refresh", pos => {
            // console.log("refresh", pos);
          });
          /*   this.scroll.on("pullingDown", pos => {
              console.log("pullingDown", pos);
              this.isPullDownTrigger = true;
              this.pullDownTips = TIPS_PULLDOWN_TRIGGER;
              // 在加载完成后需要初始化
              this.scroll.finishPullDown();
            }); */
          this.scroll.on("pullingUp", pos => {
            this.isPullUpTrigger = true;
            console.log("this.noMore", this.noMore);
            if (this.noMore) {
              this.pullUpTips = TIPS_PULLUP_NOMORE;
              // 模拟后台请求数据的时间3s
              setTimeout(() => {
                debugger;
                this.scroll.finishPullUp();
                this.isPullUpTrigger = false;
                setTimeout(() => {
                  this.scroll.refresh();
                }, 30);
              }, 1000 * 3);
            } else {
              this.pullUpTips = TIPS_PULLUP_TRIGGER;
              this.getArticleList({
                url: this.hostName,
                sort: { updated_at: -1 }
              });
            }
          });
        }, 30);
        console.timeEnd("Article mounted");
      }
    }
  },
  components
};
</script>

<style lang="scss" scoped>
@import "../../../components/stylesheets/vm";
.article {
  &.wrapper {
    // outline: 1px solid rebeccapurple;
    position: relative;
    height: 670px;
    overflow: visible;
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
      z-index: 2;
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
      transform: translateY(200%);
      transition: transform 2s cubic-bezier(0.215, 0.61, 0.355, 1);
      &.refresh {
        transform: translateY(0%);
      }
    }
  }
}
</style>
