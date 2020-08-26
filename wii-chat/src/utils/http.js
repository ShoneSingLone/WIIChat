import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import isPlainObject from "lodash/isPlainObject";

const baseURL = /shonesinglone/gi.test(window.location.href)
  ? "https://www.ventose.xyz"
  : "http://localhost:7001";
const http = axios.create({
  baseURL,
  timeout: 1000 * 180,
  withCredentials: true
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    config.headers["Accept-Language"] = Cookies.get("language") || "zh-CN";
    config.headers["token"] = Cookies.get("token") || "";

    // 默认参数
    var defaults = {};
    // 防止缓存，GET请求默认带_t参数
    if (config.method === "get") {
      config.params._t = Date.now();
    }

    if (isPlainObject(config.params)) {
      config.params = {
        ...defaults,
        ...config.params
      };
    }

    if (isPlainObject(config.data)) {
      config.data = {
        ...defaults,
        ...config.data
      };
      if (
        /^application\/x-www-form-urlencoded/.test(
          config.headers["content-type"]
        )
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */

http.interceptors.response.use(
  response => {
    if (response.data.code === 401 || response.data.code === 10001) {
      return Promise.reject(response.data.msg);
    }
    if (200 === response.status) {
      return response.data?.data;
    }
    return response;
  },
  error => Promise.reject(error.response?.data?.data || "no data")
);

export default http;
