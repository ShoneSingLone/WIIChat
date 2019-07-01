<template>
  <c-container>
    <c-row>
      <c-col :options="{
        sm: {
          colspan: 8,
          offset: 2
        }
      }">
        <c-modals :isShow="true" title="正在处理登录相关信息，稍等...">
          <div slot="body" class="msg-wrapper">
            <c-progress :width="progressWidth"/>
          </div>
        </c-modals>
      </c-col>
    </c-row>I
  </c-container>
</template>

<script>
import axios from "axios";
import Container from "@cps/Container";
import Row from "@cps/Row";
import Col from "@cps/Col";
import Button from "@cps/Button";
import Modals from "@cps/Modals";
import Progress from "@cps/Progress";

let components = {
  "c-container": Container,
  "c-row": Row,
  "c-col": Col,
  "c-button": Button,
  "c-modals": Modals,
  "c-progress": Progress
};

/**
 * 2.
 *    Users are redirected back to your site by GitHub
 *    If the user accepts your request,
 *    GitHub redirects back to your site
 *    with a temporary code in a code parameter as well as
 *    the state you provided in the previous step in a state parameter.
 *    If the states don't match, the request was created by
 *    a third party and the process should be aborted.
 */
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "checkout",
  metaInfo: {
    title: "Checkout",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
    ]
    // link: [{ rel: "stylesheet", href: "/css/index.css" }],
    // script: [ { innerHTML: '{"@context":"http://schema.org" }', type: "application/ld+json" } ]
  },
  created() {},
  mounted() {
    let code = this.$route.params.code;
    if (!code) {
      this.$router.push({
        name: "error",
        query: {
          msg: "获取第三方权限有误"
        }
      });
    }
    let url = this.hostName;
    console.log("hostName", this.hostName);
    this.progressWidth = 0;
    let upupup = () => {
      setTimeout(() => {
        this.progressWidth++;
        setTimeout(upupup, 1000 * 0.5);
      }, 1000 * 0.5);
    };
    upupup();

    axios({
      method: "post",
      url,
      data: {
        code,
        endpoint: "login",
        action: "exchangeCodeToToken"
      },
      onUploadProgress: function(progressEvent) {
        console.log("onUploadProgress", progressEvent);
        console.time("progress");
        // Do whatever you want with the native progress event
      },
      onDownloadProgress: function(progressEvent) {
        console.log("onDownloadProgress", progressEvent);
        console.timeEnd("progress");
        // Do whatever you want with the native progress event
      },
      params: {}
    })
      .then(res => {
        console.log("res", res);
        console.log("res.data", res.data);
        console.log("res.data.success", res.data.success);

        if (res.data.success) {
          let { data } = res.data;
          console.log(data);
          let { token, name, avatar } = data;
          this.setUserInfo({
            token,
            name,
            avatar
          });
          this.$router.push({
            name: "home"
          });
        } else {
          let { error } = res.data; //自定义，这个规范可以再商讨
          throw new Error(error);
        }
      })
      .catch(error => {
        clearTimeout(upupup);
        console.log("error", error);
        this.$router.push({
          name: "error",
          query: { msg: error.message }
        });
      });
  },
  components,
  data() {
    return { progressWidth: 0 };
  },
  computed: {
    ...mapGetters(["hostName"])
  },
  methods: {
    ...mapMutations(["setUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
#login-panel-waiting {
  margin-top: 30%;
}
</style>
