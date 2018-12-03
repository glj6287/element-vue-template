<template>
  <div class="app-container" >
    <!--<div class="main" >-->
    <el-table :data="tableData" v-loading="getDataLoading" border stripe fit  style="width: 100%">

      <el-table-column label="节点" >
        <template slot-scope="scope" >
          <span>{{scope.row.flowApproveValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="完成人" >
        <template slot-scope="scope">
          <span>{{scope.row.creatorName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="完成时间" >
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" >
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import Utils from "@/utils/common";
  import { logByApplyCode } from "@/api/rent";
  export default {
    data() {
      return {
        getDataLoading: false,
        tableData: [],
        rentApplyCode: this.$route.query.rentApplyCode
      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        logByApplyCode(this.rentApplyCode).then(response => {
          this.tableData = response.data;
        }).catch(error => {
          Utils.error(error);
        });
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
  .main{
    padding-left: 20px;
    padding-top: 10px;
  }
  .housing_detail{
    margin-bottom: 20px;
  }
  .housing_detail_pic{
    display: inline-block;
    width: 100px;
    height: 50px;
  }
</style>

