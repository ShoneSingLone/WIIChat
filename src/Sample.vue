<template>
  <transition :name="transitionName">

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
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("ScrollY mounted");
  },
  props: {},
  data() {
    return { transitionName: "" };
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" scoped>
</style>
