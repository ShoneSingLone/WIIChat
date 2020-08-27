import $ from "jquery";
import Vue from "vue";
const $createSingleComponents = $("<div/>", {
  id: "create-single-components"
}).appendTo($("body"));

export function createAPI(id, Component) {
  id = `create-single-component-${id}`;
  const element = $(id);
  if (element.length !== 1) {
    const component = new Vue(Component);
    $("<div/>", { id }).appendTo($createSingleComponents);
    component.$mount(`#${id}`);
    createAPI[id] = component;
  }
  return createAPI[id];
}
