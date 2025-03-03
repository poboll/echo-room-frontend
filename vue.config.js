// 配置开发服务器的代理规则，用于解决跨域问题
let proxyObj = {};

// 配置 /ws 接口代理，ws 属性设为 false 表示关闭 WebSocket 代理，前端直接连接目标地址
proxyObj['/ws'] = {
  ws: false,
  target: "ws://localhost:8082"
};

// 配置所有 HTTP 请求的代理，保持请求协议不变，同时修改请求头部以适应跨域
proxyObj['/'] = {
  ws: false,              // 关闭 WebSocket 代理，仅代理 HTTP 请求
  target: 'http://localhost:8082',  // 目标服务器地址
  changeOrigin: true,     // 改变源，虚拟托管
  pathRewrite: {
    '^/': ''             // 重写请求路径，去除开头的斜杠
  }
};

module.exports = {
  devServer: {
    host: '0.0.0.0',      // 监听所有网卡地址
    port: 8081,           // 开发服务器端口
    proxy: proxyObj       // 使用上述代理配置
  }
};
