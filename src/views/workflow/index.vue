<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="流程信息配置" name="workflows">
        <keep-alive>
          <workflow-pane v-if='activeName=="workflows"'></workflow-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="流程角色配置" name="workflow-role">
        <keep-alive>
          <workflow-role-pane v-if='activeName=="workflow-role"'></workflow-role-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import workflowPane from './workflows'
import workflowRolePane from './workflow-role'

export default {
  name: 'workflow',
  components: { workflowPane, workflowRolePane },
  data() {
    return {
      activeName: 'workflows'
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
</style>
