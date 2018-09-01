<template>
  <transition name="fade">
    <c-container class="article wrapper" :style="containerStyle">
      <c-row>
        <!-- <c-col :options="colOptions" class="pulldown-wrapper" v-if="isBeforePullDown||isPullDownTrigger">
          <c-card>
            <h4>
              {{bubbleY}}--{{pullDownTips}}--{{isBeforePullDown}}-{{isPullDownTrigger}}
            </h4>
          </c-card>
        </c-col> -->
        <transition-group name="fade">
          <c-col :options="colOptions" v-for="(article, index) in articleList" :key="index">
            <c-card class="article-card">
              <h3 slot="header">
                <a href="javascript:void(0)" @click="scrollRe(article, index)">{{article.title}}</a>
              </h3>
              {{article.desc}}
              <div slot="footer">
                更新时间： {{article.updated_at}}
              </div>
            </c-card>
          </c-col>
        </transition-group>
        <transition :name="pullUpTransitionName">
          <c-col :options="colOptions" v-if="isBeforePullUp||isPullUpTrigger" class="pullup-wrapper">
            <c-card>
              <span>
                {{pullUpTips}}
              </span>
            </c-card>
          </c-col>
        </transition>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters, mapActions } from "vuex";
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
      pullUpTransitionName: "out-up",
      pullDownTips: TIPS_PULLDOWN_BEFORE,
      pullUpTips: TIPS_PULLUP_BEFORE,
      scrollPos: { x: 0, y: 0 },
      isPullUpTrigger: false,
      isPullDownTrigger: false,
      containerStyle: { height: "550px", "margin-top": "50px" },
      msg: "",
      scroll: {},
      colOptions: {
        class: {
          md: {
            colspan: 4
          }
        }
      }
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
      if (this.scrollPos.y < this.scroll.maxScrollY - 25) {
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
    scrollRe(article, index) {
      this.bubbleY++;
      console.log("click", article, index);
    }
  },
  watch: {
    articleList(newV, oldV) {
      console.log("articleList", newV);
      this.scroll.finishPullUp();
      this.isPullUpTrigger = false;
      this.pullUpTips = TIPS_PULLUP_BEFORE;
      setTimeout(() => {
        this.scroll.refresh();
      }, 30);
    },
    isInitCompleted(newV) {
      if (newV) {
        this.containerStyle = {
          height:
            parseInt(this.homeHeight - this.toolHeight - this.navHeight) + "px",
          "margin-top": this.toolHeight + "px"
        };
        this.$nextTick(() => {
          setTimeout(() => {
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
                debugger;
                this.pullUpTips = TIPS_PULLUP_NOMORE;
                setTimeout(() => {
                  this.scroll.finishPullUp();
                  this.isPullUpTrigger = false;
                }, 1000 * 3);
              } else {
                this.pullUpTips = TIPS_PULLUP_TRIGGER;
                this.getArticleList({
                  url: this.hostName,
                  sort: { updated_at: -1 }
                });
              }
            });
          }, 1000 * 0.02);
        });
        console.timeEnd("Article mounted");

        console.log(Date.now() - dateTest);
      }
    }
  },
  components
};
</script>

<style lang="scss" scoped>
.article {
  &.wrapper {
    // outline: 1px solid rebeccapurple;
    // position: relative;
    height: 670px;
    overflow: visible;
    // color: #337ab7;
    .pulldown-wrapper {
      // outline: 1px solid rebeccapurple;
      text-align: center;
    }
    .article-card {
      background-color: white;
    }

    .pullup-wrapper {
      // outline: 1px solid rebeccapurple;
      text-align: center;
    }
  }
}
</style>
