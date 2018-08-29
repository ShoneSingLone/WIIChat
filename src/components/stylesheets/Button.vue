<template>
  <button class="btn btn-default" :class="btnClass" :type="type" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "c-button",
  mounted() {
    console.log("mounted", this.options);
  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    btnClass() {
      if (this.options && this.options.class) {
        return {
          "btn-primary": this.options.class.primary,
          "btn-success": this.options.class.success,
          "btn-info": this.options.class.info,
          "btn-warning": this.options.class.warning,
          "btn-danger": this.options.class.danger,
          "btn-block": this.options.class.block
        };
      } else {
        return {
          ".btn-primary": true
        };
      }
    },
    type() {
      if (this.options && this.options.type) {
        return this.options.type;
      } else {
        return "button";
      }
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      this.$emit("click", event);
    }
  }
};
</script>
<style lang="scss">
</style>
