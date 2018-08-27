<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "bs-row",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" >
@import "bootstrap/variables";
@import "bootstrap/mixins";
// Row
//
// Rows contain and clear the floats of your columns.
.row {
  @include make-row;
}
</style>
