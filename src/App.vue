<template>
  <div id="app" class="container">
    <!-- <button @click="to" :data-src="transitionName">change</button> -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      transitionName: "slide-fade",
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
            query: { id: "home" }
          });
        },
        1: () => {
          this.toggle = 2;
          this.$router.push({
            name: "home",
            params: {},
            query: {}
          });
        },
        2: () => {
          this.toggle = 0;
          this.$router.push({
            name: "home.about.subAbout",
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
      this.transitionName = toDepth < fromDepth ? "slide-fade" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
