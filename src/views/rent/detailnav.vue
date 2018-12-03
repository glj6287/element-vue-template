<template>
  <div class="tab-container">
    <h3 class="housing_title">申请单号：{{rentApplyCode}} {{applyStatusText}}</h3>

    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="baseDetail">
        <keep-alive>
          <detail-panel v-if='activeName=="baseDetail"'></detail-panel>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="日志" name="logger">
        <keep-alive>
          <logger-panel v-if='activeName=="logger"'></logger-panel>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import DetailPanel from "./detail";
  import LoggerPanel from "./logger";

  export default {
    name: "detailNav",
    components: { DetailPanel, LoggerPanel},
    data() {
      return {
        rentApplyCode: this.$route.query.rentApplyCode,
        applyStatusText: this.$route.query.applyStatusText,
        activeName: "baseDetail"
      };
    }
  };
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
