<template>
    <!-- <div class="mdc-text-field mdc-text-field--box username">
            <input type="text" class="mdc-text-field__input" id="username-input" name="username">
            <label class="mdc-floating-label" for="username-input">Username</label>
            <div class="mdc-line-ripple"></div>
        </div> -->
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="sample3">
        <label class="mdl-textfield__label" for="sample3">Text...</label>
    </div>
</template>

<script>
import "./textfield.js";

export default {
  name: "",
  components: {},
  props: {
    options: Object
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" src="./_textfield.scss">
</style>
<style lang="scss" scoped>
* {
  font-size: 1rem;
}
</style>
