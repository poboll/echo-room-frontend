<template>
  <div class="chatTitle">
    <!-- 左侧菜单按钮 -->
    <el-button class="leftBtn" size="small" icon="el-icon-menu"></el-button>
    <!-- 显示当前会话的昵称 -->
    <span class="titleName">
      {{ $store.state.currentSession.nickname ? $store.state.currentSession.nickname : "" }}
    </span>
    <!-- 右侧更多按钮 -->
    <el-button class="moreBtn" size="small" icon="el-icon-more"></el-button>
  </div>
</template>

<script>
export default {
  name: "chattitle"
}
</script>

<style scoped>
/* 聊天标题区域样式 */
.chatTitle {
  position: relative;
  height: 50px;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.4);
}

/* 左侧和右侧按钮样式 */
.leftBtn,
.moreBtn {
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.leftBtn:hover,
.moreBtn:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

/* 中间标题样式 */
.titleName {
  flex-grow: 1;
  text-align: center;
  margin: 0 20px;
  color: #505458;
}
</style>
