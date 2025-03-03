// 引入 Vue 和 Vuex 以及辅助工具
import Vue from 'vue'
import Vuex from 'vuex'
import { getRequest, postRequest } from "../utils/api"
import SockJS from '../utils/sockjs'
import '../utils/stomp'
import { Notification } from 'element-ui'

// 注册 Vuex 插件
Vue.use(Vuex)

// 获取当前时间（可用于日志、调试等）
const now = new Date()

// 创建 Vuex Store
const store = new Vuex.Store({
  // 状态定义，优先使用 sessionStorage 中保存的 state
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    routes: [],           // 路由信息（用于动态菜单等）
    sessions: {},         // 聊天记录，存储各会话历史
    users: [],            // 用户列表
    currentUser: null,    // 当前登录用户
    currentSession: {     // 当前选中的会话，默认为群聊
      username: '群聊',
      nickname: '群聊'
    },
    currentList: '群聊',  // 当前聊天窗口列表（例如群聊、私聊、机器人）
    filterKey: '',        // 搜索关键字
    stomp: null,          // 存储 WebSocket（Stomp）连接对象
    isDot: {},            // 存储各会话是否有未读消息的标记（格式：当前用户#目标用户）
    errorImgUrl: "https://c-ssl.duitang.com/uploads/blog/202402/25/jJS1pp9GuemG74d.jpg",  // 错误提示图片
    shotHistory: {}       // “拍一拍”功能的记录历史
  },
  // mutations 用于同步修改状态
  mutations: {
    // 初始化路由数据
    initRoutes(state, data) {
      state.routes = data
    },
    // 切换当前会话，同时将对应未读标记设为已读
    changeCurrentSession(state, currentSession) {
      Vue.set(state.isDot, state.currentUser.username + "#" + currentSession.username, false)
      state.currentSession = currentSession
    },
    // 修改当前聊天列表（群聊、私聊、机器人）
    changeCurrentList(state, currentList) {
      state.currentList = currentList
    },
    // 保存群聊消息记录
    addGroupMessage(state, msg) {
      let message = state.sessions['群聊']
      if (!message) {
        // 若群聊记录不存在，则初始化为数组
        Vue.set(state.sessions, '群聊', [])
      }
      state.sessions['群聊'].push({
        fromId: msg.fromId,
        fromName: msg.fromName,
        fromProfile: msg.fromProfile,
        content: msg.content,
        messageTypeId: msg.messageTypeId,
        createTime: msg.createTime,
      })
    },
    // 保存单聊消息记录
    addMessage(state, msg) {
      // 使用格式 "当前用户名#目标用户名" 作为键
      let key = state.currentUser.username + "#" + msg.to
      let message = state.sessions[key]
      if (!message) {
        Vue.set(state.sessions, key, [])
      }
      state.sessions[key].push({
        content: msg.content,
        date: new Date(),
        fromNickname: msg.fromNickname,
        messageTypeId: msg.messageTypeId,
        self: !msg.notSelf  // 如果 msg.notSelf 为 true，则表示接收到的消息
      })
    },
    /**
     * 同步数据库中群聊记录，并保存到 state 中
     * 这样可以在不刷新页面的情况下持久化聊天记录
     */
    INIT_DATA(state) {
      getRequest("/groupMsgContent/").then(resp => {
        if (resp) {
          Vue.set(state.sessions, '群聊', resp)
        }
      })
    },
    // 保存所有系统用户数据
    INIT_USER(state, data) {
      state.users = data
    },
    // 从服务器获取并保存系统用户列表
    GET_USERS(state) {
      getRequest("/chat/users").then(resp => {
        if (resp) {
          state.users = resp
        }
      })
    }
  },
  // actions 用于异步操作或调用多个 mutation
  actions: {
    /**
     * 初始化数据：加载群聊记录和用户列表
     */
    initData(context) {
      context.commit('INIT_DATA')
      context.commit('GET_USERS')
    },
    /**
     * 连接 WebSocket 服务端，订阅各种消息（系统通知、群聊、机器人回复、私聊）
     */
    connect(context) {
      // 使用 SockJS 建立连接，并通过 Stomp 进行消息传输
      context.state.stomp = Stomp.over(new SockJS('/ws/ep'))
      context.state.stomp.connect({}, success => {
        // 订阅系统广播通知
        context.state.stomp.subscribe("/topic/notification", msg => {
          Notification.info({
            title: '系统消息',
            message: msg.body.substr(5),
            position: "top-right"
          })
          // 更新用户在线状态
          context.commit('GET_USERS')
        })
        // 订阅群聊消息
        context.state.stomp.subscribe("/topic/greetings", msg => {
          let receiveMsg = JSON.parse(msg.body)
          console.log("收到消息" + receiveMsg)
          // 如果当前会话不是群聊，则标记群聊有未读消息
          if (context.state.currentSession.username != "群聊") {
            Vue.set(context.state.isDot, context.state.currentUser.username + "#群聊", true)
          }
          // 保存群聊消息
          context.commit('addGroupMessage', receiveMsg)
        })
        // 订阅机器人回复消息
        context.state.stomp.subscribe("/user/queue/robot", msg => {
          let receiveMsg = JSON.parse(msg.body)
          receiveMsg.notSelf = true  // 标记为非自己发送的消息
          receiveMsg.to = '机器人'
          receiveMsg.messageTypeId = 1
          context.commit('addMessage', receiveMsg)
        })
        // 订阅私聊消息
        context.state.stomp.subscribe('/user/queue/chat', msg => {
          let receiveMsg = JSON.parse(msg.body)
          // 如果当前会话不是该发消息用户，则标记为未读
          if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
            Notification.info({
              title: '【' + receiveMsg.fromNickname + '】发来一条消息',
              message: receiveMsg.content.length < 8 ? receiveMsg.content : (receiveMsg.content.substring(0, 8) + "..."),
              position: "bottom-right"
            })
            Vue.set(context.state.isDot, context.state.currentUser.username + "#" + receiveMsg.from, true)
          }
          // 标记此消息为接收（非自己发送）
          receiveMsg.notSelf = true
          receiveMsg.to = receiveMsg.from
          context.commit('addMessage', receiveMsg)
        })
      }, error => {
        Notification.info({
          title: '系统消息',
          message: "无法与服务端建立连接，请尝试重新登陆系统~",
          position: "top-right"
        })
      })
    },
    // 断开 WebSocket 连接
    disconnect(context) {
      if (context.state.stomp != null) {
        context.state.stomp.disconnect()
        console.log("关闭连接~")
      }
    }
  }
})

// 监听 state.sessions 的变化，自动将聊天记录保存到 localStorage 中，便于持久化存储
store.watch(
    function(state) {
      return state.sessions
    },
    function(val) {
      console.log('CHANGE: ', val)
      localStorage.setItem('chat-session', JSON.stringify(val))
    },
    {
      deep: true  // 深度监控对象内部变化
    }
)

export default store
