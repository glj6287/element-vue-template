<template>
  <div class="login-container">
    <div class="YlsLogin">
      <img src="../../assets/yuanlai_pic/slogan.png" alt="">
    </div>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title"></h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="您的工号"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="outline_chang">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.enter="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>建议使用
        <i></i>
        <a href="http://www.google.cn/chrome/browser/desktop/index.html" target="_blank">谷歌浏览器</a>
        浏览本系统以获得强劲性能支持!
      </div>
    </el-form>
  </div>
</template>
      
      <script>
import { isvalidUsername } from "@/utils/validate";
import { parseParamFromJson } from "@/utils/index";
// import Md5 from 'md5'

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("密码不能小于1位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
  <style rel="stylesheet/scss" lang="scss" scopedSlots>
@import "src/styles/mixin.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url(../../assets/yuanlai_pic/beijing.png) no-repeat center;
  background-size: cover;
  .YlsLogin{
    width: 240px;
    height: 61px;
    position: absolute;
    left: 50%;
    top: 15%;
    transform:translate(-50%);
    -webkit-transform: translate(-50%);
    margin-right:115px;
    img{
      display: block;
      width: 100%;
      height: 100%;
    } 
  }
  input:-webkit-autofill {
    color: #050505;
  }
  input {
    background: transparent;
    border: none;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    font-size: 16px;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    outline:none!important;
  }
 .el-input__inner:focus{
  border:none!important;
}
  .login-form {
    background-color: #fff;
    position: absolute;
    opacity: 0.9;
    width: 500px;
    padding:32px 77px 35px 77px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,50%);
    -webkit-transform: translate(-50%,-50%);
  }
  .tips {
    font-size: 14px;
    text-align: center;
    color: #666666;
    white-space: nowrap;
    i{
      display: inline-block;
      width: 16px;
      height: 16px;
      background:url(../../assets/yuanlai_pic/guge.png) center no-repeat;
      background-size: cover;
      vertical-align: bottom;
    }
    a{
      color: #1b1b1b;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 0px;
    color: $dark_gray;
    vertical-align: middle;
    width: 15px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    width: 200px;
    height: 30px;
    margin: auto;
    background: url(../../assets/yuanlai_pic/YLlogo.png)center center no-repeat;
    background-size: cover;
    margin-bottom: 31.5px;
  }
  .el-form-item {
    border-bottom: solid 1px #1b1b1b;
    margin-bottom: 30px;
  }
  .outline_chang {
    border: none;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
    margin-top: 25px;
  }
  .el-button--primary {
    color: #fff;
    background-color: #1b1b1b;
    border-color: #1b1b1b;
    margin-top: 12px;
    margin-bottom: 28.5px;
  }
  .el-button{
    border-radius: 0;
  }
  .el-form-item__content{
    padding-bottom: 5px;
  }
}
</style>
      