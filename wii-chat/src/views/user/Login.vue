<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>登录</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="dataForm.username"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="dataForm.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="registe">registe</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "HelloWorld",
  methods: {
    async registe() {
      try {
        let data = await this.$http.post("/reg", this.dataForm);
        console.log("registe -> data", data);
      } catch (error) {
        console.log("submit -> error", error);
      }
    },
    async submit() {
      try {
        let { token } = await this.$http.post("/login", this.dataForm);
        localStorage.wiichatusertoken = token;
        Cookies.set("token", token);
      } catch (error) {
        console.log("submit -> error", error);
      }
    },
    gotoHome() {
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    ["dataForm.password"](val) {
      this.dataForm.repassword = val;
    }
  },
  data: () => ({
    dataForm: {
      username: "",
      password: "",
      repassword: ""
    }
  })
};
</script>
