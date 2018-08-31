<template>
  <transition name="s-fade">
    <c-container class="article wrapper" :style="containerStyle">
      <c-row>
        <c-col :options="colOptions" v-for="(item, index) in 100" :key="index">
          <c-card>
            <h3 slot="header">
              <a href="javascript:void(0)" @click="scrollRe(item, index)">On the road again</a>
            </h3>
            is a card witch show some article's infomation
          </c-card>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters } from "vuex";
let dateTest = 0;

const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-scroll": () => import(/* webpackChunkName: "c-scroll" */ "@cps/Scroll"),
  "c-card": () => import(/* webpackChunkName: "c-card" */ "@cps/Card")
};

export default {
  name: "Article",
  mounted() {
    console.time("Article mounted");
    dateTest = Date.now();
  },
  data() {
    return {
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
    ...mapGetters("home", [
      "homeHeight",
      "toolHeight",
      "navHeight",
      "isInitCompleted"
    ])
  },
  methods: {
    scrollRe(item, index) {
      console.log("click");
    }
  },
  watch: {
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
                pullDownRefresh: {
                  threshold: 50,
                  stop: 20
                },
                pullUpLoad: {
                  threshold: 50
                }
              })
            );
            this.scroll.on("beforeScrollStart", pos => {
              console.log("beforeScrollStart", pos);
            });
            this.scroll.on("scrollStart", pos => {
              console.log("scrollStart", pos);
            });
            this.scroll.on("scroll", pos => {
              console.log("scroll", pos);
            });
            this.scroll.on("touchEnd", pos => {
              console.log("touchEnd", pos);
            });
            this.scroll.on("scrollCancel", pos => {
              console.log("scrollCancel", pos);
            });
            this.scroll.on("pullingDown", pos => {
              console.log("pullingDown", pos);
            });
            this.scroll.on("pullingUp", pos => {
              console.log("pullingUp", pos);
            });
            this.scroll.on("refresh", pos => {
              console.log("refresh", pos);
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
    height: 670px;
    overflow: visible;
    color: #337ab7;
  }
}
</style>
