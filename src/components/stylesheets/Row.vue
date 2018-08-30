<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
let components = {};
export default {
  name: "c-row",
  mounted() {
    console.log("Row mounted");
    //某些需要在mounted之后完成的初始化
    this.$emit("mounted", this.$el);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" >
@import "vm";

// Row
//
// Rows contain and clear the floats of your columns.
.row {
  @include make-row;
}
</style>
