# Brumaire

名字什么的很难想，就按星座来吧（略略略）

## 背景

A PWA base on VUE。源于社群里一句：需要规范提问的格式。可能已经有满足类似需求的应用，可我偏偏不喜欢，就想自己撸一个。于是决定抡起袖子开干，参考X乎。问答、聊天、文章聚合...（感觉装X有点过头了，先就这样吧...匿了）

~~没有测试代码，嗯，没有测试...~~

- [Workbox webpack Plugins](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use)
- [当 better-scroll 遇见 Vue:原生JS插件在Vue框架内的转换](https://zhuanlan.zhihu.com/p/27407024)
- better-scroll使用的要点：wrapper大小时限定的；DOM结构已经固定；wrapper里的第一个元素，一般是UL

## 需求

- [ ] 登录
  - [ ] 注册
  - [ ] 第三方登录
- [ ] 聊天
- [ ] 问答
  - [ ] 问题展示
  - [ ] 提问
  - [ ] 回答
- [ ] 个人中心
- [ ] 周刊
- [ ] 其他
  - [ ] 数据分析(伪)（图表应用）
    - [ ] 查找潜水员：可以统计成员聊天的数据啥的，发言频率，主题词
    - [ ] 贡献排行系统  

## 概要设计

- 组件首字母大写、驼峰
- `c-button`c代表custom

## 详细设计

## 实现

- UI 使用 `npm install @material -D`
  - material design component 的layout使用grid，采用的是Bootstrap的container row cell 系统
- [喜欢的MDC为什么不用？太先进了，受不了受不了](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)

panel 用了 md 的 btn

登录：[Authorizing OAuth Apps](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

location.href 通常被用来跳转到指定页面地址;
location.replace 方法则可以实现用新的文档替换当前文档;
location.replace 方法不会在 history 对象中生成一个新的记录。

## ~~测试~~

## 部署
