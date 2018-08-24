<template>
  <div id="mobile" class="container">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {},
  data: function() {
    return {
      transitionName: "slide-fade"
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  }
};
</script>

<style lang="scss">
#mobile {
  height: 100%;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.5s 0.5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(0);
  opacity: 0;
}
.slide-fade-enter-to, .slide-fade-leave
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(1);
  opacity: 1;
}
</style>
