<template>
  <div id="message" v-scroll-bottom="sessions">
    <!-- 如果当前会话不为群聊，则显示私聊消息 -->
    <div v-if="currentSession && currentSession.username != '群聊'">
      <ul>
        <li v-for="(entry,index) in sessions[user.username+'#'+currentSession.username]" :key="index">
          <p class="time">
            <span>{{ entry.date | time }}</span>
          </p>
          <div class="main" :class="{ self: entry.self }">
            <!-- 显示发送者昵称 -->
            <p class="username">{{ entry.fromNickname }}</p>
            <!-- 显示头像，若为自己发送则使用当前用户头像，否则使用对方头像 -->
            <img class="avatar" :src="entry.self ? user.userProfile : currentSession.userProfile" alt="">
            <!-- 文本消息 -->
            <p v-if="entry.messageTypeId==1" class="text">{{ entry.content }}</p>
            <!-- 图片消息 -->
            <img v-if="entry.messageTypeId==2" :src="entry.content" class="img">
            <!-- 此处可扩展其他类型消息（如文件消息等） -->
            <!-- 语音消息：新增，支持播放 -->
            <audio v-if="entry.messageTypeId==4" :src="entry.content" controls class="voice"></audio>
          </div>
        </li>
      </ul>
    </div>
    <!-- 如果当前会话为群聊，则显示群聊消息 -->
    <div v-else>
      <ul>
        <li v-for="(entry,index) in sessions['群聊']" :key="index">
          <p class="time">
            <span>{{ entry.createTime | time }}</span>
          </p>
          <div class="main" :class="{ self: entry.fromId == user.id }">
            <p class="username">{{ entry.fromName }}</p>
            <!-- 双击头像触发拍一拍事件 -->
            <img @dblclick="takeAShot" class="avatar" :src="entry.fromId==user.id ? user.userProfile : entry.fromProfile" alt="">
            <!-- 根据消息类型判断显示内容 -->
            <div v-if="entry.messageTypeId==1">
              <p class="text" v-html="entry.content"></p>
            </div>
            <div v-else-if="entry.messageTypeId==2">
              <el-image :src="entry.content" :preview-src-list="[entry.content]" class="img">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div v-else-if="entry.messageTypeId==4">
              <audio :src="entry.content" controls class="voice"></audio>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'message',
  data () {
    return {
      // 从 sessionStorage 中获取当前用户信息
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: mapState([
    'sessions',
    'currentSession',
    'errorImgUrl'
  ]),
  filters: {
    // 格式化时间过滤器，将日期转为友好格式显示
    time (date) {
      if (date) {
        date = new Date(date);
      }
      let currentDate = new Date();
      let timeInterval = currentDate.getDate() - date.getDate();
      let weekdays = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      let timeRange = date.getHours() > 12 ? "下午" : "上午";
      // 如果是当天，则只显示时间
      if (date.getMonth() == currentDate.getMonth() && date.getDate() == currentDate.getDate()){
        return `${timeRange} ${date.getHours()}:${date.getMinutes()}`;
      }
      // 如果是昨天或近几天，则显示对应星期几或昨天
      if (date.getFullYear() == currentDate.getFullYear() && timeInterval <= 6 && timeInterval >= 1) {
        return timeInterval == 1 ? `昨天 ${timeRange} ${date.getHours()}:${date.getMinutes()}` : `${weekdays[date.getDay()]} ${timeRange} ${date.getHours()}:${date.getMinutes()}`;
      }
      // 否则显示完整日期和时间
      else {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${timeRange} ${date.getHours()}:${date.getMinutes()}`;
      }
    }
  },
  directives: {
    // 自定义指令：滚动到底部（用于消息列表自动滚动）
    'scroll-bottom' (el) {
      setTimeout(function () {
        el.scrollTop += 9999;
      }, 1)
    }
  },
  methods: {
    // 拍一拍功能示例，打印日志，可按需求扩展
    takeAShot (fromName, toName) {
      console.log("拍了一拍", fromName, toName);
      let s = fromName + "拍了拍" + toName;
    }
  }
}
</script>
<style lang="scss" scoped>
#message {
  padding: 15px;
  height: 60%;
  max-height: 63%;
  overflow-y: scroll;
  overflow-x: hidden;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    li {
      margin-bottom: 15px;
    }
  }
  .time {
    text-align: center;
    margin: 7px 0;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #FFF;
      background-color: #dcdcdc;
      border-radius: 2px;
    }
  }
  .main {
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
    /*
      关键点：
      1. 设置 .text 为行内块，便于控制宽度
      2. max-width: 70% 用于限制消息框最大宽度
      3. white-space/word-wrap/word-break 确保自动换行不溢出
    */
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 70%;
      background-color: #fafafa;
      border-radius: 4px;
      line-height: 30px;

      /* 自动换行核心属性 */
      white-space: pre-wrap;        /* 保留文本的换行符，同时允许长单词换行 */
      word-wrap: break-word;        /* 超出宽度时进行单词内断行换行 */
      word-break: break-word;       /* 针对部分浏览器对 break-word 的兼容 */
      overflow-wrap: break-word;    /* 兼容性补充 */
    }
    .img {
      display: inline-block;
      height: 100px;
      width: 100px;
      margin-top: 15px;
    }
    .voice {
      display: block;
      margin-top: 8px;
      width: 160px;
    }
    .username {
      position: relative;
      left: 35px;
      top: 11px;
      font-size: 10px;
      color: grey;
    }
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
    /* 右侧消息框也可单独设定其最大宽度与自动换行规则 */
    .text {
      background-color: #b2e281;
      max-width: 70%; /* 同样限制自我消息宽度 */
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
      overflow-wrap: break-word;
      text-align: left;           /* 气泡内文字左对齐，避免文字贴到右边 */
    }
    .img {
      display: inline-block;
      height: 100px;
      width: 100px;
      margin-top: 15px;
    }
    .voice {
      display: block;
      margin-top: 8px;
      width: 160px;
      margin-left: auto; /* 让语音控件靠右 */
    }
    .username {
      position: relative;
      left: 310px;
      top: 11px;
      width: 200px;
      font-size: 10px;
      color: grey;
    }
  }
}
</style>

