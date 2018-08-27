<template>
  <container>
    <row>
      <bs-col :options="{
        sm: {
          colspan: 8,
          offset: 2
        }
      }">
        <div id="login-div">
          <section class="header">
            <h1>{{msg}}</h1>
          </section>
        </div>
      </bs-col>

    </row>
  </container>
</template>

<script>
import { Layout } from "@cpms";

export default {
  name: "error",
  metaInfo: {
    title: "Error",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
    ]
  },
  beforeRouteEnter: (to, from, next) => {
    let { query, params } = to;
    console.log(" query, params ", query, params);
    // GitHub redirect code
    let code = query.code;
    if (code && code.length)
      return next({ name: "checkout", params: { code } });
    next(vm => {
      vm.msg = query.msg;
      setTimeout(() => {
        vm.$router.push({ name: "login" });
      }, 1000 * 5);
    });
  },
  mounted() {
    console.log("Error mounted");
  },
  data() {
    return { msg: "" };
  },
  components: {
    container: Layout.Container,
    row: Layout.Row,
    "bs-col": Layout.Col
  }
};
</script>
