<template>
  <div id="app">
    <button @click="to" :data-src="transitionName">change</button>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
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
          this.toggle = 1;
          this.$router.push({
            name: "home.about",
            params: {},
            query: {}
          });
        },
        1: () => {
          this.toggle = 2;
          this.$router.push({
            name: "error",
            params: {},
            query: { msg: "msg in search query " }
          });
        },
        2: () => {
          this.toggle = 0;
          this.$router.push({
            name: "login",
            params: {},
            query: {}
          });
        }
      };
      toggle[this.toggle]();

      console.log("event", event.target.dataset.src);
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      console.log("$route change", toDepth, fromDepth);
    }
  }
};
</script>

<style lang="scss" scoped>
html,
body,
#app {
  height: 100%;
  font-size: 16px;
}
</style>
