<template>
  <v-snackbar
    @input="handleSnackbarChange"
    v-model="snackbar"
    absolute
    centered
    vertical
    multi-line
    :color="options.color"
    :timeout="options.timeout"
  >
    {{ options.text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import merge from "lodash/merge";
const defaultData = {
  color: "",
  text: "",
  timeout: 6000
};
export default {
  data() {
    return {
      snackbar: false,
      options: {
        ...defaultData
      }
    };
  },
  methods: {
    handleSnackbarChange(snackbar) {
      if (!snackbar) {
        this.options = {
          ...defaultData
        };
      }
    },
    show(options) {
      this.options = merge({}, this.options, options);
      this.snackbar = true;
    }
  }
};
</script>
<style lang="scss"></style>
