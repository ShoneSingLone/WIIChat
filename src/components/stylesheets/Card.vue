<template>
  <div class="card">
    <div class="header" v-if="$slots.header">
      <h3>
        <slot name="header">
        </slot>
      </h3>
    </div>
    <div class="body">
      <slot>
      </slot>
    </div>
    <div name="footer" class="footer" v-if="$slots.footer">
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
  @include elevation4();
  padding: 1rem;
  margin-top: 1rem;
}
</style>
