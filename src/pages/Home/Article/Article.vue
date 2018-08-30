<template>
  <c-container class="article wrapper" :style="{height:homeHeight+'px'}">
    <c-row v-on:mounted="rowMounted">
      <c-col :options="colOptions" v-for="(item, index) in 100" :key="index" v-on:mounted="colMounted">
        <div @click="scrollRe(item, index)">s-col{{index}}-{{msg}}</div>
      </c-col>
    </c-row>
  </c-container>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters } from "vuex";

const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-scroll": () => import(/* webpackChunkName: "c-button" */ "@cps/Scroll")
};

let isFirst = true;
export default {
  name: "Article",
  metaInfo: {
    title: "Article",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
    ]
  },
  mounted() {
    console.log("Article mounted");
  },
  data() {
    return {
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
  computed: { ...mapGetters("home", ["homeHeight"]) },
  methods: {
    scrollRe(item, index) {
      console.log("click");

      if (isFirst) {
        this.scroll.scrollTo(50, 100);
      }
      isFirst = false;
    },
    rowMounted(rowEle) {
      let vm = this;
      setTimeout(() => {
        vm.$set(
          this,
          "scroll",
          new BScroll(vm.$el, {
            startX: 0,
            startY: 0,
            probeType: 1,
            click: true,
            mouseWheel: {
              speed: 2,
              invert: false,
              easeTime: 300
            }
          })
        );
        vm.scroll.on("scroll", pos => {
          console.log("scroll", pos);
        });
        vm.scroll.on("touchEnd", pos => {
          console.log("touchEnd", pos);
        });
        vm.scroll.on("beforeScrollStart", pos => {
          console.log("beforeScrollStart", pos);
        });
        vm.scroll.on("scrollStart", pos => {
          console.log("scrollStart", pos);
        });
        vm.scroll.on("scroll", pos => {
          console.log("scroll", pos);
        });
        vm.scroll.on("scrollCancel", pos => {
          console.log("scrollCancel", pos);
        });
        vm.scroll.on("pullingDown", pos => {
          console.log("pullingDown", pos);
        });
        vm.scroll.on("pullingUp", pos => {
          console.log("pullingUp", pos);
        });
        vm.scroll.on("refresh", pos => {
          console.log("refresh", pos);
        });
      }, 1000 * 1);
    },
    colMounted(colEle) {}
  },
  components
};
</script>

<style lang="scss" scoped>
.article {
  &.wrapper {
    height: 500px;
    overflow: hidden;
  }
}
</style>
