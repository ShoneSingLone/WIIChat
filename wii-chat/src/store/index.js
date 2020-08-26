import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let themeColorDOM;
export default new Vuex.Store({
  state: {
    meta: {
      themeColor: "#337ab7"
    }
  },
  mutations: {
    setThemeColor(state, color) {
      state.meta.themeColor = color;
    }
  },
  actions: {
    setThemeColor({ commit }, color) {
      // LAZY SINGLE
      const metaId = "theme-color";
      try {
        themeColorDOM = themeColorDOM
          ? themeColorDOM
          : document.getElementById(metaId);
        themeColorDOM = themeColorDOM
          ? themeColorDOM
          : (function() {
              let meta = document.createElement("meta");
              meta.id = metaId;
              document.head.appendChild(meta);
              return meta;
            })();
        debugger;
        themeColorDOM.setAttribute("content", color);
      } catch (error) {
        // TODO:append a meta name=theme-color content=color
      }
      return commit("setThemeColor", color);
    }
  },
  modules: {}
});
