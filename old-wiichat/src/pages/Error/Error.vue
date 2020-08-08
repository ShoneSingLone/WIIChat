<template>
  <container>
    <row>
      <c-col :options="{class:{
        sm: { colspan: 8, offset: 2 }
       }
      }">
        <c-modals :isShow="true" :title="title">
          <div slot="body" class="msg-wrapper" v-if="msg">
            <h1 class="msg">
              <span>{{msg}}</span>
            </h1>
          </div>
          <div slot="footer">
            <c-button :options="{class:{primary:true}}" @click="goBack">哪里来哪里去({{waitTime}}s)</c-button>
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
  mounted() {
    console.log("Error mounted");
  },
  beforeRouteEnter: (to, from, next) => {
    // console.log("Error: beforeRouteEnter");
    let { query, params } = to;
    // console.log(" query, params ", query, params);
    // GitHub redirect code
    let code = query.code;
    if (code && code.length > 0) {
      return next({ name: "checkout", params: { code } });
    } else {
      next(vm => {
        // console.log("Error: beforeRouteEnter next");
        vm.msg = query.msg || query.error;
        vm.waitTime = query.waitTime ? query.waitTime : 5;
        vm.fromPathName =
          params.redirect && params.redirect.name
            ? params.redirect.name
            : from.name ? from.name : "login";
        vm.downC();
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    // console.log("Error: beforeRouteUpdate");
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log("Error: beforeRouteLeave");
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  },
  data() {
    return {
      msg: "",
      waitTime: 5,
      fromPathName: "login",
      dcTimer: {}
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
    goBack() {
      clearTimeout(this.dcTimer);
      this.$router.push({ name: this.fromPathName });
    },
    downC() {
      this.dcTimer = setTimeout(() => {
        if (this.waitTime === 0) {
          this.goBack();
        } else {
          this.waitTime--;
          this.dcTimer = setTimeout(this.downC, 1000 * 1);
        }
      }, 1000 * 1);
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

