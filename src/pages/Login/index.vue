<template>
  <!-- <container>
    <row>
      <div class="col-md-8 col-md-offset-2">
        <panel id="login-panel">
          <section class="header">
            <h1>Brumaire</h1>
          </section>
          <form class="form-signin">
            <h2 class="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <div class="line"></div>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            <div class="line"></div>
            <button class="btn btn-lg btn-primary btn-block">Sign in</button>
          </form>
        </panel>
      </div>
    </row>
    <row>
      <div class="col-md-8 col-md-offset-2">
        <panel id="login-panel-3rd" :options="{haveHeading:true}">
          <template slot="heading">
            目前没开发注册功能，只能GitHub账号登录
          </template>
          <section class="logo-wrapper">
            <a href="javascript:void(0)" class="btn btn-default raised circle github-logo" @click="getAuthorization">
            </a>
          </section>
        </panel>
      </div>
    </row>
  </container> -->
</template>

<script>
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
  components: {},
  data() {
    return {};
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
    }
  }
};
</script>

<style lang="scss" scoped>
#login-panel {
  margin-top: 3rem;
  .header {
    // outline: 1px solid rebeccapurple;
    text-align: center;
    width: 150px;
    height: 150px;
    margin: 1rem auto 0;
    padding-top: 74px;
    fill: currentColor;
    background: url("./logo.svg") top center / 10rem 10rem no-repeat;
  }
  .line {
    height: 1rem;
  }
}

#login-panel-3rd {
  text-align: left;
  .logo-wrapper {
    text-align: center;
    .github-logo {
      // outline: 1px solid rebeccapurple;
      height: 6rem;
      width: 6rem;
      background: url("./github.svg") center center / 5rem 5rem no-repeat;
    }
  }
}
</style>
