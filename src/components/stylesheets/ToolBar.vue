<template>
  <transition :name="transitionName">
    <c-container class="tool-bar" :options="{class:'fluid'}">
      <c-row>
        <c-col :options="options">
          <header>
            <span class="label label-default">tool-bar</span>
          </header>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-input": () => import(/* webpackChunkName: "c-input" */ "@cps/Input"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-modals": () => import(/* webpackChunkName: "c-modals" */ "@cps/Modals"),
  "c-tool-bar": () => import(/* webpackChunkName: "c-modals" */ "@cps/ToolBar"),
  "c-bottom-nav-bar": () =>
    import(/* webpackChunkName: "c-modals" */ "@cps/BottomNavBar")
};
const EVENT_INPUT = "input";
const EVENT_CHANGE = "change";
const EVENT_BLUR = "blur";
const EVENT_FOCUS = "focus";

export default {
  name: "c-tool-bar",
  mounted() {
    console.log("ToolBar mounted");
    setTimeout(() => {
      this.$emit("mounted", this.$el);
    }, 1000 * 1);
  },
  components,
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: [Boolean, String],
      default: false
    },
    name: String,
    id: String,
    form: String,
    minlength: Number,
    maxlength: Number,
    resize: String,
    min: Number,
    max: Number,
    step: Number,
    tabindex: String,
    clearable: {
      type: Boolean,
      default: false
    },
    eye: {
      type: [Boolean, Object],
      default: false
    }
  },
  data() {
    return {
      transitionName: "out-down",
      options: {
        class: {
          md: {
            colspan: 12
          }
        }
      },
      inputValue: this.value,
      isFocus: false,
      formatedEye: {
        open: false,
        reverse: false
      }
    };
  },
  computed: {
    _type() {
      const type = this.type;
      if (type === "password" && this.eye && this.pwdVisible) {
        return "text";
      }
      return type;
    },
    _showClear() {
      return (
        this.clearable && this.inputValue && !this.readonly && !this.disabled
      );
    },
    _showPwdEye() {
      return this.type === "password" && this.eye && !this.disabled;
    },
    pwdVisible() {
      const eye = this.formatedEye;
      return eye.reverse ? !eye.open : eye.open;
    },
    eyeClass() {
      return this.formatedEye.open
        ? "cubeic-eye-visible"
        : "cubeic-eye-invisible";
    }
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
    inputValue(newValue) {
      this.$emit(EVENT_INPUT, newValue);
    },
    eye: {
      handler() {
        this.formateEye();
      },
      immediate: true
    }
  },
  methods: {
    changeHander(e) {
      this.$emit(EVENT_CHANGE, e);
    },
    formateEye() {
      if (typeof this.eye === "boolean") {
        this.formatedEye.open = this.eye;
      } else {
        Object.assign(this.formatedEye, this.eye);
      }
    },
    handleFocus(e) {
      this.$emit(EVENT_FOCUS, e);
      this.isFocus = true;
    },
    handleBlur(e) {
      this.$emit(EVENT_BLUR, e);
      this.isFocus = false;
    },
    handleClear(e) {
      this.inputValue = "";
      this.$refs.input.focus();
    },
    handlePwdEye() {
      this.formatedEye.open = !this.formatedEye.open;
    }
  }
};
</script>
<style lang="scss" >
@import "vm";
.tool-bar {
  // outline: 1px solid rebeccapurple;
  position: absolute;
  top: 0;
  height: 5rem;
  width: 100%;
  z-index: 1;
  background: white;

  @include elevation8();
}
</style>
