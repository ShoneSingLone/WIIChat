<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "c-col",
  mounted() {
    // console.log("Col mounted");
    // 某些需要在mounted之后完成的初始化
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
  },
  props: ["options"],
  data() {
    return {};
  },
  computed: {
    colClass() {
      let classString = "col-md-1";
      let isCompute = !!(this && this.options && this.options.class);
      if (isCompute) {
        let classObj = this.options.class;
        let classArray = [];
        for (let key in classObj) {
          for (let subKey in classObj[key]) {
            if (subKey === "colspan") {
              classArray.push(`col-${key}-${classObj[key][subKey]}`);
            } else {
              classArray.push(`col-${key}-${subKey}-${classObj[key][subKey]}`);
            }
          }
        }
        classString = classArray.join(" ");
      }
      console.log("col class String", classString);
      return classString;
    }
  },
  methods: {},
  components: {}
};
</script>

