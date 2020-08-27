import $ from "jquery";
const createSingleComponentsId = "create-single-components";

export default {
  install: function(Vue) {
    function createAPI(id, Component) {
      id = `create-single-component-${id}`;
      const element = $(`#${id}`);
      if (element.length !== 1) {
        const component = new Vue(Component);
        let $createSingleComponents = $(`#${createSingleComponentsId}`);
        if ($createSingleComponents.length !== 1) {
          $createSingleComponents = $("<div/>", {
            class: "v-application",
            id: createSingleComponentsId
          }).appendTo($("body"));
        }
        $("<div/>", {
          id
        }).appendTo($createSingleComponents);
        component.$mount(`#${id}`);
        createAPI[id] = component;
      }
      return createAPI[id];
    }

    Vue.createAPI = createAPI;
  }
};
