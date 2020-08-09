<template>
  <div class="home">
    <v-btn @click="gotoAbout" color="primary">about</v-btn>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    gotoAbout(){
      this.$router.push({
        name:"About"
      })
    }
  },
};
</script>
