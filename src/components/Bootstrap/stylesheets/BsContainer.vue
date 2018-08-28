<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";

export default {
  name: "bs-container",
  mounted() {
    debugger;
    new MDCRipple(this.$el);
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
@import "bootstrap/variables";
@import "bootstrap/mixins";

// Container widths
//
// Set the container width, and override it for fixed navbars in media queries.
.container {
  min-width: 360px;
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
