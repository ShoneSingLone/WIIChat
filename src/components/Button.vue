<template>
  <div class="btn" :type="type" :class="btnClass" @click="handleClick">
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "c-button",
  mounted() {},
  props: {
    icon: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "button"
    }
  },
  computed: {
    btnClass() {
      return {
        "cube-btn_active": this.active,
        "cube-btn_disabled": this.disabled,
        "cube-btn-inline": this.inline,
        "cube-btn-primary": this.primary,
        "cube-btn-outline": this.outline,
        "cube-btn-outline-primary": this.outline && this.primary,
        "cube-btn-light": this.light
      };
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
@import "src/components/style/index";

.btn {
  display: inline-block;
  margin-bottom: 0; // For input.btn
  font-weight: $btn-font-weight;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
  border: unset;
  outline: unset;
  white-space: nowrap;
  @include elevation2();
  @include elevationtransition();

  &.circle {
    border-radius: 50%;
    outline: unset;
  }

  &:active,
  &.active {
    outline: unset;
    @include elevation24();
  }
  &:hover,
  &:focus,
  &.focus {
    color: $btn-default-color;
    text-decoration: none;
    @include elevation4();
  }
  &.disabled,
  &[disabled],
  fieldset[disabled] & {
    cursor: $cursor-disabled;
    opacity: 0.65;
  } // [converter] extracted a& to a.btn
}
</style>