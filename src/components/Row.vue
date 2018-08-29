<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "c-row",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" >
@import "./style/variables";
@import "./style/mixins";
// Row
//
// Rows contain and clear the floats of your columns.
.row {
  @include make-row;
}
</style>
