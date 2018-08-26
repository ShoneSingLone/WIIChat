<template>
  <container>
    <row>
      <div class="col-md-8 col-md-offset-2">
        <panel id="login-panel-waiting" :options="{haveHeading:true}">
          <template slot="heading">
            正在处理登录相关信息，稍等...
          </template>
          <section class="">
            <md-progress :options="progress" :width="progress.width" />
          </section>
        </panel>
      </div>
    </row>
  </container>
</template>

<script>
import { container, row, panel } from "@cb";
import axios from "axios";
import progress from "./Progress";

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
import { mapGetters, mapActions } from "vuex";

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
        params: {
          msg: "获取第三方权限有误"
        }
      });
    }
    let url = this.hostName;
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
        console.log("error", error);
        this.$router.push({
          name: "error",
          query: { msg: error.message }
        });
      });
  },
  components: {
    container,
    row,
    panel,
    "md-progress": progress
  },
  data() {
    return {
      optionText: {
        type: "text"
      },
      optionPwd: {
        type: "password"
      },
      progress: {
        width: 50
      }
    };
  },
  computed: {
    ...mapGetters(["hostName"])
  },
  methods: {
    ...mapActions(["setUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
#login-panel-waiting {
  margin-top: 30%;
}
</style>
