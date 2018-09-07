<template>
  <transition :name="transitionName">
    chat
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "chat",
  mounted() {
    //某些需要在mounted之后完成的初始化
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("ScrollY mounted");
  },
  beforeRouteEnter: (to, from, next) => {
    console.warn("beforeRouteEnter Chat");
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next(vm => {
      vm.setShowToolBar(true);
      vm.setShowNavBar(true);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.warn("beforeRouteUpdate Chat");
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.warn("beforeRouteLeave Chat");
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  props: {},
  data() {
    return { transitionName: "" };
  },
  computed: {},
  methods: {
    ...mapActions("home", ["setShowToolBar", "setShowNavBar"])
  },
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col")
  }
};
</script>

