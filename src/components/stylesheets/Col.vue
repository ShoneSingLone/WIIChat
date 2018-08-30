<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "c-col",
  mounted() {
    // console.log("Col mounted");
    // 某些需要在mounted之后完成的初始化
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
  },
  props: ["options"],
  data() {
    return {};
  },
  computed: {
    colClass() {
      let classString = "col-md-1";
      let isCompute = !!(this && this.options && this.options.class);
      if (isCompute) {
        let classObj = this.options.class;
        let classArray = [];
        for (let key in classObj) {
          for (let subKey in classObj[key]) {
            if (subKey === "colspan") {
              classArray.push(`col-${key}-${classObj[key][subKey]}`);
            } else {
              classArray.push(`col-${key}-${subKey}-${classObj[key][subKey]}`);
            }
          }
        }
        classString = classArray.join(" ");
      }
      console.log("col class String", classString);
      return classString;
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
@import "vm";

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
