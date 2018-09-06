<template>

  <c-container>
    <c-row>
      <c-col :options="colOptions">
        <section class="card">
          <div class="title-wrapper">
            <h1 class="title">Brumaire</h1>
          </div>
          <form class="form-wrapper">
            <c-input :labelOptions="{text:'E-mail',class:{'sr-only':true}}" :placeholder="'E-mail address'" v-model="userName"></c-input>
            <c-input :labelOptions="{text:'E-mail',class:{'sr-only':true}}" :type="'password'" :placeholder="'Password'" v-model="userPwd"></c-input>
            <c-button :options="{ class:{ lg:true, primary:true, block:true } }" class="btn" :disabled="isDisabled" @click="loginByAccount">{{buttonText}}</c-button>
          </form>
        </section>
        <section class="card">
          <span class="form-signin-heading">没开发注册功能，目前只能用GitHub授权登录</span>
          <div class="logo-wrapper">
            <a href="javascript:void(0);" class="github-logo circle" @click="getAuthorization"></a>
          </div>
        </section>
      </c-col>
    </c-row>
  </c-container>
</template>

<script>
// const Button = () => import(/* webpackChunkName: "c-button" */ "@cps/button");

import { mapGetters, mapActions } from "vuex";

export default {
  name: "login",
  metaInfo: {
    title: "Login",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
    ]
    // link: [{ rel: "stylesheet", href: "/css/index.css" }],
    // script: [ { innerHTML: '{"@context":"http://schema.org" }', type: "application/ld+json" } ]
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("beforeRouteEnter");
    let { origin, pathname, search } = location;
    if (search && search.length > 0) {
      //更仔细一点应该是search里面至少是有code或者只有code
      //返回的是放在search里的code，为了配合vue-route，两次转换:正常pathname转hash:/#/balabalabala
      let searchObj = new URLSearchParams(search);
      console.log(searchObj);
      let href = origin + pathname + "#/error" + search;
      console.log("href", href);
      return (location.href = href);
    }
    next(vm => {
      console.log("next", vm.userInfo);
      // 目的是如果这个是因为地址404过来的就应该报一个错
      if (to.redirectedFrom && to.redirectedFrom !== "/") {
        return vm.$router.push({
          name: "error",
          query: { msg: "no way '404:没有这个地址'" }
        });
      }
      if (vm.userInfo) {
        vm.$router.push({ name: "home" });
      }
    });
  },
  created() {},
  mounted() {},
  data() {
    return {
      userName: "",
      userPwd: "",
      isDisabled: false,
      buttonText: "登录",
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
    ...mapGetters([
      "userInfo",
      "loginMsg",
      "redirectUri",
      "clientId",
      "githubAuthorizeUrl"
    ])
  },
  watch: {
    userInfo(newV, oldV) {
      if (newV) {
        this.$router.push({ name: "home" });
      }
    },
    loginMsg(newV, oldV) {
      //account登录失败才会改变loginMsg的状态
      // 漂浮一个提示框
      debugger;
      this.isDisabled = false;
      this.buttonText = "登录";
    },
    userName(newV, oldV) {
      console.log(newV, oldV);
    },
    userPwd(newV, oldV) {
      console.log(newV, oldV);
    }
  },
  methods: {
    ...mapActions(["login"]),
    toggleRipple(event) {
      console.log(event);
    },
    async loginByAccount(event) {
      // validate userName and userPwd
      if (!(this.userName && this.userPwd)) return false;
      this.isDisabled = true;
      this.buttonText = "正在登录...";
      this.login({
        userName: this.userName,
        userPwd: this.userPwd
      });
    },
    async getAuthorization(event) {
      console.log(event);
      location.href = this.githubAuthorizeUrl;
    },
    clickSuccess() {
      console.log("getAuthorization");
    }
  },
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
    "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
    "c-input": () => import(/* webpackChunkName: "c-input" */ "@cps/Input")
  }
};
</script>

<style lang="scss" scoped>
@import "src/components/stylesheets/vm";
.card {
  margin-top: 3rem;
  padding: 1rem;
  @include elevation2();

  .title-wrapper {
    position: relative;
    text-align: center;
    width: 12rem;
    height: 15rem;
    margin: 1rem auto 0;
    fill: currentColor;
    background: url("./logo.svg") top center / 10rem 10rem no-repeat;
    .title {
      position: absolute;
      bottom: 0;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
  .form-wrapper {
    .line {
      height: 1rem;
    }
  }
  .logo-wrapper {
    margin-top: 1rem;
    text-align: center;
    .github-logo {
      display: inline-block;
      border-radius: 50%;
      height: 6rem;
      width: 6rem;
      background: url("./github.svg") center center / cover no-repeat;
      &.circle {
        @include elevationtransition();
        @include elevation4();
        &:hover {
          @include elevation6();
        }
        &:active {
          @include elevation8();
        }
      }
    }
  }
}
.middle {
  margin: 0.5rem 0;
  padding: 0.5rem;
}
</style>
