<template>
  <transition>

  </transition>
</template>

<script>
const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col")
};

export default {
  name: "",
  mounted() {
    //某些需要在mounted之后完成的初始化
    this.$emit("mounted", this.$el);
    console.log("ScrollY mounted");
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" scoped>
</style>
