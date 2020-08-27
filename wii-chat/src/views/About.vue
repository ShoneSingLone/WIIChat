<template>
  <v-container>
    <v-row class="text-center">
      <Snackbar ref="Snackbar" />
      <v-btn color="primary" @click="show">show</v-btn>
      <v-btn color="primary" @click="changeSnackbar">Snackbar</v-btn>
      <v-snackbar :value="true" absolute centered color="success" outlined
        >Lorem ipsum dolor sit amet consectetur.</v-snackbar
      >
    </v-row>
  </v-container>
</template>

<script>
import Snackbar from "@/components/Snackbar";
export default {
  components: {
    Snackbar
  },
  name: "HelloWorld",
  methods: {
    gotoHome() {
      this.$router.push({
        name: "Home"
      });
    },
    show(method, text) {
      this.$Snackbar[method](text);
    },
    changeSnackbar() {
      this.$refs.Snackbar.show({ text: "success" });
    }
  }
};
</script>
