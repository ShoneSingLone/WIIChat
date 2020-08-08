<template>
  <div class="progress">
    <div :class="['progress-bar','progress-bar-striped', 'active']" role="progressbar" :aria-valuenow="width" aria-valuemin="0" aria-valuemax="100">
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
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@keyframes indeterminate1 {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0) scaleY(3);
  }
}
.progress {
  height: 12rem;
  .progress-bar {
    width: 100%;
    transform: translateX(-100%);
    animation: indeterminate1 10s ease-in-out infinite;
  }
}
</style>
