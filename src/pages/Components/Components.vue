<template>
    <c-container class="components">
        <c-row>
            <c-col :options="{
        xm: {
          colspan: 8,
          offset: 2
        }
      }">
                <c-modals :isShow="true" title="正在处理登录相关信息，稍等...">
                    <div slot="body" class="msg-wrapper">
                        {{progressWidth}}
                        <c-progress :width="progressWidth" :style="{width:width='%'}"/>
                    </div>
                </c-modals>
            </c-col>
        </c-row>
    </c-container>
</template>

<script>
let components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-input": () => import(/* webpackChunkName: "c-input" */ "@cps/Input"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-modals": () => import(/* webpackChunkName: "c-modals" */ "@cps/Modals"),
  "c-progress": () => import(/* webpackChunkName: "c-progress" */ "@cps/Progress")
};

export default {
  name: "components",
  mounted() {
    let vm = this;
    let upupup = () => {
      setTimeout(() => {
        vm.progressWidth++;
        setTimeout(upupup, 1000 * 1);
      }, 1000 * 1);
    };
    upupup();
  },
  data() {
    return {
      progressWidth: 0
    };
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" scoped>
</style>
