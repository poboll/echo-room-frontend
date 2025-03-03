// 引入 Vue 和 VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入各页面组件
import Login from '../views/chat/Login'
import ChatRoom from '../views/chat/ChatRoom'
import AdminLogin from '../views/admin/AdminLogin'
import Home from '../views/admin/Home'
import UserInfo from '../views/admin/UserInfo'
import GroupChatRecord from '../views/admin/GroupChatRecord'
import PrivateChatRecord from '../views/admin/PrivateChatRecord'

// 注册 VueRouter 插件
Vue.use(VueRouter)

// 定义路由规则，每个路由对应一个组件
const routes = [
  {
    // 登录页面（默认路由）
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true  // 隐藏此路由（例如侧边菜单不显示）
  },
  {
    // 聊天室页面
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom,
    hidden: true
  },
  {
    // 后台登录页面
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLogin,
    hidden: true
  },
  {
    // 后台主页
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true
  },
  {
    // 用户管理模块：路由地址依然为 /home，由 Home 组件作为父容器，子路由为用户信息管理
    path: '/home',
    name: '用户管理',
    component: Home,
    iconCls: "fa fa-user", // 菜单图标样式
    children: [{
      path: '/userinfo',
      name: '用户信息管理',
      component: UserInfo,
    }]
  },
  {
    // 聊天记录管理模块：包含群聊记录和私聊记录的子路由
    path: '/home',
    name: '聊天记录管理',
    iconCls: 'fa fa-book',
    component: Home,
    children: [
      {
        path: '/groupChatRecord',
        name: '群聊记录管理',
        component: GroupChatRecord
      },
      {
        path: '/privateChatRecord',
        name: '私聊记录管理',
        component: PrivateChatRecord
      }
    ]
  }
]

// 解决路由重复访问报错（Vue Router 3.0 版本可能出现此问题）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 创建路由实例并传入路由规则
const router = new VueRouter({
  routes
})

// 导出路由实例
export default router
