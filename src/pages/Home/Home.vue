<template>
  <div class="shell">
    <c-tool-bar v-on:mounted="toolMounted" v-show="isShowToolBar">
      <div v-if="currentShow==='home.chat'">
        <c-button :options="{class:{
                  elevation:true
                }}">chat</c-button>
      </div>
      <div v-if="currentShow==='home.user'">
        <c-button :options="{class:{
                  elevation:true
                }}">user</c-button>
      </div>
      <div v-if="currentShow==='home.question'">
        <c-button :options="{class:{
                  elevation:true
                }}">question</c-button>
      </div>
      <div v-if="currentShow==='home.article'">
        <c-button :options="{class:{
                  elevation:true
                }}">article</c-button>
      </div>
      <div v-if="currentShow==='home.article.detail'">
        <c-button :options="{class:{
                  primary:true,
                  elevation:true
                }}" @click="goBackToArticleList()">GoBack</c-button>
      </div>
    </c-tool-bar>
    <c-bottom-nav-bar v-on:mounted="navMounted" :currentItem="currentItem" :tabItems="tabItems" @tabClick="navTo" v-show="isShowNavBar"></c-bottom-nav-bar>
    <!-- 以上position为absolute，不影响布局，但是会影响Vue初始化 -->

    <div class="main">
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  mounted() {
    console.log("Home mounted");
    this.setHomeRect(this.$el.getBoundingClientRect());
  },
  data() {
    return {
      showNav: true,
      transitionName: "fade",
      currentItem: 0,
      tabItems: [
        { icon: "grain", label: "Chat", routeName: "chat" },
        { icon: "list-alt", label: "Article", routeName: "article" },
        { icon: "edit", label: "Question", routeName: "question" },
        { icon: "user", label: "User", routeName: "user" }
      ],
      colOptions: {
        class: {
          md: {
            colspan: 8,
            offset: 2
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapGetters("home", ["isShowToolBar", "isShowNavBar", "currentShow"]),
    ...mapGetters("article", ["movingDirectionY", "articleScrollY"])
  },
  watch: {
    movingDirectionY(newY, oldY) {
      this.setShowToolBar(newY === -1 ? true : false);
      this.setShowNavBar(newY === -1 ? true : false);
    },
    userInfo(newV, oldV) {
      if (!newV) {
        this.$router.push({ name: "login" });
      }
    },
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.setCurrentShow(to.name);
      let item = this.tabItems[0],
        index = 0;
      for (let subIndex = 0; subIndex < this.tabItems.length; subIndex++) {
        if (this.tabItems[subIndex].routeName === to.name.split(".")[1]) {
          item = this.tabItems[subIndex];
          index = subIndex;
          break;
        }
      }
      this.navTo({ item, index });
      console.log("Home $route", to.name, toDepth, fromDepth);
      /*     if (toDepth < fromDepth) {
        // 往左：以后可以配置再说
        this.transitionName = "back";
      } else {
        // 往右
        this.transitionName = "forward";
      } */
    }
  },
  methods: {
    ...mapActions(["setThemeColor"]),
    ...mapActions("home", [
      "setHomeRect",
      "setToolBarRect",
      "setNavBarRect",
      "setShowToolBar",
      "setShowNavBar",
      "setCurrentShow"
    ]),
    toolMounted(toolEle) {
      this.setToolBarRect(toolEle.getBoundingClientRect());
    },
    navMounted(navEle) {
      this.setNavBarRect(navEle.getBoundingClientRect());
      this.navTo({ item: this.tabItems[1], index: 1 });
    },
    test(event) {
      console.log(event);
    },
    goBackToArticleList() {
      this.$router.go(-1);
    },
    navTo({ event, item, index }) {
      // this.setThemeColor("red");
      if (this.currentItem === index) return false;
      this.currentItem = index;
      this.$router.push({
        name: `home.${item.routeName}`
      });

      /*  if (index === 1) {
        this.setThemeColor("#337ab7");
        console.log(
          "this.$el.getBoundingClientRect",
          this.$el.getBoundingClientRect()
        );
      } */
    }
  },
  components: {
    "c-container": () =>
      import(/* webpackChunkName: "c-container" */ "@cps/Container"),
    "c-row": () => import(/* webpackChunkName: "c-row" */ "@cps/Row"),
    "c-col": () => import(/* webpackChunkName: "c-col" */ "@cps/Col"),
    "c-button": () => import(/* webpackChunkName: "c-button" */ "@cps/Button"),
    "c-modals": () => import(/* webpackChunkName: "c-modals" */ "@cps/Modals"),
    "c-tool-bar": () =>
      import(/* webpackChunkName: "c-modals" */ "@cps/ToolBar"),
    "c-bottom-nav-bar": () =>
      import(/* webpackChunkName: "c-modals" */ "@cps/BottomNavBar")
  }
};
</script>

<style lang="scss" scoped>
.shell,
.main {
  height: 100%;
  overflow: hidden;
}
</style>
