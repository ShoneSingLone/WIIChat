<template>
  <c-container>
    <c-row ref="wrapper" v-on:mounted="rowMounted">
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions">{{msg}}</c-col>
      <c-col :options="colOptions" v-for="(item, index) in 100" :key="index" v-on:mounted="colMounted">
        <div @click="scrollRe(item, index)">s-col{{index}}</div>
      </c-col>
    </c-row>
  </c-container>
</template>

<script>
import BScroll from "better-scroll";

const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-scroll": () => import(/* webpackChunkName: "c-button" */ "@cps/Scroll")
};

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
  computed: {},
  methods: {
    scrollRe(item, index) {
      console.log("click");
    },
    rowMounted(rowEle) {
      this.$set(
        this,
        "scroll",
        new BScroll(this.$el, {
          probeType: 1,
          click: true,
          scrollX: false,
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          }
        })
      );
      this.scroll.on("scroll", pos => {
        this.msg = "scroll" + pos;
      });
      this.scroll.on("touchEnd", pos => {
        this.msg = "touchEnd" + pos;
      });
      this.scroll.on("beforeScrollStart", pos => {
        this.msg = "beforeScrollStart" + pos;
      });
      this.scroll.on("scrollStart", pos => {
        this.msg = "scrollStart" + pos;
      });
      this.scroll.on("scroll", pos => {
        this.msg = "scroll" + pos;
      });
      this.scroll.on("scrollCancel", pos => {
        this.msg = "scrollCancel" + pos;
      });
      this.scroll.on("pullingDown", pos => {
        this.msg = "pullingDown" + pos;
      });
      this.scroll.on("pullingUp", pos => {
        this.msg = "pullingUp" + pos;
      });
      this.msg = "scroll refres+";
    },
    colMounted(colEle) {}
  },
  components
};
</script>

<style lang="scss" scoped>
.article-list {
  height: 100%;
  overflow: auto;
}
</style>
