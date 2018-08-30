<template>
  <div class="home">
    <c-tool-bar></c-tool-bar>
    <c-container ref="main">
      <c-row>
        <c-col :options="colOptions">
          <transition name="slide">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </c-col>
      </c-row>
    </c-container>
    <c-bottom-nav-bar></c-bottom-nav-bar>
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

export default {
  name: "home",
  mounted() {},
  data() {
    return {
      colOptions: {
        md: {
          colspan: 8,
          offset: 2
        }
      }
    };
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
}
</style>
