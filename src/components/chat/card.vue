<template>
  <div id="card">
    <header>
      <!-- 可选：恢复头像和昵称显示（目前注释掉，可按需启用） -->
      <!-- <img class="avatar" :src="user.userProfile" :alt="user.nickname"> -->
      <!-- <p class="name">{{ user.nickname }}</p> -->
    </header>
    <footer>
      <!-- 搜索输入框：绑定全局过滤关键字 -->
      <el-input
          class="search"
          type="text"
          size="mini"
          v-model="$store.state.filterKey"
          placeholder="搜索"
          prefix-icon="el-icon-search">
      </el-input>
      <!-- “+” 按钮，可用于打开添加联系人或发起会话的操作 -->
      <el-button class="searchBtn" size="mini">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  data() {
    return {
      // 从 sessionStorage 中获取当前登录用户的 JSON 数据
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  }
}
</script>

<style lang="scss" scoped>
#card {
  padding: 12px;
  margin-bottom: 5px;
  background: rgba(255, 255, 255, 0.2); /* 半透明背景 */
  backdrop-filter: blur(5px);           /* 毛玻璃效果 */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* footer 部分使搜索框和按钮同一行显示 */
  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search {
    background-color: rgba(255, 255, 255, 0.4);
    width: 150px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 0;
    border-radius: 4px;
    outline: none;
    color: #333;
    /* 使用 margin-right 调整右侧间隔 */
    margin-right: 10px;
  }

  .searchBtn {
    background-color: rgba(255, 255, 255, 0.4);
    border: 0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
  .searchBtn i {
    color: #505458;
  }
}
</style>

<!-- 针对当前组件的 Element UI 输入框内部样式进行定制 -->
<style>
#card .el-input__inner {
  background-color: transparent;
  outline: none;
  border: none;
}
</style>
