# ⚡ 回声谷即时通讯系统 - 前端

<p align="center">
  <img src="https://c-ssl.duitang.com/uploads/blog/202402/17/N5SG04P6iPy7qXw.jpg" width="200" alt="回声谷即时通讯系统">
  <br>
  <strong>基于 SpringBoot + Vue3 的实时通信解决方案</strong>
  <br><br>
  <a href="https://github.com/poboll/echo-room-frontend/tree/vue" target="_blank">GitHub 仓库</a>
</p>

## 🌟 项目简介

“回声谷即时通讯系统”是一个基于 SpringBoot 和 Vue3 的实时通信解决方案，支持消息必达、离线消息、语音消息、消息撤回等核心功能。前端部分采用 Vue3、TypeScript 和 Element Plus 等现代化技术栈，提供响应式、多端适配的用户界面。

## 🚀 核心特性

- **实时通信**  
  利用 WebSocket（或 Socket.IO）实现即时双向通信，确保消息快速传输。
- **离线消息支持**  
  未在线的用户可通过离线消息队列获取历史消息。
- **语音消息**  
  内置语音录制与播放功能，支持浏览器端音频采集和上传。
- **消息撤回**  
  用户可在规定时间内撤回已发送的消息，状态同步实现双端一致。
- **响应式设计**  
  前端界面采用现代化设计，支持多端自适应，界面清新、交互流畅。

## 🛠 技术栈

### 前端架构

| 模块               | 技术方案                  | 说明                                     |
| ------------------ | ------------------------- | ---------------------------------------- |
| **核心框架**       | Vue3 + TypeScript         | 现代化响应式开发，支持组件化和类型安全，便于维护与扩展 |
| **状态管理**       | Pinia 或 Vuex             | 实现跨组件状态共享，集中管理应用状态       |
| **路由管理**       | Vue Router                | 实现单页面应用的前端路由控制               |
| **UI 框架**        | Element Plus              | 丰富且现代化的 UI 组件库，提高开发效率与界面一致性 |
| **组件样式**       | SCSS                      | 更高效地编写模块化、可维护的样式           |
| **数据请求**       | Axios                     | 强大简洁的 HTTP 请求库，支持请求拦截器等   |
| **语音录制**       | Recorder.js               | 浏览器端音频采集与录制，支持语音消息上传     |
| **实时通信**       | Socket.IO / WebSocket     | 事件驱动的实时双向通信，确保消息及时传输     |
| **消息协议**       | STOMP over SockJS         | 基于 STOMP 协议，封装 WebSocket 通信，支持 ACK/NACK 与事务管理 |
| **本地数据存储**   | IndexedDB                 | 浏览器本地存储解决方案，支持离线聊天记录缓存  |
| **开发工具**       | Vue CLI, Webpack          | 快速搭建项目、代码分割、热重载和高效打包     |
| **国际化支持**     | Vue I18n (可选)           | 多语言支持，适应全球化需求                 |

### 后端接口调用

| 模块               | 技术方案                  | 说明                                     |
| ------------------ | ------------------------- | ---------------------------------------- |
| **HTTP 请求库**    | Axios                     | 封装 RESTful API 请求，统一错误处理与提示    |
| **请求拦截器**     | Axios Interceptors        | 全局统一处理请求和响应，解决接口异常及登录重定向问题 |
| **开发代理**       | Vue CLI DevServer Proxy   | 开发环境下解决跨域问题，将请求转发至后端服务器   |

### 实时通信

| 模块               | 技术方案                  | 说明                                     |
| ------------------ | ------------------------- | ---------------------------------------- |
| **WebSocket 客户端** | SockJS + STOMP           | 兼容性良好的 WebSocket 封装，支持消息订阅与发布  |
| **消息协议**       | STOMP Protocol            | 简单高效的文本协议，支持 ACK、事务和心跳机制   |

### 前端架构

| 模块         | 技术方案            | 说明                          |
| ------------ | ------------------- | ----------------------------- |
| 核心框架     | Vue3 + TypeScript   | 现代化响应式开发              |
| 状态管理     | Pinia 或 Vuex       | 跨组件状态共享                |
| UI 框架      | Element Plus        | 丰富且现代化的 UI 组件库      |
| 语音录制     | Recorder.js         | 浏览器端音频采集              |
| 实时通信     | Socket.IO / WebSocket | 事件驱动的实时通信            |
| 数据存储     | IndexedDB           | 本地缓存聊天记录              |

## 📂 项目目录结构

```
echo-room-frontend/
├── public/
│   ├── index.html         // HTML 模板（可在此修改 title 和 favicon）
│   └── ...                
├── src/
│   ├── assets/            // 静态资源，如 logo、图标等
│   ├── components/        // 业务组件（chat 相关：card.vue、message.vue、usertext.vue、toolbar.vue 等）
│   ├── router/            // 前端路由配置
│   ├── store/             // 状态管理（Vuex/Pinia 配置）
│   ├── utils/             // 工具函数及 API 封装（api.js、sockjs.js、stomp.js 等）
│   ├── views/             // 页面级组件（如 ChatRoom.vue、Login.vue 等）
│   └── main.js            // 入口文件
├── .gitignore
├── babel.config.js
├── package.json
└── README.md              // 本文档
```

## 📝 安装与使用

1. **克隆仓库**

   ```bash
   git clone -b vue https://github.com/poboll/echo-room-frontend.git
   cd echo-room-frontend
   ```

2. **安装依赖**

   ```bash
   npm install
   # 或 yarn install
   ```

3. **启动开发服务器**

   ```bash
   npm run serve
   # 或 yarn serve
   ```

   访问 [http://localhost:8081](http://localhost:8080) 预览项目。

4. **打包构建**

   ```bash
   npm run build
   # 或 yarn build
   ```

## 🎨 UI 设计理念

- **现代简洁**  
  采用亚克力风背景、透明效果以及流畅的过渡动画，打造极简而不简单的用户体验。
- **响应式布局**  
  无论是 PC 端还是移动端，都能获得良好的适配效果。

## 🔗 相关链接

- **后端仓库**： [https://github.com/poboll/echo-room-backend](https://github.com/poboll/echo-room-backend)
- **详细文档**： [架构设计文档](./docs/ARCHITECTURE.md)
- **联系作者**： caiths@icloud.com

---

欢迎大家一起参与讨论、改进和优化“回声谷即时通讯系统”，期待你的反馈和建议！

## 参考
https://github.com/is-liyiwei/vue-Chat-demo
