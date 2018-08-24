<template>
  <div class="panel panel-default">
    <div v-if="options&&options.haveHeading" class="panel-heading">
      <slot name="heading"></slot>
    </div>
    <div class="panel-body">
      <slot> </slot>
    </div>
    <div v-if="options&&options.haveFooter" class="panel-footer">
      <slot name='footer'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "panel",
  components: {},
  props: ["options"],
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
