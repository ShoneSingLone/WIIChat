<template>

  <container>
    <row>
      <c-col :options="colOptions">
        <section class="card">
          <div class="title-wrapper">
            <h1 class="title">Brumaire</h1>
          </div>
          <sigin-form></sigin-form>
          <div class="logo-wrapper">
            <c-button class="github-logo circle" @click="clickSuccess"></c-button>
          </div>
        </section>
      </c-col>
    </row>
  </container>
</template>

<script>
// const Button = () => import(/* webpackChunkName: "c-button" */ "@cps/button");

import { mapGetters, mapActions } from "vuex";

import Container from "@cps/Container";
import Row from "@cps/Row";
import Col from "@cps/Col";
import Input from "@cps/Input";
import Button from "@cps/Button";
import SigIn from "./SigIn";

let components = {
  container: Container,
  row: Row,
  "c-col": Col,
  // Card,
  "sigin-form": SigIn,
  "c-button": Button
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
@import "src/components/style/mixins";

.card {
  margin-top: 3rem;
  padding: 1rem;
  @include elevation2();

  .title-wrapper {
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
      height: 6rem;
      width: 6rem;
      background: url("./github.svg") center center / 5rem 5rem no-repeat;
    }
  }
}
.middle {
  margin: 0.5rem 0;
  padding: 0.5rem;
}
</style>
