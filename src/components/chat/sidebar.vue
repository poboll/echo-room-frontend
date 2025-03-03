<template>
  <div class="sidebar">
    <!-- 顶部三色圆点，模拟 Mac 窗口控制按钮 -->
    <div class="mac-controls">
      <span class="circle circle-red"></span>
      <span class="circle circle-yellow"></span>
      <span class="circle circle-green"></span>
    </div>

    <!-- 头像区域：显示当前登录用户的头像和未读消息徽标 -->
    <div class="avatar-section">
      <el-badge :value="unreadCount" class="badge" type="danger" v-if="unreadCount > 0">
        <el-image
            class="avatar"
            :src="user.userProfile"
            fit="cover"
            :preview-src-list="[user.userProfile]"
        />
      </el-badge>
      <el-image
          class="avatar"
          v-else
          :src="user.userProfile"
          fit="cover"
          :preview-src-list="[user.userProfile]"
      />
    </div>

    <!-- 图标列表：切换聊天列表 -->
    <div class="icon-list">
      <!-- 群聊图标 -->
      <el-tooltip effect="dark" content="群聊" placement="right">
        <div class="icon-item" @click="chooseChatList('群聊')">
          <i class="fa fa-comments fa-2x" aria-hidden="true"></i>
        </div>
      </el-tooltip>

      <!-- 私聊图标 -->
      <el-tooltip effect="dark" content="私聊" placement="right">
        <div class="icon-item" @click="chooseChatList('私聊')">
          <i class="fa fa-address-book-o fa-2x" aria-hidden="true"></i>
        </div>
      </el-tooltip>

      <!-- 机器人图标 -->
      <el-tooltip effect="dark" content="机器人" placement="right">
        <div class="icon-item" @click="chooseChatList('机器人')">
          <i class="fa fa-android fa-2x" aria-hidden="true"></i>
        </div>
      </el-tooltip>

      <!-- 个人中心图标 -->
      <el-tooltip effect="dark" content="个人中心" placement="right">
        <div class="icon-item">
          <i class="fa fa-user fa-2x" aria-hidden="true"></i>
        </div>
      </el-tooltip>
    </div>

    <!-- 底部菜单：汉堡图标 -->
    <div class="bottom-menu">
      <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      // 从 sessionStorage 获取当前用户信息
      user: JSON.parse(window.sessionStorage.getItem('user')),
      // 示例未读消息数量，可用 Vuex 中的数据替换
      unreadCount: 15
    }
  },
  methods: {
    // 切换聊天列表，调用 Vuex mutation 更新 currentList
    chooseChatList (listName) {
      this.$store.commit("changeCurrentList", listName);
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 60px;
  height: 100vh;
  background: rgba(236, 234, 232, 0.25); /* 与 card.vue、list.vue 一致 */
  backdrop-filter: blur(10px);            /* 毛玻璃效果 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 8px;
  padding: 10px 0;
}

/* 顶部三色圆点 */
.mac-controls {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  .circle {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 4px;
  }
  .circle-red {
    background-color: #ff5f57;
  }
  .circle-yellow {
    background-color: #ffbd2e;
  }
  .circle-green {
    background-color: #28c840;
  }
}

/* 头像区域 */
.avatar-section {
  margin: 10px 0;
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: block;
  }
  .badge {
    display: inline-block;
  }
}

/* 图标列表 */
.icon-list {
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-item {
    width: 40px;
    height: 40px;
    margin: 12px 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    transition: background-color 0.2s;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
    &:hover {
      background-color: #dcdcdc;
    }
  }
}

/* 底部菜单按钮 */
.bottom-menu {
  margin-bottom: 20px;
  cursor: pointer;
  color: #555;
  &:hover {
    color: #333;
  }
  i {
    margin: 0 10px;
  }
}
</style>
