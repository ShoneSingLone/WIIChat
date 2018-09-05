<template>
  <transition :name="transitionName">
    <c-container class="tool-bar" :options="{class:'fluid'}">
      <c-row>
        <c-col :options="colOptions">
          <slot>
            <header>
              <span class="label label-default">tool-bar</span>
            </header>
            <c-button :options="{class:{
                  primary:true,
                  elevation:true
                }}" @click="triggerLogout">
              logout
            </c-button>
          </slot>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const EVENT_INPUT = "input";
const EVENT_CHANGE = "change";
const EVENT_BLUR = "blur";
const EVENT_FOCUS = "focus";

export default {
  name: "c-tool-bar",
  mounted() {
    console.log("ToolBar mounted");
    setTimeout(() => {
      this.$emit("mounted", this.$el);
    }, 1000 * 1);
  },
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
    "c-input": () => import(/* webpackChunkName: "c-input" */ "@cps/Input"),
    "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button")
  },
  props: {},
  data() {
    return {
      transitionName: "out-down",
      colOptions: {
        class: {
          md: {
            colspan: 12
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  watch: {},
  methods: {
    ...mapActions(["logOut"]),
    ...mapActions("article", ["logOut"]),
    triggerLogout(e) {
      console.log("logOut");
      debugger;
      // this.logOut();
    }
  }
};
</script>
<style lang="scss" >
@import "vm";
.tool-bar {
  // outline: 1px solid rebeccapurple;
  position: absolute;
  top: 0;
  height: 5rem;
  width: 100%;
  z-index: 2;
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @include elevation8();
}
</style>
