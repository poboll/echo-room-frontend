# ⚡ 回声谷即时通讯系统 - 前端 (Next.js 版)

<p align="center">
  <img src="https://c-ssl.duitang.com/uploads/blog/202402/17/N5SG04P6iPy7qXw.jpg" width="200" alt="回声谷即时通讯系统">
  <br>
  <strong>基于 SpringBoot + Next.js 的实时通信解决方案</strong>
  <br><br>
  <a href="https://github.com/poboll/echo-room-frontend" target="_blank">GitHub 仓库</a>
</p>

## 🌟 项目简介

“回声谷即时通讯系统”是一个实时通信解决方案，前后端分离，后端基于 SpringBoot 提供 API 接口，前端则采用 Next.js、React 与 TypeScript 开发，致力于打造消息必达、离线消息、语音消息、消息撤回等功能完善的通信平台。该项目针对多端响应式设计，实现了现代化、简洁高效的用户体验。

## 🚀 核心特性

- **实时通信**  
  利用 WebSocket 或 Socket.IO 实现即时双向通信，确保消息快速传输。
- **离线消息支持**  
  用户下线后可通过离线消息队列获取历史消息，保证消息不丢失。
- **语音消息**  
  内置语音录制与播放功能，支持浏览器端音频采集及上传处理。
- **消息撤回**  
  支持用户在规定时间内撤回已发送消息，状态即时同步到所有终端。
- **响应式设计**  
  采用 Next.js 的服务端渲染和动态路由技术，适配 PC 端和移动端设备。

## 🛠 技术栈

### 前端架构

| 模块               | 技术方案                     | 说明                                              |
| ------------------ | ---------------------------- | ------------------------------------------------- |
| **核心框架**       | Next.js + React + TypeScript | 基于 React 的服务端渲染框架，类型安全、高性能开发     |
| **状态管理**       | Redux Toolkit / Context API  | 实现全局状态管理，便于组件间数据共享与维护            |
| **路由管理**       | Next.js 内置路由             | 自动基于 `pages` 目录生成路由，简化路由配置             |
| **UI 框架**        | Ant Design / Tailwind CSS    | 现代化 UI 组件库，助力快速构建响应式用户界面           |
| **组件样式**       | SCSS / CSS Modules           | 模块化、可维护的样式方案，便于大规模样式管理           |
| **数据请求**       | Axios                        | 强大且易用的 HTTP 请求库，支持拦截器及错误处理         |
| **语音录制**       | Recorder.js                  | 浏览器端音频采集与录制，支持语音消息功能               |
| **实时通信**       | Socket.IO / WebSocket        | 实现事件驱动的实时双向通信，确保消息即时传输            |
| **消息协议**       | STOMP over SockJS            | 封装 WebSocket 通信，支持 ACK/NACK 与事务管理           |
| **本地数据存储**   | IndexedDB / localForage      | 浏览器本地存储解决方案，支持离线聊天记录缓存            |
| **开发工具**       | Next.js CLI, Webpack         | 快速构建、热更新、代码分割及高效打包                  |
| **国际化支持**     | next-i18next (可选)          | 支持多语言国际化，满足全球用户需求                   |

### 后端接口调用

| 模块               | 技术方案                     | 说明                                                  |
| ------------------ | ---------------------------- | ----------------------------------------------------- |
| **HTTP 请求库**    | Axios                        | 封装 RESTful API 请求，统一处理错误和状态码            |
| **请求拦截器**     | Axios Interceptors           | 全局统一处理请求与响应，处理接口异常及登录重定向问题      |
| **开发代理**       | Next.js API Routes / Proxy   | 开发环境下支持跨域代理，将请求转发至后端服务器            |

### 实时通信

| 模块                  | 技术方案                     | 说明                                                 |
| --------------------- | ---------------------------- | ---------------------------------------------------- |
| **WebSocket 客户端**  | Socket.IO / 原生 WebSocket   | 实现高效、稳定的实时双向通信，支持消息订阅与发布           |
| **消息协议**          | STOMP Protocol               | 简单高效的文本协议，支持 ACK、事务和心跳机制              |

## 📂 项目目录结构

```
echo-room-frontend/
├── public/                  // 静态资源，如图片、favicon 等
├── pages/                   // Next.js 页面路由（如 chat.js、login.js 等）
├── components/              // 业务组件（聊天窗口、消息气泡、工具栏等）
├── styles/                  // 全局及模块化样式文件
├── utils/                   // 工具函数及 API 封装（axios 实例、socket 客户端、STOMP 封装等）
├── next.config.js           // Next.js 配置文件
├── package.json
└── README.md                // 项目说明文档
```

## 📝 安装与使用

1. **克隆仓库**

   ```bash
   git clone https://github.com/poboll/echo-room-frontend.git
   cd echo-room-frontend
   ```

2. **安装依赖**

   ```bash
   npm install
   # 或者使用 yarn install
   ```

3. **启动开发服务器**

   ```bash
   npm run dev
   # 或者 yarn dev
   ```

   打开浏览器访问 [http://localhost:3000](http://localhost:3000) 预览项目。

4. **打包构建**

   ```bash
   npm run build
   npm start
   # 或者使用 yarn build && yarn start
   ```

## 🎨 UI 设计理念

- **现代简洁**  
  采用极简设计风格与流畅动画，提供清新、直观的用户体验。
- **响应式布局**  
  无论是 PC 端还是移动端，都能获得良好的适配与展示效果。

## 🔗 相关链接

- **后端仓库**： [https://github.com/poboll/echo-room-backend](https://github.com/poboll/echo-room-backend)
- **详细文档**： [架构设计文档](./docs/ARCHITECTURE.md)
- **联系作者**： caiths@icloud.com

---

欢迎大家一起参与讨论、改进和优化“回声谷即时通讯系统”，期待你的反馈和建议！

---

参考：[https://github.com/is-liyiwei/vue-Chat-demo](https://github.com/is-liyiwei/vue-Chat-demo)

