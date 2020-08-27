import qs from "qs";
const prefix = "wcls_";
export const ls = new Proxy(
  {},
  {
    get(target, property) {
      return qs.parse(localStorage[`${prefix}${property}`]).value;
    },
    set: function(target, property, value) {
      localStorage[`${prefix}${property}`] = qs.stringify({
        value
      });
      return true;
    }
  }
);
