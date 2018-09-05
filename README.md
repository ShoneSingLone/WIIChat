# Brumaire不正经描述文档

名字什么的真的很难想，要不就按星座来吧（略略略）

## 背景

A PWA base on VUE。源于社群里一句：需要规范提问的格式。可能已经有满足类似需求的应用，可**我偏偏不喜欢，就想自己撸一个**。于是决定抡起袖子开干，参考X乎。问答、聊天、文章聚合...（感觉装X有点过头了，先就这样吧...匿了）

~~没有测试代码，嗯，没有测试...~~

- [当 better-scroll 遇见 Vue:原生JS插件在Vue框架内的转换](https://zhuanlan.zhihu.com/p/27407024)
- better-scroll使用的要点：wrapper大小时必须是限定的（明确的）；DOM结构已经固定；wrapper里的第一个元素，一般是UL。另外，动画也是有影响的，具体有空真真正正拜读一下前辈源码。先就这样吧...

## 需求

- [ ] 登录
  - [ ] 注册
  - [ ] 第三方登录
- [ ] 聊天
  - [ ] timeLine的方式，即顶级的是时间线（世界），然后在时间线上抛出一个话题（喊话），愿意讨论的成员（可以通过邀请来提醒）会进入这个话题下进行讨论而不会扰乱顶级的时间线，（没几分钟就99+还全是吹水，你说吓人不吓人）。
  - [ ] 在顶级时间线只能抛话题，在子话题可以再抛话题，也可以直接开聊。
- [ ] 问答
  - [ ] 问题展示
  - [ ] 提问
  - [ ] 回答
- [ ] 个人中心
- [ ] ~~周刊~~Article：可以聚合，也可以自己产出，提倡————由一个问题引发的论文（误）建设性提问，发散性回答。可作为答案，同时也作为个人文章（所以你知道答案吹水是会被钉在耻辱柱上的）。某message为了点链接还要点击原链接，这种操作还TM是互联网？互联网处在石器时代都没这么操作的。所以，自己撸一个，学会用脚投票，意识要有。绝不向流量低头喊爸爸，兽人永不为奴（严肃脸）。
- [ ] 其他
  - [ ] 数据分析(伪)（图表应用）
    - [ ] 查找潜水员：可以统计成员聊天的数据啥的，发言频率，主题词
    - [ ] 贡献排行系统  
- [ ] 感觉自己要撸一个搜索引擎似的，阔怕。反正需求放这儿，爱撸不撸
- [ ] 后台总要有一个吧

## 概要设计

就想做一个渐进式Web应用（喜欢PWA的理由，凡事完美不可求，成不亦可一蹴而就，但要报以持之以恒不断改进臻至完美之心）

- PWA了解一下
- [Workbox webpack Plugins](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use)

### 登录

- 讲道理，不登录也是可以进入Home界面，但是默认重定向到Login界面；
- 注册是没有的，反正我的账号是直接改的数据库。
- 主要是（目前唯一）GitHub授权第三方登录。

### Article

- Weekly部分需要从GitHub Download到数据库才好做分析
  - 什么时候刷新呢？
  - 非常暴力，直接覆盖刷新（先就这样吧）
- APP就从数据库读取就行
  - 是不是要考虑IndexedDB的使用（是不是任性，默认都支持？）

### 聊天

[仿微信IM软件的客户端数据库设计](https://segmentfault.com/q/1010000004294504)

## 详细设计

- 数据库flag更新日期，client在有网情况下都会请求这个flag，如果不一致则请求数据库数据，否则使用本地缓存即可
  - 还要考虑请求数据后的用户更新：如何保证当前状态的平稳更新？

### 状态管理

- 状态管理，ToolBar根据HomeState 的currentShow，决定自身应该展示的menu
  - HomeState根据各模块isShow决定 currentShow
  - 各模块isShow是共享的状态
  - ToolBar and NavBar 的显隐独立控制isShowToolBar、isShowNavBar
  - 初始化的时候为“home.article"
    - 在Home中监听$route的变化，to的name即为currentShow
    - 各个Page监听currentShow的变化，切换各部分show状态
  - Detail 如果是新的，就margin-top和scrollTop都要重置

### asdf

## 实现

- 组件首字母大写、驼峰
- `c-button`c代表custom
- UI 使用 `npm install @material -D`
  - material design component 的layout使用grid，采用的是Bootstrap的container row cell 系统
- [喜欢的MDC为什么不用？太先进了，受不了受不了](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)
- [Mongoose 分页查询优化、获取数据总长度](https://www.cnblogs.com/fayin/p/7028466.html)
- [MongoDB 分页查询的方法及性能](https://www.cnblogs.com/capqueen/p/MongoDBPagination.html)

- vee-validate 一个轻量级的 vue表单验证插件

```js
npm install vee-validate --save

import VeeValidate from 'vee-validate';

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  strict: true,
  validity: false,
};

Vue.use(VeeValidate, config);

```

几个关键点：什么时候触发验证？验证不通过，何时在何处显示何内容？如何customize？

panel 用了 md 的 btn

location.href 通常被用来跳转到指定页面地址;
location.replace 方法则可以实现用新的文档替换当前文档;
location.replace 方法不会在 history 对象中生成一个新的记录。

### Article

beforePullUp 和 beforePullDown流程是一样的

- 为进入触发区 beforePullUp：false && pullUpTrigger：false
- 进入触发区未触发 beforePullUp：true && pullUpTrigger：false
- 触发 beforePullUp：true && pullUpTrigger：true

- 点击read按钮，setDetail相关数据，转换open状态

~ + 选择符的应用，羡慕玩转[禅意花园](http://www.csszengarden.com/tr/zh-cn/)的大师，看山不是山，随心所欲。（主要是指：一、设计不出漂亮的UI；二、不能根据已有结构设计出漂亮的UI；三、不能根据已有结构设计并实现漂亮的UI）

## ~~测试~~

## 部署
