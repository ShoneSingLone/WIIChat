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
import { mapActions, mapMutations } from "vuex";

export default {
  name: "app",
  mounted() {
    this.setAppSize(this.$el.getBoundingClientRect());
    window.onresize = event => {
      this.$nextTick(() => {
        this.setAppSize(this.$el.getBoundingClientRect());
      });
    };
    window.addEventListener("storage", event => {
      try {
        let { key, newValue, oldValue, url } = event;
        let vm = this;
        let strategy = {
          userInfo: () => {
            if (newValue && newValue.length > 0) {
              vm.setUserInfo(JSON.parse(newValue));
            }
          }
        };

        console.warn(
          `from ${url},new key is ${key}, newValue is ${newValue}, old value is ${oldValue}`
        );
        strategy[key]();
      } catch (error) {
        console.log(error);
      }
    });
  },
  data: function() {
    return {
      transitionName: ""
    };
  },
  methods: {
    ...mapActions(["setAppSize"]),
    ...mapMutations(["setUserInfo"])
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
