<template>
  <transition name="fade">
    <div v-show="isShow" class="modal show" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{title}}</h4>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"> </slot>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
  </transition>
</template>

<script>
export default {
  name: "c-modals",
  mounted() {
    console.log("mounted", this.options);
    console.log("this.$slot", this.$slots);
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Title"
    }
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss">
.modal {
  &.show {
    display: block;
  }
}
</style>
