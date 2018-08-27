<template>
  <container>
    <row>
      <div class="col-xs-2 col-xs-offset-2">
        <div class="btn circle btn-default" aria-hidden="true">
          <span class="glyphicon glyphicon-star"></span>
        </div>
      </div>
      <div class="col-xs-4">
        <div class="glyphicon glyphicon-align-left btn circle btn-default" aria-hidden="true"></div>
      </div>
      <div class="col-xs-4"></div>
    </row>
  </container>
</template>

<script>
import { container, row, panel } from "@bs";

export default {
  name: "weekly",
  metaInfo: {
    title: "Weekly",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
    ]
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    container,
    row,
    panel
  }
};
</script>

<style lang="scss" scoped>
.circle {
  width: 3rem;
  height: 3rem;
}
</style>
