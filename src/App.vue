<template>
  <div id="app">
    <!-- <c-button @click.native="to" :data-src="transitionName">{{transitionName}}</c-button> -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <div class="dialog-container">
    </div>

    <div class="loader">
      <!-- Show a spinner or placeholders for content -->
    </div>
  </div>
</template>

<script>
import Button from "@cps/Button";
import { mapActions } from "vuex";
let count = 0;

export default {
  name: "app",
  mounted() {
    this.setAppSize(this.$el.getBoundingClientRect());
    window.onresize = event => {
      this.$nextTick(() => {
        this.setAppSize(this.$el.getBoundingClientRect());
      });
    };
  },
  data: function() {
    return {
      transitionName: "",
      toggle: 0
    };
  },
  methods: {
    ...mapActions(["setAppSize"]),
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
  overflow: hidden;
}
* {
  // outline: 1px solid rebeccapurple;
}
</style>
