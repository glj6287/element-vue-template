<template>

  <div class="app-container" >
    <el-button :plain="true" type="info" @click="selectList('1')">   IOS   </el-button>
    <el-button :plain="true" type="info" @click="selectList('2')">   安卓   </el-button>
    <br/>
    <br/>
    <el-table :data="list" v-loading="listLoading" stripe fit style="width: 100%">
      <el-table-column align="left">
        <template slot-scope="scope">
          <el-row class="housing_detail">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>版本号:</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <span>V {{scope.row.version}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="housing_detail">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>更新内容:</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div v-html="scope.row.updateDesc" class="grid-content bg-purple-light">
              </div>
            </el-col>
          </el-row>
          <el-row class="housing_detail">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <span>更新时间:</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <span>{{scope.row.createTime}}</span>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <br/>

    </el-table>

  </div>

</template>

<script>

  import { selectList } from "@/api/app";

  export default {
    data() {
      return {
        listLoading: false,
        list: null,
        paramQuery: {
          appCode: null,
          appType: null
        }
      };
    },
    created() {
      this.selectList();
    },
    filters: {
      dateFilter(date) {
        if (date) {
          date = date.substring(0, date.indexOf("."));
          return date.replace(/-/g, ".");
        }
        return "";
      },
      textFilter(val) {
        if (val) {
          var reg = new RegExp("<br/>", "g");
          var newReg = val.replace(reg, "\r\n");
          return newReg;
        }
        return "";
      }
    },
    methods: {
      selectList(val) {
        this.listLoading = true;
        this.paramQuery.appCode = "APP0001";//  源宝特工APP
        if (val) {
          this.paramQuery.appType = val;
        }
        selectList(this.paramQuery).then(response => {
          this.list = response.data;
          this.listLoading = false;
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
