<template>
  <container>
    <row>
      <c-col :options="{
        sm: {
          colspan: 8,
          offset: 2
        }
      }">
        <c-modals :isShow="true" :title="title">
          <div slot="body" class="msg-wrapper" v-if="msg">
            <h1 class="msg">
              <span>{{msg}}</span>
            </h1>
          </div>
          <div slot="footer">
            <c-button :options="{class:{primary:true}}" @click="toLogin">回到Login界面({{downCount}}s)</c-button>
          </div>
        </c-modals>
      </c-col>
    </row>
  </container>
</template>

<script>
import Container from "@cps/Container";
import Row from "@cps/Row";
import Col from "@cps/Col";
import Input from "@cps/Input";
import Button from "@cps/Button";
import Modals from "@cps/Modals";

let components = {
  container: Container,
  row: Row,
  "c-col": Col,
  "c-input": Input,
  "c-button": Button,
  "c-modals": Modals
};

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
    if (code && code.length > 0)
      return next({ name: "checkout", params: { code } });
    next(vm => {
      vm.msg = query.msg;
    });
  },
  mounted() {
    console.log("Error mounted");
    let vm = this;
    vm.downCount = 5;
    let downC = function() {
      setTimeout(() => {
        if (vm.downCount === 0) {
          vm.$router.push({ name: "login" });
        } else {
          vm.downCount--;
          setTimeout(downC, 1000 * 1);
        }
      }, 1000 * 1);
    };
    downC();
  },
  data() {
    return {
      msg: "",
      downCount: 5
    };
  },
  computed: {
    title: function() {
      let title = "似乎没有什么不对的...";
      if (this.msg && this.msg.length > 0) {
        title = "进展并不顺利,但不要放弃,请再试一次";
      }
      return title;
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    }
  },
  components
};
</script>
<style lang="scss" scoped>
.msg-wrapper {
  width: 100%;
  .msg {
    text-align: center;
  }
}
</style>

