<template>
  <div class="card" :class="options.class">
    <div class="header" v-if="$slots.header">
      <slot name="header">
      </slot>
    </div>
    <slot>
      <div class="body"></div>
    </slot>
    <div class="footer" name="footer" v-if="$slots.footer">
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script>
let components = {};
export default {
  name: "c-card",
  mounted() {
    console.log("Card mounted");
    //某些需要在mounted之后完成的初始化
    let vm = this;
    this.$nextTick()
      .then(() => {
        vm.$emit("mounted", vm.$el);
      })
      .catch(error => {
        console.error(error);
      });
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          class: {
            radius: false
          }
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components
};
</script>

<style lang="scss" >
@import "vm";

.card {
  @include elevation6();
  padding: 1rem;
  margin-top: 1rem;
  &.radius {
    border-radius: 1rem;
  }
}
</style>
