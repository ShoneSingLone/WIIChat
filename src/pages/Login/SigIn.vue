<template>
  <transition>
    <form class="form-signin">
      <textfield placeholder="Email address">
      </textfield>
      <textfield placeholder="Password">
      </textfield>
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" required="" autofocus="">
      <div class="line"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" required="">
      <div class="line"></div>
      <button class="btn btn-lg btn-primary btn-block">Sign in</button>
    </form>
  </transition>
</template>

<script>
import { Textfield } from "@cpms";
let components = { textfield: Textfield };

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
