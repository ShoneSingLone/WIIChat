<template>
  <transition>
    <form class="form-signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <c-button :options="{
        class:{
          lg:true,
          primary:true,
          block:true
        },
        type:'submit'
      }"class="btn">Sign in</c-button>
    </form>
  </transition>
</template>

<script>
import Input from "@components/Input";
import Button from "@components/Button";
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
</style>
