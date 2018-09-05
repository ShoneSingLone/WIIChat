<template>
  <transition :name="transitionName">
    <c-container class="bottom-nav-bar" :options="{class:'fluid'}">
      <c-row>
        <c-col :options="options">
          <nav>
            <ul class="tab">
              <li :class="['item',{'active':currentItem===index}]" v-for="(item, index) in tabItems" :key="index">
                <span class="glyphicon" :class="getIconClass(item.icon)"></span>
                <span class="icon-label">{{item.label}}</span>
                <a class="modals" href="javascript:void(0)" @click="(event)=>{handleTabClick(event,item,index)}"></a>
              </li>
            </ul>
          </nav>
        </c-col>
      </c-row>
    </c-container>
  </transition>
</template>

<script>
import { mapActions } from "vuex";

const components = {
  "c-container": () =>
    import(/* webpackChunkName: "c-container" */ "@cps/Container"),
  "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
  "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
  "c-input": () => import(/* webpackChunkName: "c-input" */ "@cps/Input"),
  "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
  "c-modals": () => import(/* webpackChunkName: "c-modals" */ "@cps/Modals"),
  "c-tool-bar": () => import(/* webpackChunkName: "c-modals" */ "@cps/ToolBar"),
  "c-bottom-nav-bar": () =>
    import(/* webpackChunkName: "c-modals" */ "@cps/BottomNavBar")
};
const EVENT_TAB_CLICK = "tabClick";
const EVENT_INPUT = "input";
const EVENT_CHANGE = "change";
const EVENT_BLUR = "blur";
const EVENT_FOCUS = "focus";

export default {
  name: "c-bottom-nav-bar",
  components,
  mounted() {
    console.log("BottomNavBar mounted");
    setTimeout(() => {
      this.$emit("mounted", this.$el);
    }, 30);
  },
  props: {
    tabItems: {
      type: Array,
      required: true
    },
    currentItem: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      transitionName: "out-up",
      options: {
        class: {
          md: {
            colspan: 12
          }
        }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(["setThemeColor"]),
    getIconClass(iconName) {
      return `glyphicon-${iconName}`;
    },
    changeHander(e) {
      this.$emit(EVENT_CHANGE, e);
    },
    formateEye() {
      if (typeof this.eye === "boolean") {
        this.formatedEye.open = this.eye;
      } else {
        Object.assign(this.formatedEye, this.eye);
      }
    },
    handleFocus(e) {
      this.$emit(EVENT_FOCUS, e);
      this.isFocus = true;
    },
    handleBlur(e) {
      this.$emit(EVENT_BLUR, e);
      this.isFocus = false;
    },
    handleClear(e) {
      this.inputValue = "";
      this.$refs.input.focus();
    },
    handlePwdEye() {
      this.formatedEye.open = !this.formatedEye.open;
    },
    handleTabClick(event, item, index) {
      this.$emit(EVENT_TAB_CLICK, { event, item, index });
    }
  }
};
</script>
<style lang="scss">
@import "vm";

.bottom-nav-bar {
  * {
    // outline: 1px solid rebeccapurple;
  }
  // outline: 1px solid rebeccapurple;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
  background: white;
  @include elevation8();
  .tab {
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    height: 7rem;
    text-align: center;
    .item {
      position: relative;
      text-align: center;
      flex: 1;
      margin-top: 1rem;
      font-size: $font-size-h6;
      font-weight: bold;
      // border: 1px solid $brand-primary;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      transition: all 0.5s ease-in-out;

      .glyphicon {
        display: inline-block;
        margin: 0.5rem auto;
        // outline: 1px solid red;
        height: 3rem;
        width: 3rem;
        line-height: 3rem;
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
      }
      .icon-label {
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        line-height: 1rem;
      }
      .modals {
        position: absolute;
        top: -1rem;
        right: 0;
        bottom: -2rem;
        left: 0;
      }

      &.active {
        color: $brand-primary;

        .glyphicon {
          border: 1px solid $brand-primary;
          transform: scale(1.1);
          @include elevation12();
        }
        .icon-label {
          text-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }
}
</style>
