<template>
  <div class="form-group">
    <label :for="forNameId" :class="{'sr-only':labelOptions.class&&labelOptions.class['sr-only']}">{{labelOptions.text}}</label>
    <input :type="type" class="form-control" :id="forNameId" :name="forNameId" :placeholder="placeholder" ref="input" v-model="inputValue" :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete" :autofocus="autofocus" @focus="handleFocus" @blur="handleBlur" @change="changeHander">
  </div>
</template>

<script>
const EVENT_INPUT = "input";
const EVENT_CHANGE = "change";
const EVENT_BLUR = "blur";
const EVENT_FOCUS = "focus";

export default {
  name: "c-input",
  props: {
    labelOptions: {
      text: {
        type: String,
        required: true
      },
      class: {
        type: Object,
        default: {}
      }
    },
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
      forNameId: String("fni" + new Date().getTime()),
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
</style>
