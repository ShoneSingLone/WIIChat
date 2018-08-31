<template>
  <div class="home">
    <c-tool-bar v-on:mounted="toolMounted"></c-tool-bar>
    <c-bottom-nav-bar v-on:mounted="navMounted"></c-bottom-nav-bar>
    <!-- 以上position为absolute，不影响布局，但是会影响Vue初始化 -->
    <c-container ref="main">
      <c-row>
        <c-col :options="colOptions">
          <transition :name="transitionName">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </c-col>
      </c-row>
    </c-container>
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
import { mapActions } from "vuex";

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
        md: {
          colspan: 8,
          offset: 2
        }
      }
    };
  },
  computed: {},
  methods: {
    ...mapActions(["setThemeColor"]),
    ...mapActions("home", ["setHomeRect", "setToolBarRect", "setNavBarRect"]),
    toolMounted(toolEle) {
      this.$store;
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
.home {
  height: 100%;
  overflow: hidden;
}
</style>
