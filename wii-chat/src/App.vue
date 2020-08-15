<template>
  <v-app>
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
    <v-bottom-navigation v-model="currentNavigation" app>
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
export default {
  data() {
    return {
      navigations: [
        { value: "recent", title: "Recent", icon: "mdi-history" },
        { value: "favorites", title: "Favorites", icon: "mdi-heart" },
        { value: "nearby", title: "Nearby", icon: "mdi-map-marker" }
      ],
      currentNavigation: "nearby"
    };
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  mounted() {
    window.app = this;
  }
};
</script>
