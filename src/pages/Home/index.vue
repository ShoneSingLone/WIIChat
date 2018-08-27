<template>
  <div class="home">
    <panel>
      <header>根据内容控制显隐以及功能
        <span class="label label-default">New</span>
      </header>
    </panel>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { panel } from "@bs";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    panel
  }
};
</script>

<style lang="scss" scoped>
</style>
