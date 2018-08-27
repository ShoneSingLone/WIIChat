<template>
  <div id="app">
    <md-button @click.native="to" :data-src="transitionName">{{transitionName}}</md-button>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { Button } from "@cpms";

export default {
  name: "root",
  data: function() {
    return {
      transitionName: "fade",
      toggle: 0
    };
  },
  methods: {
    to(event) {
      const toggle = {
        0: () => {
          this.toggle = 2;
          this.$router.push({
            name: "home",
            params: {},
            query: { path: "home" }
          });
        },
        1: () => {
          this.toggle = 0;
          this.$router.push({
            name: "error",
            params: {},
            query: { msg: Date.now() }
          });
        },
        2: () => {
          this.toggle = 1;
          this.$router.push({
            name: "login",
            params: {},
            query: { path: "login" }
          });
        }
      };
      toggle[this.toggle]();
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      console.log("$route change", toDepth, fromDepth);
    }
  },
  components: {
    "md-button": Button
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 16px;
}
* {
  outline: 1px solid rebeccapurple;
}
</style>
