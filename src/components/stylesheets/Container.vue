<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "c-container",
  mounted() {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
@import "vm";


// Container widths
//
// Set the container width, and override it for fixed navbars in media queries.
.container {
  @include container-fixed;

  @media (min-width: $screen-sm-min) {
    width: $container-sm;
  }
  @media (min-width: $screen-md-min) {
    width: $container-md;
  }
  @media (min-width: $screen-lg-min) {
    width: $container-lg;
  }
}

// Fluid container
//
// Utilizes the mixin meant for fixed width containers, but without any defined
// width for fluid, full width layouts.

.container-fluid {
  @include container-fixed;
}
</style>
