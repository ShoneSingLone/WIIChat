<template>
  <transition name="fade">
    <c-container class="detail" :style="detailStyle">
      <c-row>
        <c-col :options="colOptions">
          <div class="content" v-html="article.content"></div>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-card": () => import(/* webpackChunkName: "c-card" */ "@cps/Card")
};

export default {
  name: "detail",
  created() {},
  mounted() {
    this.$route.query.detail = this.article.id;
    console.log("Detail mounted", this.$route);
  },
  asdfasdfasdf: (to, from, next) => {
    next(vm => {
      if (to.params.article) {
        vm.article = to.params.article;
      } else if (to.query.id) {
        vm.article = vm.getArticleById(to.query.id);
      }
      let isFail = !(vm.article && vm.article.id === to.query.id);

      if (isFail) {
        vm.$router.push({
          name: "error",
          query: { msg: "不是没有提供ID，就是没有找到对应文章，反正就是不行" },
          params: {
            redirect: {
              name: "home"
            }
          }
        });
      }
    });
  },
  props: {
    article: Object
  },
  data() {
    return {
      colOptions: { class: { md: { colspan: 4 } } },
      cardOptions: { class: { radius: true } }
    };
  },
  computed: {
    ...mapGetters(["hostName", "appHeight", "appWidth"]),
    detailStyle() {
      return {
        height: `${this.appHeight}px`,
        width: `${this.appWidth}px`
      };
    }
  },
  methods: {
    ...mapActions("article", ["getDetail"]),
    async getArticleById(id) {
      try {
        let { data, status } = await axios({
          method: "post",
          url: this.hostName,
          data: {
            endpoint: "article",
            action: "getArticleById",
            id
          }
        });
        if (status === 200 && data.success) return data.article;
        throw new Error("找不到ID相匹配的article");
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  watch: {},
  components
};
</script>

<style lang="scss" >
@import "../../../components/stylesheets/vm";
.detail {
  position: absolute;
  outline: 1px solid rebeccapurple;
  top: 0;
  left: 0;
  z-index: 3;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  p {
    img {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
