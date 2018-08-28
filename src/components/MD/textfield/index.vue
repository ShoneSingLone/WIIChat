<template>
  <!-- <div class="mdc-text-field mdc-text-field--box username">
            <input type="text" class="mdc-text-field__input" id="username-input" name="username">
            <label class="mdc-floating-label" for="username-input">Username</label>
            <div class="mdc-line-ripple"></div>
        </div> -->
  <div :class="['mdl-textfield', 'mdl-js-textfield','mdl-textfield--floating-label']">
    <input class="mdl-textfield__input" :type="options.type" :id="textfield.id" v-model="inputValue">
    <label class="mdl-textfield__label" :for="textfield.id">{{ options.type}}</label>
  </div>
</template>

<script>
import { MDCTextField } from "@material/textfield";

export default {
  name: "textfield",
  mounted() {
    new MDCTextField(this.$el);
  },
  components: {},
  props: ["options"],
  data() {
    return {
      inputValue: ""
    };
  },
  computed: {
    textfield: function() {
      let textfield = { id: this.options.type + Date.now() };
      textfield = Object.assign(textfield, this.options);
      console.log("textfield", textfield);
      return textfield;
    }
  },
  methods: {}
};
</script>

<style lang="scss" src="./textfield">
</style>
<style lang="scss" scoped>
</style>
