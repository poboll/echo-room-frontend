<template>
  <div id="list">
    <!-- 当当前会话为“群聊”时，显示群聊列表 -->
    <ul v-if="currentList=='群聊'">
      <p class="list-title">群聊列表</p>
      <!-- 列表项：点击切换至群聊 -->
      <li :class="{ active: currentSession ? currentSession.username==='群聊' : false }" @click="changeCurrentSession(chatObj)">
        <img class="avatar" src="http://10.3.36.16:888/group1/M00/00/00/CgMkEGfCc-WANTWpAABTZWOctas12.jpeg">
        <!-- 使用 el-badge 显示未读消息提示 -->
        <el-badge :is-dot="isDot[user.username+'#群聊']">
          <p class="name">群聊</p>
        </el-badge>
      </li>
    </ul>
    <!-- 当当前会话为“机器人”时，显示机器人选项 -->
    <ul v-if="currentList=='机器人'">
      <p class="list-title">快来和机器人聊天吧！</p>
      <li :class="{ active: currentSession ? currentSession.username==='机器人' : false }" @click="changeCurrentSession(robotObj)">
        <img class="avatar" src="default_head.jpg">
        <p class="name">喵内（复读机）</p>
      </li>
    </ul>
    <!-- 当当前会话为“私聊”时，显示用户列表，使用 el-scrollbar 自定义滚动条 -->
    <el-scrollbar wrap-class="userList" wrap-style="height:600px;" view-style="height:100%;" :native="false">
      <ul v-if="currentList=='私聊'">
        <p class="list-title">用户列表</p>
        <li v-for="item in users" :class="{ active: currentSession ? item.username === currentSession.username : false }" @click="changeCurrentSession(item)">
          <div class="user-item">
            <div class="user-info">
              <el-badge :is-dot="isDot[user.username+'#'+item.username]">
                <el-image class="avatar"
                          :preview-src-list="[item.userProfile]"
                          :src="item.userProfile"
                          :alt="item.nickname">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-badge>
              <p class="name">{{item.nickname}}</p>
            </div>
            <!-- 使用 el-badge 显示用户在线状态 -->
            <el-badge :value="item.userStateId==1 ? '在线' : '离线'" :type="item.userStateId==1 ? 'danger' : 'info'"></el-badge>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      // 当前登录用户信息从 Vuex state 中获取
      user: this.$store.state.currentUser,
      // 群聊对象，用于切换至群聊
      chatObj: { username: '群聊', nickname: '群聊' },
      // 机器人对象
      robotObj: {
        username: '机器人',
        nickname: '机器人',
        userProfile: 'default_head.jpg'
      }
    }
  },
  computed: mapState([
    'users',
    'currentSession',
    'isDot',
    'currentList'
  ]),
  methods: {
    // 切换当前会话，调用 Vuex mutation
    changeCurrentSession (currentSession) {
      this.$store.commit('changeCurrentSession', currentSession)
    }
  }
}
</script>

<style lang="scss" scoped>
#list {
  background: rgba(255, 255, 255, 0.2); /* 半透明背景 */
  backdrop-filter: blur(10px);         /* 毛玻璃效果 */
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  ul {
    margin: 0;
    padding: 0;
  }
  .list-title {
    padding: 5px 10px;
    font-size: 14px;
    color: #505458;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    margin-bottom: 10px;
  }
  li {
    padding: 10px;
    list-style: none;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s;
    &:hover {
      background-color: #D8D6D6;
    }
    &.active {
      background-color: #C8C6C6;
    }
    display: flex;
    align-items: center;
  }
  .avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .name {
    font-size: 16px;
    color: #333;
  }
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .user-info {
    display: flex;
    align-items: center;
  }
  .userList {
    max-height: 600px;
  }
}
</style>
