<template>
  <div class="home">
    <v-btn @click="gotoAbout" color="primary">about</v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapMutations(["setThemeColor"]),
    gotoAbout() {
      this.setThemeColor("#f3f3f3");
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>
