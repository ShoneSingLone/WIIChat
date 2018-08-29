<template>
  <div class="progress">
    <div class="progress-bar progress-bar-striped active" role="progressbar" :aria-valuenow="width" aria-valuemin="0" aria-valuemax="100" :style="widthStyle">
      <span class="sr-only">{{width}}% Complete</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "c-progress",
  mounted() {},
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    widthStyle() {
      return { width: `${this.width}%` };
    }
  },
  methods: {},
  watch: {}
};
</script>
<style lang="scss">
.modal {
  &.show {
    display: block;
  }
}
</style>
