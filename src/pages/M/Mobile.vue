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
  name: "mobile-view",
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
@import "../assets/animation";

#mobile {
  height: 100%;
}
</style>
