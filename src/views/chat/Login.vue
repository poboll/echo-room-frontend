<template>
  <el-container class="loginPage">
    <!-- 头部 -->
    <el-header class="loginHeader">
      <el-button
          @click="gotoAdminLogin"
          icon="el-icon-d-arrow-right"
          class="adminLoginBtn"
      >
        管理端登录
      </el-button>
    </el-header>

    <!-- 主体 -->
    <el-main>
      <div class="loginContainer">
        <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
          <h3 class="loginTitle">能不能带带我</h3>
          <el-form-item label="用户名:" prop="username">
            <el-input
                type="text"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
                type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-input
                type="text"
                @keydown.enter.native="submitLogin"
                v-model="loginForm.code"
                auto-complete="off"
                placeholder="请输入验证码"
                style="width:150px;"
            ></el-input>
            <img
                :src="verifyCode"
                title="点击切换验证码"
                @click="changeverifyCode"
                class="verifyCodeImg"
            />
          </el-form-item>
          <el-checkbox v-model="checked" class="loginRemember"></el-checkbox
          ><span> 记住我一周</span>
          <div class="btnGroup">
            <el-button
                @click="showRegistryDialog"
                class="registerBtn"
            >
              注册
            </el-button>
            <el-button
                type="primary"
                class="loginBtn"
                @click="submitLogin"
                v-loading.fullscreen.lock="fullscreenLoading"
            >
              登录
            </el-button>
          </div>
        </el-form>
      </div>
    </el-main>

    <!-- 注册对话框 -->
    <el-dialog
        title="新用户注册"
        :before-close="closeRegisterDialog"
        :visible.sync="registerDialogVisible"
        width="30%"
        class="registerDialog"
    >
      <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerForm"
      >
        <el-form-item label="用户昵称：" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="registerForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户头像：" :label-width="formLabelWidth">
          <el-upload
              action="/file"
              ref="upload"
              list-type="picture-card"
              :class="{ disabled: uploadDisabled }"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
              :on-progress="onProgress"
              :on-success="imgSuccess"
              :on-error="imgError"
              :on-remove="imgRemove"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传不超过4MB的图片(可使用默认头像！)
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
            type="primary"
            @click="submitRegisterForm('registerForm')"
            style="width: 100%"
        >
          注册
        </el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      }
      this.getRequest("user/checkNickname?nickname=" + value).then(resp => {
        if (resp != 0) {
          callback(new Error("该昵称已被注册"));
        } else {
          callback();
        }
      });
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      this.getRequest("/user/checkUsername?username=" + value).then(resp => {
        if (resp != 0) {
          callback(new Error('该用户名已被注册'));
        } else {
          callback();
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      verifyCode: '/verifyCode',
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      fullscreenLoading: false,
      registerDialogVisible: false,
      formLabelWidth: '120px',
      registerForm: {
        nickname: '',
        username: '',
        password: '',
        checkPass: '',
        userProfile: 'default_head.jpg',
      },
      registerRules: {
        nickname: [{ validator: validateNickname, trigger: 'blur' }],
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
      uploadDisabled: false,
      fileList: [],
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 1000);
            if (resp) {
              this.$store.state.currentUser = resp.obj;
              window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
              let path = this.$route.query.redirect;
              this.$router.replace(
                  path == '/' || path == undefined ? "/chatroom" : path
              );
            } else {
              this.changeverifyCode();
            }
          });
        } else {
          this.$message.error("用户名,密码和验证码都不能为空！");
          return false;
        }
      });
    },
    changeverifyCode() {
      this.verifyCode = "/verifyCode?time=" + new Date();
    },
    gotoAdminLogin() {
      this.$router.replace("/adminlogin");
    },
    showRegistryDialog() {
      this.registerDialogVisible = true;
    },
    beforeAvatarUpload(file) {
      let isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
      }
      return isLt4M;
    },
    onProgress(event, file, fileList) {
      this.uploadDisabled = true;
    },
    imgSuccess(response, file, fileList) {
      this.uploadDisabled = true;
      this.registerForm.userProfile = response;
      console.log("图片url为：" + this.registerForm.userProfile);
    },
    imgError(err, file, fileList) {
      this.$message.error("上传失败");
      this.uploadDisabled = false;
    },
    imgRemove(file, fileList) {
      this.uploadDisabled = false;
    },
    closeRegisterDialog(done) {
      this.registerForm = {
        nickname: '',
        username: '',
        password: '',
        checkPass: '',
        userProfile: '',
      };
      done();
    },
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest("/user/register", this.registerForm).then(resp => {
            if (resp) {
              this.registerDialogVisible = false;
              location.reload();
            }
          });
        } else {
          this.$message.error("请正确填写信息！");
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
};
</script>

<style>
/* 整个登录页的浅色散射背景 */
.loginPage {
  position: relative;
  min-height: 100vh;
  background-color: #fafafa;
  background-image:
      radial-gradient(circle at 15% 30%, rgba(255, 200, 200, 0.4), transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(200, 255, 200, 0.4), transparent 40%),
      radial-gradient(circle at 50% 80%, rgba(200, 200, 255, 0.4), transparent 40%);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 头部：毛玻璃效果 */
.loginHeader {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 头部右侧按钮 */
.adminLoginBtn {
  float: right;
  border: none;
  color: #333;
  font-weight: 500;
}

/* 登录面板：毛玻璃容器 */
.loginContainer {
  width: 350px;
  margin: 100px auto;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 25px 35px 25px 35px;
}

/* 登录标题 */
.loginTitle {
  margin: 10px auto 30px auto;
  text-align: center;
  color: #505458;
  font-weight: 600;
  font-size: 20px;
}

/* 验证码图片 */
.verifyCodeImg {
  cursor: pointer;
  margin-left: 10px;
  height: 36px;
  vertical-align: middle;
}

/* 记住我 */
.loginRemember {
  margin: 5px auto 35px 80px;
}

/* 按钮组 */
.btnGroup {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.registerBtn,
.loginBtn {
  width: 45%;
}

/* 输入框样式：微透明 + 边框 */
.el-input__inner {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #333;
}

/* 通用按钮样式 */
.el-button {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #333;
  transition: all 0.2s ease-in-out;
}
.el-button:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* 主按钮 */
.el-button--primary {
  background: rgba(64, 158, 255, 0.8);
  border: 1px solid rgba(64, 158, 255, 0.8);
  color: #fff;
}
.el-button--primary:hover {
  background: rgba(64, 158, 255, 1);
}

/* 禁用上传按钮时隐藏图片卡片 */
.disabled .el-upload--picture-card {
  display: none;
}

/*
  注册对话框：保留毛玻璃本身
  并在其背后的“遮罩层”上再加一层亚克力蒙版
*/
.registerDialog >>> .el-dialog__wrapper {
  backdrop-filter: blur(10px);
}
/* 对话框自身的毛玻璃 */
.registerDialog .el-dialog {
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* “蒙版”对应的是 .v-modal；让它也具备亚克力效果 */
.registerDialog >>> .v-modal {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
}

/* 注册对话框内部输入框 */
.registerDialog .el-form-item .el-input__inner {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
</style>
