<template>
  <table>
    <tr>
      <td>
        <c-button :options="{class:{elevation:true,primary:true}}">GoTo</c-button>
      </td>
    </tr>
    <tr>
      <td>
        <router-view></router-view>
      </td>
    </tr>
  </table>
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
  "c-progress": () =>
    import(/* webpackChunkName: "c-progress" */ "@cps/Progress")
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
table {
  width: 100%;
  tr {
    text-align: center;
  }
}
</style>

