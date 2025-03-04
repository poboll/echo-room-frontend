<template>
  <div id="uesrtext">
    <!-- 左上角按钮组：用于选择表情、上传图片、文件和语音 -->
    <div class="btnGroup">
      <!-- 表情弹窗 -->
      <el-popover
          placement="bottom-start"
          width="400"
          trigger="click"
          class="emoBox"
      >
        <!-- 表情列表 -->
        <div class="emojiList">
          <div class="emotionList">
            <a
                href="javascript:void(0);"
                @click="getEmo(index)"
                v-for="(item, index) in faceList"
                :key="index"
                class="emotionItem"
            >
              {{ item }}
            </a>
          </div>
        <!-- 作为弹窗引用的按钮 -->
        <el-button id="emojiBtn" class="emotionSelect" slot="reference">
          <i class="fa fa-smile-o" aria-hidden="true"></i>
        </el-button>
      </el-popover>

      <!-- 图片上传按钮 -->
      <el-upload
          class="upload-btn"
          action="/file"
          :before-upload="beforeAvatarUpload"
          :on-success="imgSuccess"
          :on-error="imgError"
          :show-file-list="false"
          accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
      >
        <el-button id="uploadImgBtn" icon="el-icon-picture-outline"></el-button>
      </el-upload>

      <!-- 文件上传按钮 -->
      <el-upload
          class="upload-btn"
          action="/file"
          :before-upload="beforeFileUpload"
          :on-success="fileSuccess"
          :on-error="fileError"
          :show-file-list="false"
      >
        <el-button id="uploadFileBtn" icon="el-icon-folder-add"></el-button>
      </el-upload>

      <!-- 语音上传按钮 -->
      <el-upload
          class="upload-btn"
          action="/voice"
          :before-upload="beforeVoiceUpload"
          :on-success="voiceSuccess"
          :on-error="voiceError"
          :show-file-list="false"
          accept="audio/*"
      >
        <el-button id="uploadVoiceBtn" icon="el-icon-microphone"></el-button>
      </el-upload>
    </div>

    <!-- 文本输入区域 -->
    <textarea
        id="textarea"
        placeholder="按 Ctrl + Enter 发送"
        v-model="content"
        @keyup="addMessage"
    ></textarea>

    <!-- 发送按钮 -->
    <button class="vercelSendBtn" @click="addMessageByClick">
      发送(S)
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const appData = require("../../utils/emoji.json");

export default {
  name: 'uesrtext',
  data() {
    return {
      // 存储表情列表
      faceList: [],
      // 存储当前输入框中的内容
      content: ''
    };
  },
  mounted() {
    // 初始化表情数据，将 emoji.json 中的字符加载到 faceList 数组中
    for (let i in appData) {
      this.faceList.push(appData[i].char);
    }
  },
  computed: mapState([
    'sessions',
    'currentSession'
  ]),
  methods: {
    // 点击发送按钮的方法
    addMessageByClick() {
      // 校验输入内容不为空
      if (!this.content || this.content.match(/^[ ]*$/)) {
        this.$message({
          showClose: true,
          message: '不能发送空白信息'
        });
        return;
      }
      // 构造消息对象，messageTypeId 为 1 表示文本消息
      let msgObj = { content: this.content, messageTypeId: 1 };
      // 根据当前会话判断调用相应的发送接口
      if (this.currentSession.username == "群聊") {
        this.$store.state.stomp.send("/ws/groupChat", {}, JSON.stringify(msgObj));
      } else if (this.currentSession.username == "机器人") {
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = '机器人';
        this.$store.state.stomp.send("/ws/robotChat", {}, JSON.stringify(msgObj));
        this.$store.commit('addMessage', msgObj);
      } else {
        msgObj.from = this.$store.state.currentUser.username;
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = this.currentSession.username;
        this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
        this.$store.commit('addMessage', msgObj);
      }
      // 发送后清空输入框
      this.content = '';
    },
    // 支持 Ctrl+Enter 快捷键发送消息
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.addMessageByClick();
      }
    },
    // 上传图片前的校验函数
    beforeAvatarUpload(file) {
      if (this.currentSession.username == "机器人") {
        this.$message.error("瓦力拒绝接收你的图片！");
        return false;
      }
      let isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      let imgType = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
      let isImg = ['jpg', 'jpeg', 'png', 'gif'].includes(imgType);
      if (!isImg) {
        this.$message.error('上传图片格式不符合要求！');
      }
      return isLt1M && isImg;
    },
    // 图片上传成功回调，构造图片消息对象发送
    imgSuccess(response) {
      let msgObj = { content: response, messageTypeId: 2 };
      if (this.currentSession.username == "群聊") {
        this.$store.state.stomp.send("/ws/groupChat", {}, JSON.stringify(msgObj));
      } else {
        msgObj.from = this.$store.state.currentUser.username;
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = this.currentSession.username;
        this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
        this.$store.commit('addMessage', msgObj);
      }
    },
    imgError(err) {
      this.$message.error("上传失败");
    },
    // 上传文件前的校验
    beforeFileUpload(file) {
      if (this.currentSession.username == "机器人") {
        this.$message.error("瓦力拒绝接收你的文件！");
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isLt10M;
    },
    fileSuccess(response) {
      let msgObj = { content: response, messageTypeId: 3 };
      if (this.currentSession.username == "群聊") {
        this.$store.state.stomp.send("/ws/groupChat", {}, JSON.stringify(msgObj));
      } else {
        msgObj.from = this.$store.state.currentUser.username;
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = this.currentSession.username;
        this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
        this.$store.commit('addMessage', msgObj);
      }
    },
    fileError(err) {
      this.$message.error("上传失败");
    },
    // 语音上传前校验
    beforeVoiceUpload(file) {
      if (this.currentSession.username == "机器人") {
        this.$message.error("瓦力拒绝接收你的语音！");
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传语音大小不能超过 10MB!");
      }
      return isLt10M;
    },
    voiceSuccess(response) {
      let msgObj = { content: response, messageTypeId: 4 };
      if (this.currentSession.username == "群聊") {
        this.$store.state.stomp.send("/ws/groupChat", {}, JSON.stringify(msgObj));
      } else {
        msgObj.from = this.$store.state.currentUser.username;
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = this.currentSession.username;
        this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
        this.$store.commit('addMessage', msgObj);
      }
    },
    voiceError(err) {
      this.$message.error("上传语音失败");
    },
    // 选择表情：将选中的表情插入到文本输入框中
    getEmo(index) {
      var textArea = document.getElementById('textarea');
      function changeSelectedText(obj, str) {
        if (window.getSelection) {
          textArea.setRangeText(str);
          textArea.selectionStart += str.length;
          textArea.focus();
        } else if (document.selection) {
          obj.focus();
          var sel = document.selection.createRange();
          sel.text = str;
        }
      }
      changeSelectedText(textArea, this.faceList[index]);
      // 更新输入框内容
      this.content = textArea.value;
    }
  }
}
</script>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 25%;
  border: solid 0px; /* 不显示边框 */
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 50px; /* 给左上角按钮留出空间 */

  .btnGroup {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 10;
  }

  /* 输入框样式，与整体背景风格统一 */
  > textarea {
    flex: 1;
    width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    border: 0px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    transition: border-color 0.2s ease;
    outline: none;
    resize: none;
    background-color: transparent;
    color: #333;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &:focus {
      border-color: rgba(255, 255, 255, 0.6);
    }
  }

  .vercelSendBtn {
    align-self: flex-end;
    margin-top: 2px;
    padding: 6px 16px;
    border: none;
    border-radius: 6px;
    background: #000;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #333;
    }
    &:active {
      background-color: #111;
    }
  }

  /* 按钮统一样式 */
  #uploadImgBtn,
  #emojiBtn,
  #uploadFileBtn,
  #uploadVoiceBtn {
    border: none;
    background-color: rgba(255, 255, 255, 0.2);
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    width: 28px;
    height: 28px;
    font-size: 12px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .upload-btn {
    display: inline-block;
  }
}

.emojiList {
  max-height: 130px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.3);
}

/* 表情弹窗样式 */
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.3);
}

.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.3);
}

/* 自定义 el-popover 的背景和滚动条样式 */
.el-popover.emoBox {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(6px);
  border: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.el-popover.emoBox::-webkit-scrollbar {
  display: none;
}

</style>
