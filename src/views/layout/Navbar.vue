<template>
  <div>
    <el-menu class="navbar" mode="horizontal" :style="{'left': sidebar.opened ? '180px': '36px'}">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <levelbar></levelbar>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          {{nickName}}({{jobNumber}}) |
          <span>{{roleNames && roleNames.length > 0 ? roleNames[0] : ''}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class='inlineBlock' to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="changePassword" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <change-password v-if="showChangePassword" @close="showChangePassword = false"></change-password>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Levelbar from "./Levelbar";
  import Hamburger from "@/components/Hamburger";
  import ChangePassword from './ChangePassword'

  export default {
    components: {
      Levelbar,
      Hamburger,
      ChangePassword
    },
    computed: {
      ...mapGetters(["roleNames", "userName", "nickName", "jobNumber", "sidebar"])
    },
    data() {
      return {
        showChangePassword: false
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("ToggleSideBar");
      },
      logout() {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      },
      changePassword() {
        this.showChangePassword = true
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    box-shadow: 1px 0px 10px 3px #ccc;
    background: #fff;
    transition: left 0.28s ease-out;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
