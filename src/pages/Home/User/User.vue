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

          <c-button v-if="userInfo" class="logout" :options="{class:{
                  danger:true,
                  elevation:true,
                  block:true
                }}" @click="clickLogout">logout</c-button>
          <section class="card" v-else>
            <span class="form-signin-heading">没开发注册功能，目前只能用GitHub授权登录</span>
            <div class="logo-wrapper">
              <a href="javascript:void(0);" class="github-logo circle" @click="getAuthorization"></a>
            </div>
          </section>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

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
  props: {},
  data() {
    return {
      transitionName: "",
      colOptions: { class: { md: { colspan: 8, offset: 2 } } },
      cardOptions: { class: { radius: true } }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "githubAuthorizeUrl"]),
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
    ...mapActions("home", ["setShowToolBar", "setShowNavBar"]),
    ...mapMutations(["logout"]),
    clickLogout() {
      console.log(this.userInfo);
      this.logout();
    },
    getAuthorization() {
      window.open(this.githubAuthorizeUrl);
    }
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
