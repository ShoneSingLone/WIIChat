<template>
  <div class="shrine-login">
    <section class="header">
      <img src="./logo.svg" alt="" srcset="">
      <h1>SHRINE</h1>
    </section>
    <form>
      <div class="mdc-text-field mdc-text-field--box username">
        <input type="text" class="mdc-text-field__input" id="username-input" name="username">
        <label class="mdc-floating-label" for="username-input">Username</label>
        <div class="mdc-line-ripple"></div>
      </div>
      <div class="mdc-text-field mdc-text-field--box password">
        <input type="password" class="mdc-text-field__input" id="password-input" name="password">
        <label class="mdc-floating-label" for="password-input">Password</label>
        <div class="mdc-line-ripple"></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  metaInfo: {
    title: "Login",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
    ],
    link: [{ rel: "stylesheet", href: "/css/index.css" }],
    script: [
      {
        innerHTML: '{ "@context": "http://schema.org" }',
        type: "application/ld+json"
      }
    ]
  },
  created() {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.shrine-logo {
  width: 150px;
  height: 150px;
  padding-top: 80px;
  fill: currentColor;
}
</style>
