<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <div class="dialog-container">
    </div>
    <div class="loader">
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
      transitionName: ""
    };
  },
  methods: {
    ...mapActions(["setAppSize"])
  },
  components: {}
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
</style>
