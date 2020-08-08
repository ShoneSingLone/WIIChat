<template>
  <transition>
  </transition>
</template>

<script>
import Input from "@cps/Input";
import Button from "@cps/Button";

let components = {
  textfield: Input,
  "c-button": Button
};

export default {
  name: "login-sigin",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" scoped>
.line {
  height: 1rem;
}
</style>
