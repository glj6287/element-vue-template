<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="角色权限" name="roleLimit">
        <keep-alive>
          <role-pane v-if='activeName=="roleLimit"'></role-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="用户权限" name="userLimit">
        <keep-alive>
          <user-pane v-if='activeName=="userLimit"'></user-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RolePane from './roles'
import UserPane from './users'

export default {
  name: 'limit',
  components: { RolePane, UserPane },
  data() {
    return {
      activeName: 'roleLimit'
    }
  },
  methods: {

  }
}  
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }       