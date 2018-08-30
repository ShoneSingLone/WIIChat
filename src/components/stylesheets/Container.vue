<template>
  <div :class="containerClass">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "c-container",
  mounted() {
    //某些需要在mounted之后完成的初始化
    this.$emit("mounted", this.$el);
    console.log("Container mounted");
  },
  components: {},
  props: {
    options: {
      class: {
        type: String
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    containerClass() {
      if (this.options && this.options.class) {
        return "container-fluid";
      }
      return "container";
    }
  },
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
