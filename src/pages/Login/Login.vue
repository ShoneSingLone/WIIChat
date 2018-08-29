<template>

  <c-container>
    <c-row>
      <c-col :options="colOptions">
        <section class="card">
          <div class="title-wrapper">
            <h1 class="title">Brumaire</h1>
          </div>
          <form class="form-wrapper">
            <div class="line"></div>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <div class="line"></div>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            <div class="line"></div>
            <c-button :options="{
                        class:{
                          lg:true,
                          primary:true,
                          block:true
                        },
                        type:'submit'
                      }" class="btn">Login in</c-button>
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

import Container from "@cps/Container";
import Row from "@cps/Row";
import Col from "@cps/Col";
import Button from "@cps/Button";
import SigIn from "./SigIn";

let components = {
  "c-container": Container,
  "c-row": Row,
  "c-col": Col,
  "c-button": Button,
  "sigin-form": SigIn
};

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
    //返回的是放在search里的code，为了配合vue-route，两次转换:正常pathname转hash:/#/balabalabala
    if (search && search.length > 0) {
      let href = origin + pathname + "#/error" + search;
      console.log("href", href);
      return (location.href = href);
    }
    next(vm => {
      console.log("next", vm.userInfo);
      if (vm.userInfo) {
        vm.$router.push({ name: "home" });
      }
    });
  },
  created() {},
  mounted() {},
  data() {
    return {
      colOptions: {
        lg: {
          colspan: 8,
          offset: 2
        }
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "redirectUri", "clientId", "githubAuthorizeUrl"])
  },
  methods: {
    ...mapActions([""]),
    toggleRipple(event) {
      console.log(event);
    },
    async getAuthorization(event) {
      console.log(event);
      location.href = this.githubAuthorizeUrl;
    },
    clickSuccess() {
      console.log("getAuthorization");
    }
  },
  components
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
