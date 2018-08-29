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
import Container from "@cps/Container";
import Row from "@cps/Row";
import Col from "@cps/Col";
import Input from "@cps/Input";
import Button from "@cps/Button";

let components = {
  container: Container,
  row: Row,
  "c-col": Col,
  "c-input": Input,
  "c-button": Button
};

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
  components
};
</script>

<style lang="scss" scoped>
.circle {
  width: 3rem;
  height: 3rem;
}
</style>
