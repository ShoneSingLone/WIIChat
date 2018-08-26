<template>
  <container>
    <row>
      <div class="col-md-8 col-md-offset-2">
        <panel id="login-panel">
          <section class="header">
            <h1>{{msg}}</h1>
          </section>
        </panel>
      </div>

    </row>
  </container>
</template>

<script>
import { container, row, panel } from "@cb";

export default {
  name: "error",
  beforeRouteEnter: (to, from, next) => {
    let { query, params } = to;
    console.log(" query, params ", query, params);
    // GitHub redirect code
    let code = query.code;
    if (code && code.length)
      return next({ name: "checkout", params: { code } });
    next(vm => {
      vm.msg = query.msg;
    });
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "login" });
    }, 1000 * 3);
  },
  data() {
    return { msg: "" };
  },
  components: {
    container,
    row,
    panel
  }
};
</script>
