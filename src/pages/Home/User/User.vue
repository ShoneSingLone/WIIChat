<template>
  <transition :name="transitionName">
    <c-container>
      <c-row :style="userStyle">
        <c-col :options="colOptions" class="user-wrapper">
          <c-card class="info" :options="cardOptions">
            <div class="avatar" :style="{background:`url(${userInfo.avatar}) center center /cover no-repeat`}"></div>
            <div class="name">
              {{userInfo.name}}
            </div>
          </c-card>
          <c-card class="menu" :options="cardOptions">
            <p>一些其他的信息或者操作</p>
          </c-card>

          <c-button v-show="userInfo" class="logout" :options="{class:{
                  danger:true,
                  elevation:true,
                  block:true
                }}" @click="logout()">Logout</c-button>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user",
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
  },
  beforeRouteEnter: (to, from, next) => {
    console.warn("beforeRouteEnter User");
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next(vm => {
      vm.setShowToolBar(true);
      vm.setShowNavBar(true);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.warn("beforeRouteUpdate User");
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.warn("beforeRouteLeave User");
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  props: {},
  data() {
    return {
      transitionName: "",
      colOptions: { class: { md: { colspan: 4 } } },
      cardOptions: { class: { radius: true } }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapGetters(["hostName", "appHeight", "appWidth"]),
    ...mapGetters("home", ["toolHeight", "navHeight"]),
    userStyle() {
      return {
        height: `${this.appHeight}px`,
        // width: `${this.appWidth}px`,
        "padding-top": `${this.toolHeight}px`,
        "padding-bottom": `${this.navHeight}px`
      };
    }
  },
  methods: {
    ...mapActions("home", ["setShowToolBar", "setShowNavBar"])
  },
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
    "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
    "c-card": () => import(/* webpackChunkName: "c-card" */ "@cps/Card")
  }
};
</script>

<style lang="scss" scoped>
@import "../../../components/stylesheets/vm";

.user-wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  flex-flow: column nowrap;
  .info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    .name {
    }
    .avatar {
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
    }
  }
  .menu {
    flex: 2;
    margin-bottom: 1rem;
  }
  .logout {
    margin-bottom: 1rem;
  }
}
</style>
