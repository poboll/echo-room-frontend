// 引入 Vue 框架
import Vue from 'vue'
// 引入根组件
import App from './App.vue'
// 引入路由实例
import router from './router'
// 引入 Element UI 组件库及其样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 Vuex 状态管理实例
import store from './store/index';
// 引入 Font-Awesome 字体图标库样式
import 'font-awesome/css/font-awesome.min.css';

// --- 全局封装请求方法 ---
// 从 ./utils/api 模块中导入封装好的 HTTP 请求方法（axios封装）
import { postKeyValueRequest, postRequest, getRequest, putRequest, deleteRequest } from "./utils/api";
// 将请求方法挂载到 Vue 的原型上，方便在组件内通过 this.postRequest 等方式调用
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

/*
  路由前置守卫，用于对路由进行统一的权限控制和跳转判断：
  - 如果目标路由为登录页（"/" 或 "/adminlogin"），直接放行。
  - 如果目标为 "/home" 且 sessionStorage 中没有 admin 信息，则提示无权限，回退至上一个路由。
  - 否则，只有在登录状态（sessionStorage 中存在 user 或 admin）下放行，
    否则提示登录后访问，并跳转到登录页，同时记录重定向路径。
*/
router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/adminlogin") {
    // 首页和管理端登录页面无需验证权限
    next();
  } else if (to.path === "/home" && !window.sessionStorage.getItem('admin')) {
    ElementUI.Message.error({ message: "不具有访问权限！" });
    next(from);
  } else {
    if (window.sessionStorage.getItem('user') || window.sessionStorage.getItem('admin')) {
      // 已登录状态，允许访问其他页面
      next();
    } else {
      // 未登录状态，提示并跳转到登录页，同时附带重定向参数
      ElementUI.Message.error({ message: "请登录后访问！" });
      next('/?redirect=' + to.path);
    }
  }
});

// 关闭生产提示
Vue.config.productionTip = false;
// 全局使用 ElementUI
Vue.use(ElementUI);

// 创建 Vue 根实例，将 router 和 store 注入，并渲染根组件 App
new Vue({
  router,
  store, // 注入 Vuex 状态管理
  render: h => h(App)
}).$mount('#app');

// 导出 Babel 配置（如果在此文件中配置 Babel，也可放在单独的 .babelrc 文件中）
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
