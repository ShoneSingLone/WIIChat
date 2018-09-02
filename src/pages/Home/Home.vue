<template>
  <div class="shell">
    <c-tool-bar v-on:mounted="toolMounted" v-show="showTool"></c-tool-bar>
    <c-bottom-nav-bar v-on:mounted="navMounted" v-show="showNav"></c-bottom-nav-bar>
    <!-- 以上position为absolute，不影响布局，但是会影响Vue初始化 -->
    <div class="main">
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-input": () => import(/* webpackChunkName: "c-input" */ "@cps/Input"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-modals": () => import(/* webpackChunkName: "c-modals" */ "@cps/Modals"),
  "c-tool-bar": () => import(/* webpackChunkName: "c-modals" */ "@cps/ToolBar"),
  "c-bottom-nav-bar": () =>
    import(/* webpackChunkName: "c-modals" */ "@cps/BottomNavBar")
};
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  mounted() {
    console.log("Home mounted");
    this.setHomeRect(this.$el.getBoundingClientRect());
  },
  data() {
    return {
      transitionName: "fade",
      colOptions: {
        class: {
          md: {
            colspan: 8,
            offset: 2
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters("article", ["movingDirectionY"]),
    showTool() {
      // 当滑动的时候有这一种情况还有其他的再说
      return this.movingDirectionY === -1;
    },
    showNav() {
      // 当滑动的时候有这一种情况还有其他的再说
      return this.movingDirectionY === -1;
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      console.log("$route change", toDepth, fromDepth);
      if (toDepth < fromDepth) {
        // 往左：以后可以配置再说
        this.transitionName = "back";
      } else {
        this.transitionName = "forward";
      }
      // 往右
    }
  },
  methods: {
    ...mapActions(["setThemeColor"]),
    ...mapActions("home", ["setHomeRect", "setToolBarRect", "setNavBarRect"]),
    toolMounted(toolEle) {
      this.setToolBarRect(toolEle.getBoundingClientRect());
    },
    navMounted(navEle) {
      this.setNavBarRect(navEle.getBoundingClientRect());
    }
  },
  components
};
</script>

<style lang="scss" scoped>
.shell {
  height: 100%;
  overflow: hidden;
  .main {
    height: 100%;
    overflow: hidden;
  }
}
</style>
