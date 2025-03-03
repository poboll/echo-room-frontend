<template>
  <div>
    <!-- 顶部控制区：包括发送者昵称输入、日期范围选择、消息类型选择及操作按钮 -->
    <div>
      <!-- 输入框：搜索发送者昵称 -->
      发送者昵称：
      <el-input v-model="nameKeyword" placeholder="输入发送者昵称" class="nameInput"></el-input>
      <!-- 日期范围选择器 -->
      发送时间：
      <el-date-picker
          v-model="dateScope"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :editable="false"
          :unlink-panels="true"
          value-format="yyyy-MM-dd HH:mm:ss"
          class="topControlsBar">
      </el-date-picker>
      <!-- 消息类型单选按钮组 -->
      消息类型：
      <el-radio-group v-model="msgTypeRadio" class="topControlsBar">
        <el-radio :label="1">文本</el-radio>
        <el-radio :label="2">图片</el-radio>
        <el-radio :label="3">文件</el-radio>
      </el-radio-group>
      <!-- 搜索按钮 -->
      <el-button @click="initMessTableData" icon="el-icon-search" type="primary" size="small" class="topControlsBar">
        搜索
      </el-button>
      <!-- 刷新表格按钮 -->
      <el-button @click="refreshMessTableData" icon="el-icon-refresh" type="primary" size="small" class="topControlsBar">
        刷新表格
      </el-button>
      <!-- 导出 Excel 按钮 -->
      <el-button @click="exportData" icon="el-icon-document" type="success" size="small" class="topControlsBar">
        导出Excel
      </el-button>
    </div>
    <!-- 表格区域：展示消息记录 -->
    <div style="margin-top: 15px">
      <el-table
          :data="messTableData"
          v-loading="loading"
          border
          stripe
          @selection-change="handleSelectionChange"
          style="width: 100%">
        <!-- 多选框列 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 消息编号 -->
        <el-table-column prop="id" label="消息编号" width="80"></el-table-column>
        <!-- 发送者编号 -->
        <el-table-column prop="fromId" label="发送者编号" width="100"></el-table-column>
        <!-- 发送者昵称 -->
        <el-table-column prop="fromName" label="发送者昵称" width="150"></el-table-column>
        <!-- 发送时间 -->
        <el-table-column prop="createTime" label="发送时间" width="180"></el-table-column>
        <!-- 消息内容，根据消息类型显示文本或图片 -->
        <el-table-column label="内容" width="750">
          <template slot-scope="scope">
            <!-- 文本消息直接以 HTML 格式显示 -->
            <div v-if="scope.row.messageTypeId==1" v-html="scope.row.content"></div>
            <!-- 图片消息使用 el-image 组件显示，并支持预览 -->
            <div v-else>
              <el-image :src="scope.row.content" :preview-src-list="[scope.row.content]" style="width: 50px;height: 50px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <!-- 操作列：提供删除按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部操作区：批量删除按钮和分页组件 -->
    <div style="display: flex;justify-content: space-between;margin-top: 10px">
      <!-- 批量删除按钮，当未选择记录时禁用 -->
      <el-button @click="handleMultiDelete" :disabled="multipleSelection.length==0" type="danger" icon="el-icon-delete">
        批量删除
      </el-button>
      <!-- 分页组件 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="display: inline-block">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupChatRecord",
  data(){
    return {
      messTableData: [],      // 存储表格中的消息数据
      msgTypeRadio: -1,       // 消息类型：默认不选（-1表示全部）
      multipleSelection: [],  // 表格多选框选中的记录数组
      page: 1,                // 当前页数
      size: 10,               // 每页显示数据条数
      total: -1,              // 总记录数（用于分页）
      nameKeyword: '',        // 搜索发送者昵称关键字
      dateScope: null,        // 发送时间范围
      loading: false,         // 表格加载动画标记
    }
  },
  mounted(){
    // 页面加载时初始化表格数据
    this.initMessTableData();
  },
  methods:{
    // 初始化/加载表格数据，拼接查询参数后发送 GET 请求
    initMessTableData(){
      this.loading = true;
      let url = "/groupMsgContent/page?page=" + this.page + "&size=" + this.size;
      if (this.nameKeyword !== ''){
        url += "&nickname=" + this.nameKeyword;
      }
      if (this.dateScope){
        url += "&dateScope=" + this.dateScope;
      }
      if (this.msgTypeRadio !== -1){
        url += "&type=" + this.msgTypeRadio;
      }
      this.getRequest(url).then(resp => {
        this.messTableData = resp.data;
        this.total = resp.total;
        // 延时关闭加载动画
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    // 刷新表格：清空搜索条件后重新加载数据
    refreshMessTableData(){
      this.nameKeyword = '';
      this.dateScope = null;
      this.msgTypeRadio = -1;
      this.initMessTableData();
    },
    // 导出数据到 Excel：通过新窗口打开下载链接
    exportData(){
      window.open("/groupMsgContent/download", "_parent");
    },
    // 分页回调：改变每页显示条数后刷新数据
    handleSizeChange(val){
      this.size = val;
      this.initMessTableData();
    },
    // 分页回调：改变当前页数后刷新数据
    handleCurrentChange(val){
      this.page = val;
      this.initMessTableData();
    },
    // 表格多选改变时更新 multipleSelection 数组
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    // 单条记录删除：弹出确认对话框，确认后发送删除请求
    handleDelete(data){
      this.$confirm('此操作将永久删除该条消息记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/groupMsgContent/" + data.id).then(resp => {
          if (resp){
            this.initMessTableData();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 批量删除：将选中记录的 id 拼接到 URL 参数中，发送删除请求
    handleMultiDelete(){
      this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "/groupMsgContent/?";
        this.multipleSelection.forEach(item => {
          url += "ids=" + item.id + "&";
        });
        this.deleteRequest(url).then(resp => {
          if (resp){
            this.initMessTableData();
          }
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

<style scoped>
/* 控制顶部输入框宽度 */
.nameInput {
  width: 150px;
}
/* 顶部各个控件间隔设置 */
.topControlsBar {
  margin: 0 10px;
}
</style>
