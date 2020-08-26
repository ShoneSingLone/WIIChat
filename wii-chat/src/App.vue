<template>
  <v-app>
    <v-system-bar dark color="primary">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn text @click="changeTheme">
        <v-icon>mdi-open-in-new</v-icon>
        <span class="mr-2">{{ $vuetify.theme.dark ? "light" : "dark" }}</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-bottom-navigation
      grow
      app
      color="indigo darken-1"
      :value="currentNavigation"
      @change="handleNavigationChange"
    >
      <v-btn
        :value="navigation.value"
        v-for="navigation in navigations"
        :key="navigation.value"
      >
        <span>{{ navigation.title }}</span>
        <v-icon>{{ navigation.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      navigations: [
        { value: "Login", title: "tLogin", icon: "mdi-history" },
        { value: "Home", title: "tHome", icon: "mdi-heart" },
        { value: "About", title: "tAbout", icon: "mdi-map-marker" }
      ],
      currentNavigation: "nearby"
    };
  },
  methods: {
    ...mapMutations(["setThemeColor"]),
    handleNavigationChange(navigationName) {
      this.setThemeColor("#f3f3f3");
      this.currentNavigation = navigationName;
      this.$router.push({
        name: navigationName
      });
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  watch: {
    $route(route) {
      console.log("route", route);
    }
  },
  mounted() {
    window.app = this;
  }
};
</script>
