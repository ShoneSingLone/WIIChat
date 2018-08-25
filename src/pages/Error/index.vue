<template>
  <container>
    <row>
      <div class="col-md-8 col-md-offset-2">
        <panel id="login-panel">
          <section class="header">
            <h1>Error</h1>
          </section>
        </panel>
      </div>

    </row>
  </container>
</template>

<script>
import container from "@cb/Container";
import row from "@cb/Row";
import panel from "@cb/Panel";

export default {
  name: "error",
  beforeRouteEnter: (to, from, next) => {
    let { query, params } = to;
    console.log(" query, params ", query, params);
    // GitHub redirect code
    let code = query.code;
    if (code && code.length)
      return next({ name: "checkout", params: { code } });
    next();
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "login" });
    }, 1000 * 3);
  },
  components: {
    container,
    row,
    panel
  }
};
</script>
