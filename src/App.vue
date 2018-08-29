<template>
  <div id="app">
    <!-- <c-button @click.native="to" :data-src="transitionName">{{transitionName}}</c-button> -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Button from "@cps/Button";
let count = 0;

export default {
  name: "root",
  data: function() {
    return {
      transitionName: "fade",
      toggle: 0
    };
  },
  methods: {
    to() {
      count++;
      // let routeNameArray = ["error", "components", "login"];
      let routeNameArray = ["components"];
      let subIndex = count % routeNameArray.length;
      this.$router.push({
        name: routeNameArray[subIndex],
        params: {},
        query: { subIndex }
      });
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
    "c-button": Button
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  min-width: 360px;
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 16px;
}
* {
  // outline: 1px solid rebeccapurple;
}
</style>
