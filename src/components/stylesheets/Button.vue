<template>
  <button :class="btnClass" :type="type " @click="handleClick " :disabled="disabled ">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "c-button",
  mounted() {
    console.log("Button mounted", this.options);
  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      let classOptions = this.options.class || {};
      return {
        btn: true,
        "btn-default": true,
        "btn-primary": classOptions.primary,
        "btn-success": classOptions.success,
        "btn-info": classOptions.info,
        "btn-warning": classOptions.warning,
        "btn-danger": classOptions.danger,
        "btn-block": classOptions.block,
        "btn-link": classOptions.link,
        "btn-lg": classOptions.lg,
        "btn-sm": classOptions.sm,
        "btn-xs": classOptions.xs,
        elevation: classOptions.elevation
      };
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
@import "vm";

.elevation {
  @include elevation4();
  &,
  &:active,
  &.active {
    &:focus,
    &.focus {
      @include elevation2();
    }
  }

  &:hover,
  &:focus,
  &.focus {
    @include elevation6();
  }

  &:active,
  &.active {
    @include elevation2();
  }
  // [converter] extracted a& to a.btn
}
</style>
