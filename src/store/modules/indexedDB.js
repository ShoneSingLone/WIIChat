// debugger;
(async () => {
  //没有IndexedDB另说，暂时不管
  if (window.indexedDB) {
    try {
      //打开IndexedDB
      const request = window.indexedDB.open('brumaire');
      request.onupgradeneeded = function (event) {
        // 在数据库创建或者版本更新时， 会触发onupgradeneeded事件。
      }
      request.onsuccess = function (event) {
        //request === event.target;
      }
      request.onerror = function (event) {}

      let db = await myDB.openDB();
      let isFirst = false; //blog是否已经初始化数据
      if (!myDB.haveTable("blog")) {
        isFirst = true;
        debugger;
        //新建表，并且第一次访问则肯定需要从仓库获取数据
        let blogOStore = db.createObjectStore("blog", {
          "keyPath": "id"
        });
        // 索引
        blogOStore.createIndex("id", "id", {
          unique: true
        });
        blogOStore.createIndex("updated_at", "updated_at", {
          unique: false
        });
      }

      //以上完成本地IndexedDB的检测与设置，则可设置indexedDB的state
      app.$store.commit("common/setDBState", true);
      // app.$store.commit("common/setDB", myDB);

      // 成为一个单例
      window.myDB = myDB;

      if (!isFirst) {
        app.$mount('#app');
      }

      let contents = await Axios("https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues?filter=updated");

      if (contents && contents.data) {
        contents = contents.data;
      }

      contents.forEach((value, index, array) => {
        let method = isFirst ? "create" : "update",
          content = Marked(value.body),
          // html = jquery(content).html(),
          text = jquery(content).text(),
          desc = text.length > 120 ? text.substring(0, 120) + "..." : text;
        myDB[method]("blog", {
          imgUrl: "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg",
          desc,
          content,
          ...value
        });
      });
      if (isFirst) {
        app.$mount('#app');
      }
      // let contents = await myDB.getAll(["blog"]);
      // if (!(contents && contents.length > 0)) {}
    } catch (error) {
      console.log(error);
    }
  }
})()


const state = {
  windowScrollY: 0
}
const getters = {
  windowScrollY(state) {
    return state.windowScrollY
  }
}
const actions = {
  setWindowScrollY({
    commit
  }, y) {
    return commit('setWindowScrollY', y)
  }
}
const mutations = {
  setWindowScrollY(state, y) {
    state.windowScrollY = y
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}