<template>
  <div class="row" @scroll="handlerScroll">
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
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handlerScroll(event) {
      this.$emit("scroll", event);
    }
  },
  components
};
</script>

