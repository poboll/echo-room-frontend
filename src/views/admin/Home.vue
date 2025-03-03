<template>
  <el-container>
    <!-- 顶部区域：标题及用户操作下拉菜单 -->
    <el-header class="homeHeader">
      <!-- 页面标题 -->
      <div class="title">能不能带带我聊天室管理端</div>
      <!-- 右侧下拉菜单，显示当前登录用户及相关操作 -->
      <div>
        <el-dropdown class="choices" @command="commandHandler">
          <span class="el-dropdown-link">
            {{ user.name }}
            <i><img :src="user.userProfile"></i>
          </span>
          <!-- 下拉菜单项：个人中心、设置、注销登录 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <el-menu router unique-opened>
          <!-- 遍历路由配置（过滤掉 hidden 为 true 的项） -->
          <el-submenu v-for="(item, index) in routes" :index="index+''" v-if="item.hidden != true" :key="index">
            <template slot="title">
              <!-- 菜单图标与名称 -->
              <i style="color: #2F86D2;margin-right: 8px" :class="item.iconCls"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 子菜单项 -->
            <el-menu-item v-for="(child, indexj) in item.children" :index="child.path" :key="indexj">
              {{ child.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 面包屑导航：非首页时显示 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path !== '/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 欢迎信息：当当前路由为首页时显示 -->
        <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
          欢迎来到能不能带带我聊天室管理端！
        </div>
        <!-- 路由出口 -->
        <router-view class="homeRouterView"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      // 从 sessionStorage 中获取管理员信息
      user: JSON.parse(window.sessionStorage.getItem("admin"))
    }
  },
  computed: {
    // 从路由配置中获取所有路由信息
    routes(){
      return this.$router.options.routes;
    }
  },
  methods: {
    // 下拉菜单命令处理：注销登录、个人中心等
    commandHandler(cmd){
      if (cmd == 'logout'){
        // 注销登录：确认后调用退出接口，清除 sessionStorage，再跳转到管理员登录页
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest("/admin/logout");
          sessionStorage.removeItem("admin");
          this.$router.replace('/adminlogin');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      } else if (cmd == 'userInfo'){
        // 可扩展：跳转到个人中心
        // this.$router.push('/userinfo');
      }
    }
  }
}
</script>

<style>
.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
}
.homeHeader .choices {
  cursor: pointer;
}
.choices img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 10px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #409eff;
}
.homeRouterView {
  margin-top: 15px;
}
</style>
