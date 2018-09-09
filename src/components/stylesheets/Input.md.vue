<template>
  <transition :name="transitionName">
    <div class="form__wrapper" data-wow-delay="0.5s">
      <input :type="type" class="form__input" :id="forNameId" :name="forNameId">
      <label class="form__label" :for="forNameId">
        <span class="form__label__content">Email</span>
      </label>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "button.MD",
  mounted() {
    //某些需要在mounted之后完成的初始化
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("mounted");
  },
  beforeRouteEnter: (to, from, next) => {
    console.warn("beforeRouteEnter Sample");
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next(vm => {});
  },
  beforeRouteUpdate(to, from, next) {
    console.warn("beforeRouteUpdate Sample");
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.warn("beforeRouteLeave Sample");
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  props: {
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      transitionName: "",
      forNameId: String("fni" + new Date().getTime())
    };
  },
  computed: {},
  methods: {},
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
    "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
    "c-card": () => import(/* webpackChunkName: "c-card" */ "@cps/Card")
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  padding: 1em 1.5em;
  .form__wrapper {
    overflow: hidden;
    position: relative;
    z-index: 1;
    display: inline-block;
    margin-bottom: 1.6rem;
    width: 100%;
    vertical-align: top;
    .form__input {
      display: block;
      position: relative;
      margin-top: 1em;
      padding: 0.84em 0;
      width: 100%;
      box-sizing: border-box;
      color: #444;
      font-size: 1.6rem;
      outline: 0;
      border: none;
      border-bottom: solid 1px #ddd;
      &:focus {
        background-position: 0 0;
        color: #444;
      }
      .form__label {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0;
        width: 100%;
        height: calc(99%);
        text-align: left;
        pointer-events: none;
        color: #999;
      }
      .form__label__content {
        position: absolute;
      }
    }
  }

  .form__input:focus ~ .form__label .form__label-content,
  .form--filled .form__label-content {
  }
  .btn {
    width: 100%;
    display: inline-block;
    padding: 0.7em 1.5em;
    border-radius: 2px;
    background-color: #2196f3;
    color: #fff;
    border: 0;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 400;
    font-size: 1.6rem;
    box-shadow: 0 1px 3px 0 rgba(3, 30, 51, 0.24),
      0 1px 2px 0 rgba(3, 30, 51, 0.12);
    transition: all 0.2s ease;
  }
  .btn:focus,
  .btn:hover {
    background-color: #0d8aee;
  }
  /* 动效 */
  .form__input + .form__label:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: #2196f3;
    transition: width 0.5s ease;
  }
  .form__input:focus + .form__label:after {
    transition: width 0s;
    width: 100%;
  }
  .form__input + .form__label .form__label__content {
    transition: font-size 0.3s ease-out, transform 0.3s ease-out;
  }
  .form__input:focus + .form__label .form__label__content,
  .form__input.active + .form__label .form__label__content {
    font-size: 1.4rem;
    transform: translateY(-8px);
  }
}
</style>
