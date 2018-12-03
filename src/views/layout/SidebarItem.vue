<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">

      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <i v-if='item.icon' :class="item.icon"></i>
          <span>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="item.name" v-if="item.children&&item.children.length>0&&!item.noDropdown&&!item.hidden">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <i v-if='item.icon' :class="item.icon"></i>
          <span class="sideItem">{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>

          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
              <i v-if='child.icon' :class="child.icon"></i>
              <span class="sideItem">{{child.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .sideItem{
//   color: #818181;
// }
// .is-opened{
//   .el-submenu__title{
//      span{
//     color: #fff;
//    }
//   }
//   .is-active{
//     span{
//       color: #fff;
//     }
//   }
// }

// .svg-icon {
//   margin-right: 10px;
// }
// .hideSidebar .menu-indent{
//   display: block;
//   text-indent: 10px;
// }
</style>
