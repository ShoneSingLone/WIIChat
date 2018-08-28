<template>

  <container>
    <row>
      <bs-col :options="colOptions">
        <card :options="{

        }" id="login-card">
          <section class="header">
            <h1 class="title">Brumaire</h1>
          </section>
          <sigin-form></sigin-form>
          <div class="logo-wrapper">
            <mdc-button class="github-logo button--raised" @click.native="clickSuccess"></mdc-button>
          </div>
        </card>
      </bs-col>
    </row>
  </container>
</template>

<script>
import { Layout, Card, Button } from "@cpms";
import SigIn from "./SigIn";

import { mapGetters, mapActions } from "vuex";

let components = {
  container: Layout.Container,
  row: Layout.Row,
  "bs-col": Layout.Col,
  Card,
  "sigin-form": SigIn,
  "mdc-button": Button
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
        md: {
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
#login-card {
  margin-top: 3rem;
  padding: 1rem;
  .header {
    position: relative;
    // outline: 1px solid rebeccapurple;
    text-align: center;
    width: 12rem;
    height: 12rem;
    margin: 1rem auto 0;
    // padding-top: 74px;
    fill: currentColor;
    background: url("./logo.svg") top center / 10rem 10rem no-repeat;
    .title {
      position: absolute;
      bottom: 0;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
  .logo-wrapper {
    // outline: 1px solid blue;
    text-align: center;
    .github-logo {
      // outline: 1px solid chocolate;
      display: inline-block;
      height: 6rem;
      width: 6rem;
      background: url("./github.svg") center center / cover no-repeat;
      border-radius: 50%;
    }
  }
}
.middle {
  margin: 0.5rem 0;
  padding: 0.5rem;
}
#login-card-3rd {
  // outline: 1px solid red;
  position: relative;
  text-align: left;
  height: 10rem;
  padding: 2rem;
}
</style>
