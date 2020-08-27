<template>
  <div
    class="v-snack v-snack--absolute v-snack--active v-snack--bottom v-snack--centered v-snack--multi-line"
    :style="wrapperStyle"
  >
    <div
      :data-duration="duration(options)"
      :id="'snackbar' + uuid"
      v-for="(options, uuid) in optionsCollection"
      :key="uuid"
      :class="[
        'v-snack__wrapper v-sheet v-sheet--outlined theme--light',
        options.color + '--text'
      ]"
    >
      <div role="status" aria-live="polite" class="v-snack__content">
        <h6>{{ options.text }}</h6>
      </div>
      <div class="v-snack__action">
        <button
          @click="removeItem(uuid)"
          type="button"
          :class="[
            'v-btn v-btn--flat v-btn--text theme--light v-size--default  v-snack__btn',
            options.color + '--text'
          ]"
        >
          <span class="v-btn__content">Close</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import merge from "lodash/merge";
import forEach from "lodash/forEach";
import debounce from "lodash/debounce";
import { APP } from "@/main";
import $ from "jquery";
const defaultData = {
  color: "",
  text: "",
  timeout: 6000
};
export default {
  data() {
    return {
      wrapperStyle: {},
      seed: 1,
      snackbar: false,
      optionsCollection: {}
    };
  },
  methods: {
    duration({ timeout, uuid }) {
      const _this = this;
      if (timeout) {
        setTimeout(() => {
          _this.removeItem(uuid);
        }, timeout);
      }
    },
    removeItem(uuid) {
      $("#snackbar" + uuid).addClass("remove");
      delete this.optionsCollection[uuid];
      this.checkCollection();
    },
    checkCollection: debounce(function() {
      let count = 0;
      forEach(this.optionsCollection, () => count++);
      if (!count) {
        this.optionsCollection = {};
        this.seed = 1;
      }
    }, 1000),
    show(options) {
      var _this = this;
      (top => {
        _this.wrapperStyle = {
          paddingTop: top + 20 + "px"
        };
      })(APP?.$vuetify?.application?.top);

      const uuid = this.seed++;
      this.$set(
        this.optionsCollection,
        uuid,
        merge({ ...defaultData, uuid }, options)
      );
    }
  }
};
</script>
<style lang="scss">
#create-single-components {
  .v-snack {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .v-snack__wrapper {
    transition: 1s ease-in-out;
    overflow: hidden;
    &.remove {
      transform: scale(0);
      min-height: 0;
      height: 0;
      margin: 0;
    }
  }
  .v-snack__action {
    margin-right: 8px;
  }
}
</style>
