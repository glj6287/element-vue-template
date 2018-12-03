<template>
  <div>
    <!-- <div class="logo" v-if="!isCollapse" @click="Jump_Home">
      <img src="../../assets/yuanlai_pic/sidebarLogo.png" alt="logo">
    </div> -->
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    Jump_Home() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logo {
  padding: 20px;
  // background: #1b1b1b;
  img {
    max-width: 100%;
  }
  cursor: pointer;
}
// .el-menu {
//   border-radius: 0;
//   background: #1b1b1b;
// }
</style>
