<template>
  <div id="toolbar">
    <!-- 显示当前用户头像 -->
    <el-image class="imgProfile"
              :src="user.userProfile"
              :preview-src-list="[user.userProfile]"
              :alt="user.nickname">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>

    <!-- 按钮组 -->
    <div id="btnBar">
      <!-- 顶部按钮组 -->
      <div class="topBtnBar">
        <!-- 聊天按钮 -->
        <el-tooltip effect="dark" content="聊天" placement="right">
          <el-badge :value="unreadChat" class="badge" type="danger" v-if="unreadChat > 0">
            <div @click="updateCurrentList('群聊')" class="toolBtn" :class="{ active: currentList === '群聊' }">
              <svg class="icon" viewBox="0 0 1109 1024" width="24" height="24">
                <path d="M864 11.377778H230.4C113.066667 11.377778 11.377778 113.066667 11.377778 230.4v438.044444c0 117.333333 101.688889 219.022222 219.022222 219.022223h23.466667s0 7.822222 7.822222 7.822222l86.044444 93.866667c15.644444 15.644444 39.111111 15.644444 46.933334 0l78.222222-86.044445 7.822222-7.822222h383.288889c117.333333 0 219.022222-101.688889 219.022222-219.022222V230.4c0-117.333333-101.688889-219.022222-219.022222-219.022222zM246.044444 535.466667C199.111111 535.466667 167.822222 496.355556 167.822222 449.422222s39.111111-86.044444 86.044445-86.044444S339.911111 402.488889 339.911111 449.422222c-7.822222 46.933333-46.933333 86.044444-93.866667 86.044445z m297.244445 0c-46.933333 0-86.044444-39.111111-86.044445-86.044445s39.111111-86.044444 86.044445-86.044444 86.044444 39.111111 86.044444 86.044444-39.111111 86.044444-86.044444 86.044445z m305.066667 0c-46.933333 0-86.044444-39.111111-86.044445-86.044445s39.111111-86.044444 86.044445-86.044444S934.4 402.488889 934.4 449.422222c-7.822222 46.933333-46.933333 86.044444-86.044444 86.044445z" fill="#BBBBBB"/>
              </svg>
            </div>
          </el-badge>
          <div v-else @click="updateCurrentList('群聊')" class="toolBtn" :class="{ active: currentList === '群聊' }">
            <svg class="icon" viewBox="0 0 1109 1024" width="24" height="24">
              <path d="M864 11.377778H230.4C113.066667 11.377778 11.377778 113.066667 11.377778 230.4v438.044444c0 117.333333 101.688889 219.022222 219.022222 219.022223h23.466667s0 7.822222 7.822222 7.822222l86.044444 93.866667c15.644444 15.644444 39.111111 15.644444 46.933334 0l78.222222-86.044445 7.822222-7.822222h383.288889c117.333333 0 219.022222-101.688889 219.022222-219.022222V230.4c0-117.333333-101.688889-219.022222-219.022222-219.022222zM246.044444 535.466667C199.111111 535.466667 167.822222 496.355556 167.822222 449.422222s39.111111-86.044444 86.044445-86.044444S339.911111 402.488889 339.911111 449.422222c-7.822222 46.933333-46.933333 86.044444-93.866667 86.044445z m297.244445 0c-46.933333 0-86.044444-39.111111-86.044445-86.044445s39.111111-86.044444 86.044445-86.044444 86.044444 39.111111 86.044444 86.044444-39.111111 86.044444-86.044444 86.044445z m305.066667 0c-46.933333 0-86.044444-39.111111-86.044445-86.044445s39.111111-86.044444 86.044445-86.044444S934.4 402.488889 934.4 449.422222c-7.822222 46.933333-46.933333 86.044444-86.044444 86.044445z" fill="#BBBBBB"/>
            </svg>
          </div>
        </el-tooltip>

        <!-- 通讯录按钮 -->
        <el-tooltip effect="dark" content="通讯录" placement="right">
          <el-badge :value="unreadContacts" class="badge" type="danger" v-if="unreadContacts > 0">
            <div @click="updateCurrentList('私聊')" class="toolBtn" :class="{ active: currentList === '私聊' }">
              <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
                <path d="M745.2 865.4H172.1c-47.8 0-86.8-38.9-86.8-86.8v-12.4c0-41 28.4-72.8 75.9-85.3 26.6-7 90.3-42 170.4-93.8 11.4-7.4 18.2-19.8 18.2-33.3v-17.2c0-9-7.8-15.9-11.2-18.4-42.8-32.4-67.4-81.6-67.4-135v-55.1c0-50.8 22.6-98.5 62.1-130.9 39.4-32.4 90.8-45.2 141.1-35.1C552.9 177.7 610 249.9 610 333.7v49.5c0 55.7-27.8 107.8-74.3 139.4-3.7 2.5-12.5 9.5-12.5 19.1v7.5c0 14.6 8 28 20.8 34.8 99.2 53.1 177.8 89.2 210.4 96.4 47 10.5 77.5 44.2 77.5 85.7v12.4c0.1 47.9-38.8 86.9-86.7 86.9zM440.6 244c-19.3 0-37.7 6.5-53 19.1-19.7 16.2-31 39.9-31 65v55.1c0 26.4 12.2 50.8 33.5 66.9 28.6 21.7 45 53.2 45 86.5v17.2c0 42.6-21.4 81.9-57.3 105-92.5 59.7-158.1 94.9-195.1 104.6-8.6 2.2-12.6 5.1-13.4 6l1.2 9.2 574.6 1.4 1.4-13.4c-0.5 0.8-4.1-1.4-10.6-2.9-52.4-11.7-155.2-63.2-232.1-104.5-40.6-21.8-65.8-63.9-65.8-110.1v-7.5c0-35.4 18.2-68.1 49.8-89.7 23.2-15.7 37-41.5 37-68.9v-49.5c0-42.6-28.7-80.4-66.9-87.9-5.8-1.1-11.5-1.6-17.3-1.6z m498.1 84c0-23.6-19.1-42.7-42.7-42.7H725.3c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7H896c23.6 0 42.7-19.1 42.7-42.7z m0 128c0-23.6-19.1-42.7-42.7-42.7H768c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7h128c23.6 0 42.7-19.1 42.7-42.7z m0 128c0-23.6-19.1-42.7-42.7-42.7h-42.7c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7H896c23.6 0 42.7-19.1 42.7-42.7z" fill="#515151"/>
              </svg>
            </div>
          </el-badge>
          <div v-else @click="updateCurrentList('私聊')" class="toolBtn" :class="{ active: currentList === '私聊' }">
            <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M745.2 865.4H172.1c-47.8 0-86.8-38.9-86.8-86.8v-12.4c0-41 28.4-72.8 75.9-85.3 26.6-7 90.3-42 170.4-93.8 11.4-7.4 18.2-19.8 18.2-33.3v-17.2c0-9-7.8-15.9-11.2-18.4-42.8-32.4-67.4-81.6-67.4-135v-55.1c0-50.8 22.6-98.5 62.1-130.9 39.4-32.4 90.8-45.2 141.1-35.1C552.9 177.7 610 249.9 610 333.7v49.5c0 55.7-27.8 107.8-74.3 139.4-3.7 2.5-12.5 9.5-12.5 19.1v7.5c0 14.6 8 28 20.8 34.8 99.2 53.1 177.8 89.2 210.4 96.4 47 10.5 77.5 44.2 77.5 85.7v12.4c0.1 47.9-38.8 86.9-86.7 86.9zM440.6 244c-19.3 0-37.7 6.5-53 19.1-19.7 16.2-31 39.9-31 65v55.1c0 26.4 12.2 50.8 33.5 66.9 28.6 21.7 45 53.2 45 86.5v17.2c0 42.6-21.4 81.9-57.3 105-92.5 59.7-158.1 94.9-195.1 104.6-8.6 2.2-12.6 5.1-13.4 6l1.2 9.2 574.6 1.4 1.4-13.4c-0.5 0.8-4.1-1.4-10.6-2.9-52.4-11.7-155.2-63.2-232.1-104.5-40.6-21.8-65.8-63.9-65.8-110.1v-7.5c0-35.4 18.2-68.1 49.8-89.7 23.2-15.7 37-41.5 37-68.9v-49.5c0-42.6-28.7-80.4-66.9-87.9-5.8-1.1-11.5-1.6-17.3-1.6z m498.1 84c0-23.6-19.1-42.7-42.7-42.7H725.3c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7H896c23.6 0 42.7-19.1 42.7-42.7z m0 128c0-23.6-19.1-42.7-42.7-42.7H768c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7h128c23.6 0 42.7-19.1 42.7-42.7z m0 128c0-23.6-19.1-42.7-42.7-42.7h-42.7c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7H896c23.6 0 42.7-19.1 42.7-42.7z" p-id="1488" fill="#808080"></path>            </svg>
          </div>
        </el-tooltip>

        <!-- 机器人按钮 -->
        <el-tooltip effect="dark" content="机器人" placement="right">
          <el-badge :value="unreadRobot" class="badge" type="danger" v-if="unreadRobot > 0">
            <div @click="updateCurrentList('机器人')" class="toolBtn" :class="{ active: currentList === '机器人' }">
              <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
                <path d="M448 64a112 112 0 0 1 111.936 108.16l0.064 3.84v108.928l65.472-65.6a16 16 0 0 1 22.656 0l44.608 44.736a16 16 0 0 1 0 22.592L595.584 384H832a96 96 0 0 1 95.936 92.416l0.064 3.584v384a96 96 0 0 1-92.416 95.936L832 960H192a96 96 0 0 1-95.936-92.416L96 864v-384a96 96 0 0 1 92.416-95.936L192 384h236.416L331.264 286.656a16 16 0 0 1 0-22.592l44.608-44.736a16 16 0 0 1 22.656 0L464 284.928V176a16 16 0 0 0-14.08-15.872L448 160H176a16 16 0 0 1-16-16v-64A16 16 0 0 1 176 64m640 416h-608a16 16 0 0 0-15.872 14.08L192 496v352a16 16 0 0 0 14.08 15.872l1.92 0.128h608a16 16 0 0 0 15.872-14.08l0.128-1.92v-352a16 16 0 0 0-16-16zM416 592v160H320v-160h96z m288 0v160H608v-160H704z" fill="#8a8a8a"/>
              </svg>
            </div>
          </el-badge>
          <div v-else @click="updateCurrentList('机器人')" class="toolBtn" :class="{ active: currentList === '机器人' }">
            <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M448 64a112 112 0 0 1 111.936 108.16l0.064 3.84v108.928l65.472-65.6a16 16 0 0 1 22.656 0l44.608 44.736a16 16 0 0 1 0 22.592L595.584 384H832a96 96 0 0 1 95.936 92.416l0.064 3.584v384a96 96 0 0 1-92.416 95.936L832 960H192a96 96 0 0 1-95.936-92.416L96 864v-384a96 96 0 0 1 92.416-95.936L192 384h236.416L331.264 286.656a16 16 0 0 1 0-22.592l44.608-44.736a16 16 0 0 1 22.656 0L464 284.928V176a16 16 0 0 0-14.08-15.872L448 160H176a16 16 0 0 1-16-16v-64A16 16 0 0 1 176 64m640 416h-608a16 16 0 0 0-15.872 14.08L192 496v352a16 16 0 0 0 14.08 15.872l1.92 0.128h608a16 16 0 0 0 15.872-14.08l0.128-1.92v-352a16 16 0 0 0-16-16zM416 592v160H320v-160h96z m288 0v160H608v-160H704z" fill="#8a8a8a"/>
            </svg>
          </div>
        </el-tooltip>
      </div>

      <!-- 底部按钮组 -->
      <div class="bottomBtnBar">
        <!-- 更多按钮 -->
        <el-tooltip effect="dark" content="更多" placement="right">
          <el-popover placement="right" width="200" trigger="click" popper-class="moreListPopoverClass">
            <!-- 更现代化的“更多”列表 -->
            <div id="moreList">
              <div class="moreItem" @click="showFeedbackDialog">
                <i class="el-icon-edit"></i>
                <span>意见反馈</span>
              </div>
              <div class="divider"></div>
              <div class="moreItem">
                <i class="el-icon-warning-outline"></i>
                <span>举报</span>
              </div>
              <div class="divider"></div>
              <div class="moreItem" @click="clearChatHistory">
                <i class="el-icon-delete"></i>
                <span>清空聊天记录</span>
              </div>
            </div>
            <div slot="reference" class="toolBtn" :class="{ active: isMoreActive }">
              <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
                <path d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0" p-id="2678" fill="#808080"></path><
              </svg>
            </div>
          </el-popover>
        </el-tooltip>

        <!-- 退出按钮 -->
        <el-tooltip effect="dark" content="退出" placement="right">
          <div @click="exitSystem" class="toolBtn" :class="{ active: isExitActive }">
            <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M536 880H164a20 20 0 0 1-20-20V164a20 20 0 0 1 20-20h372a40 40 0 0 0 40-40 40 40 0 0 0-40-40H104a40 40 0 0 0-40 40v816a40 40 0 0 0 40 40h432a40 40 0 0 0 40-40 40 40 0 0 0-40-40z" fill="#808080" p-id="3741"></path><path d="M959.78 508l-0.06-0.48c0-0.39-0.08-0.78-0.14-1.16 0-0.13 0-0.26-0.05-0.39a1.85 1.85 0 0 1 0-0.23 39.85 39.85 0 0 0-11.24-22.13l-152-151.92a40 40 0 0 0-56.57 0 40 40 0 0 0 0 56.57L823.5 472H296a40 40 0 0 0-40 40 40 40 0 0 0 40 40h527.35l-84 83.72a40 40 0 0 0 0 56.57 40 40 0 0 0 56.56 0l152.37-151.88a39.91 39.91 0 0 0 11.5-32.41z" fill="#808080" p-id="3742"></path></svg>
          </div>
        </el-tooltip>
      </div>
    </div>

    <!-- 意见反馈对话框 -->
    <el-dialog title="意见反馈" :visible.sync="feedBackDialogVisible" class="feedbackDialog">
      <!-- 反馈文本域 -->
      <textarea class="feedbackInput" v-model="feedBackContent"></textarea>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleFeedbackSend">确 定</el-button>
        <el-button @click="feedBackDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "toolbar",
  data() {
    return {
      // 从 sessionStorage 获取当前用户信息
      user: JSON.parse(window.sessionStorage.getItem('user')),
      // 控制意见反馈对话框的显示
      feedBackDialogVisible: false,
      feedBackContent: '',
      // 控制“更多”按钮激活状态
      isMoreActive: false,
      // 控制退出按钮激活状态
      isExitActive: false
    }
  },
  computed: {
    // 从 Vuex 中获取当前聊天列表和未读消息数据
    ...mapState(['currentList', 'unreadMessages']),
    // 群聊未读消息数量
    unreadChat() {
      return this.unreadMessages?.groupChat || 0;
    },
    // 私聊未读消息数量
    unreadContacts() {
      return this.unreadMessages?.privateChat || 0;
    },
    // 机器人未读消息数量
    unreadRobot() {
      return this.unreadMessages?.robotChat || 0;
    }
  },
  methods: {
    // 切换当前聊天列表
    updateCurrentList(listName) {
      this.$store.commit("changeCurrentList", listName);
    },
    // 退出系统：确认后清除用户数据，并跳转到登录页
    exitSystem() {
      this.$confirm('你是否要退出系统吗?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getRequest("/logout");
        sessionStorage.removeItem("user");
        if (sessionStorage.getItem("state")) {
          sessionStorage.removeItem("state");
        }
        this.$store.dispatch("disconnect");
        this.$router.replace("/");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 显示意见反馈对话框
    showFeedbackDialog() {
      this.feedBackContent = '';
      this.feedBackDialogVisible = true;
    },
    // 发送反馈信息
    handleFeedbackSend() {
      let msgObj = {
        userId: this.user.id,
        nickname: this.user.nickname,
        username: this.user.username,
        content: this.feedBackContent
      };
      this.postRequest("/mail/feedback", msgObj).then(resp => {
        if (resp) {
          this.feedBackDialogVisible = false;
        }
      });
    },
    // 清空本地聊天记录（群聊记录下次登录时恢复）
    clearChatHistory() {
      this.$confirm('此操作将永久删除本地聊天记录(群聊记录会在下次登录时恢复), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (localStorage.getItem("chat-session")) {
          localStorage.removeItem("chat-session");
        }
        this.$store.state.sessionStorage = {};
        if (sessionStorage.getItem("state")) {
          sessionStorage.removeItem("state");
        }
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#toolbar {
  width: 80px;
  height: 100%;
  background: rgba(236, 234, 232, 0.25); /* 浅色毛玻璃背景 */
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center; /* 让头像和按钮组居中 */

  /* 按钮区域 */
  #btnBar {
    width: 100%;
    height: 82%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 顶部和底部按钮区域均居中显示 */
    .topBtnBar,
    .bottomBtnBar {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  /* 用户头像样式：缩小、圆角方形 */
  .imgProfile {
    width: 48px;
    height: 48px;
    margin: 15px 0;
    border-radius: 8px;
  }

  /* 工具按钮样式 */
  .toolBtn {
    width: 50px;
    height: 50px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    .icon {
      fill: #555; /* 默认图标颜色 */
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    &.active {
      background: rgba(255, 255, 255, 0.4);
      .icon {
        fill: #333;
      }
    }
  }

  /* 未读消息徽标样式 */
  .badge {
    position: relative;
    .el-badge__content {
      position: absolute;
      top: 0;
      right: -10px;
    }
  }

  /* 意见反馈对话框 */
  .feedbackDialog {
    width: 1000px;
    height: 800px;
    margin: 10px auto;
  }

  /* 反馈文本框 */
  .feedbackInput {
    width: 450px;
    height: 200px;
    resize: none;
    padding: 0;
    margin: 0;
  }
}
</style>

<style lang="scss">
/* 自定义更多列表的 Popover 样式 */
.el-popover.moreListPopoverClass {
  width: 200px;
  margin-left: 10px;
  padding: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: none;

  #moreList {
    padding: 10px;
    display: flex;
    flex-direction: column;

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      margin: 6px 0;
    }

    .moreItem {
      display: flex;
      align-items: center;
      padding: 6px 0;
      cursor: pointer;
      transition: background-color 0.2s;
      i {
        font-size: 16px;
        margin-right: 8px;
        color: #555;
      }
      span {
        font-size: 14px;
        color: #333;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>