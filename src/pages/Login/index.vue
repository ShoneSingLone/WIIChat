<template>
  <container>
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
            没注册，只能GitHub账号登录
          </template>
          <section class="github-logo btn raised circle">
          </section>
        </panel>
      </div>
    </row>
  </container>
</template>

<script>
import container from "@cb/Container";
import row from "@cb/Row";
import panel from "@cb/Panel";

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
    ],
    link: [{ rel: "stylesheet", href: "/css/index.css" }],
    script: [
      {
        innerHTML: '{"@context":"http://schema.org" }',
        type: "application/ld+json"
      }
    ]
  },
  created() {},
  components: {
    container,
    row,
    panel
  },
  data() {
    return {
      optionText: {
        type: "text"
      },
      optionPwd: {
        type: "password"
      }
    };
  },
  computed: {},
  methods: {}
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
  text-align: center;
  .github-logo {
    // outline: 1px solid rebeccapurple;
    background-color: aqua;
    height: 6rem;
    width: 6rem;
    background: url("./github.svg") center center / 5rem 5rem no-repeat;
  }
}
</style>
