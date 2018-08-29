<template>
  <div class="home">
    <div>
      <header>根据内容控制显隐以及功能
        <span class="label label-default">New</span>
      </header>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
  }
};
</script>

<style lang="scss" scoped>
</style>
