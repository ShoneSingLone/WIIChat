<template>
  <div class="progress">
    <div :class="['progress-bar','progress-bar-striped', 'active']" role="progressbar" :aria-valuenow="width" aria-valuemin="0" aria-valuemax="100" :style="[styleWidth]">
      <span class="sr-only">{{width}}% Complete</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "bs-progress",
  components: {},
  props: ["width"],
  data() {
    return {};
  },
  computed: {
    styleWidth: function() {
      return `width: ${this.width}%`;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
