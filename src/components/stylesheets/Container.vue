<template>
  <div :class="containerClass" @scroll="handlerScroll">
    <slot></slot>
  </div>
</template>
<script>
// throttle 和 debouce 函数的底层实现
var limit = function(func, wait, debounce) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    // 封装函数,用于延迟调用
    var throttler = function() {
      // 只是节流函数的时候,对其timeout进行赋值为null,这样可以设置下一次的setTimtout
      timeout = null;
      func.apply(context, args);
    };
    // 如果debouce是true的话,前一个函数的调用timeout会被清空,不会被执行
    if (debounce) clearTimeout(timeout);
    // 如果debouce是true 或者 timeout 为空的情况下,设置setTimeout
    if (debounce || !timeout) timeout = setTimeout(throttler, wait);
  };
};

// throttle 节流函数
const throttle = function(func, wait) {
  return limit(func, wait, false);
};

// debouce 多次调用,只执行最后一次.
const debounce = function(func, wait) {
  return limit(func, wait, true);
};

export default {
  name: "c-container",
  mounted() {
    //某些需要在mounted之后完成的初始化
    this.$emit("mounted", this.$el);
  },
  components: {},
  props: {
    options: {
      class: {
        type: String
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    containerClass() {
      if (this.options && this.options.class) {
        return "container-fluid";
      }
      return "container";
    }
  },
  methods: {
    handlerScroll(event) {
      this.$emit("scroll", event);
    }
  }
};
</script>

<style lang="scss">
@import "vm";

// Container widths
//
// Set the container width, and override it for fixed navbars in media queries.
.container {
  @include container-fixed;

  @media (min-width: $screen-sm-min) {
    width: $container-sm;
  }
  @media (min-width: $screen-md-min) {
    width: $container-md;
  }
  @media (min-width: $screen-lg-min) {
    width: $container-lg;
  }
}

// Fluid container
//
// Utilizes the mixin meant for fixed width containers, but without any defined
// width for fluid, full width layouts.

.container-fluid {
  @include container-fixed;
}
</style>
