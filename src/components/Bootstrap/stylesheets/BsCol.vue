<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "bs-col",
  mounted() {
    let isCompute = !!(this && this.options);
    if (isCompute) {
      let classArray = [];
      for (let key in this.options) {
        for (let subKey in this.options[key]) {
          if (subKey === "colspan") {
            classArray.push(`col-${key}-${this.options[key][subKey]}`);
          } else {
            classArray.push(
              `col-${key}-${subKey}-${this.options[key][subKey]}`
            );
          }
        }
      }
      let classString = classArray.join(" ");
      console.log("classString", classString);
      this.colClass = classString;
    }
    return "col-md-1";
  },
  props: ["options"],
  data() {
    return {
      colClass: ""
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="scss">
@import "bootstrap/variables";
@import "bootstrap/mixins";

// Columns
//
// Common styles for small and large grid columns

@include make-grid-columns;

// Extra small grid
//
// Columns, offsets, pushes, and pulls for extra small devices like
// smartphones.

@include make-grid(xs);

// Small grid
//
// Columns, offsets, pushes, and pulls for the small device range, from phones
// to tablets.

@media (min-width: $screen-sm-min) {
  @include make-grid(sm);
}

// Medium grid
//
// Columns, offsets, pushes, and pulls for the desktop device range.

@media (min-width: $screen-md-min) {
  @include make-grid(md);
}

// Large grid
//
// Columns, offsets, pushes, and pulls for the large desktop device range.

@media (min-width: $screen-lg-min) {
  @include make-grid(lg);
}
</style>
