<template>
  <div class="home">
    <v-btn @click="gotoAbout" color="primary">about</v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    gotoAbout() {
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>
