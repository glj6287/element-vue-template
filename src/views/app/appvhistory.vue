<template>

  <div style="background-color: white;padding: 20px;">
    <h4 class="housing_title">APP版本更新历史</h4>
    <el-button type="info" @click="toPushVersion()">发布新版</el-button>
    <div class="tab-container">
      <!--<h3 class="housing_title">APP版本更新历史</h3>-->
      <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
        <el-tab-pane label="源宝特工APP" name="app0001">
          <keep-alive>
            <app1-pane v-if='activeName=="app0001"'></app1-pane>
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane label="源涞月租房APP" name="app0002">
          <keep-alive>
            <app2-pane v-if='activeName=="app0002"'></app2-pane>
          </keep-alive>
        </el-tab-pane>

      </el-tabs>


    </div>
  </div>

</template>

<script>

  import app1Pane from "./app0001";
  import app2Pane from "./app0002";

export default {
  name: "appvhistoryList",
  components: { app1Pane, app2Pane },
  data() {
    return {
      activeName: "app0001"
    };
  },
  methods: {
    toPushVersion() {
      this.$router.push({ path: `/sys/appvadd` });
    }
  }
};
</script>
<style lang="scss" scoped>
  .housing_title{
    height: 50px;
    background-color: #ccc;
    line-height: 50px;
    text-indent: 10px;
  }
  .tab-container{
    margin: 30px;
  }
  .main{
    padding-left: 20px;
    padding-top: 10px;
  }
</style>
