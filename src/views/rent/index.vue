<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="申请单号:" prop="rentApplyCode">
        <el-input v-model="listQuery.rentApplyCode" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="申请状态:" prop="applyStatus" >
        <el-select v-model="listQuery.applyStatus" size="small" style="width: 174px" clearable>
          <el-option v-for="item in applyStatusOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="门牌号:" prop="houseNo">
        <el-row :gutter="2" >
          <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseNo" size="small" placeholder="门牌号" @keyup.enter.native="search"></el-input></div></el-col>
          <el-col :span="1"><div class="grid-content bg-purple">号</div></el-col>
          <el-form-item  prop="houseRoomNo">
          <el-col :span="12"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseRoomNo" size="small" placeholder="门牌室" @keyup.enter.native="search"></el-input></div></el-col>
          <el-col :span="1">室</el-col>
          </el-form-item>
        </el-row>
      </el-form-item>

      <el-form-item label="社区名称:" prop="communityCode">
        <el-select v-model="listQuery.communityCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in communityCodeOptions" :key="item.communityCode" :label="item.communityName" :value="item.communityCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="小区名称:" prop="neighborhoodCode">
        <!-- <el-select v-model="listQuery.neighborhoodCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in neighborhoodCodeOptions" :key="item.neigbodCode" :label="item.name" :value="item.neigbodCode"></el-option>
        </el-select> -->

         <el-select
              v-model="listQuery.neighborhoodCode"
              size="small"
              filterable
              remote
              reserve-keyword
              placeholder="请输入小区名称"
              style="width:174px;"
              clearable>
              <el-option
                v-for="item in neighborhoodCodeOptions"
                :key="item.neigbodCode"
                :label="item.name"
                :value="item.neigbodCode">
              </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="租客名称:" prop="renter" >
        <el-input width="2000" v-model="listQuery.renter" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="申请特工:" prop="applyAgent" >
        <el-input width="2000" v-model="listQuery.applyAgent" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item style="margin-left:43px;">
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">
      <el-table-column width="200" label="申请单号" align="center" fixed>
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.rentApplyCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column  width="100" label="合同类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.contractTypeText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="房源编号">
        <template slot-scope="scope">
          <span>{{scope.row.houseCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  width="130" label="社区名称">
        <template slot-scope="scope">
          <span>{{scope.row.communityName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="小区名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="门牌号">
        <template slot-scope="scope">
          <span>{{scope.row.houseNoText}}</span>
        </template>
      </el-table-column>

      <el-table-column label="租客名称" min-width="160" align="left">
        <template slot-scope="scope">
          <span>{{scope.row.renter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="188" label="租期">
        <template slot-scope="scope">
          <span>{{scope.row.dateStartedRent}}-{{scope.row.dateEndedRent}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="租金">
        <template slot-scope="scope">
          <span>{{scope.row.totalRentMoney }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="申请状态" >
        <template slot-scope="scope">
          <span>{{scope.row.applyStatusText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="160" label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.applyDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="申请特工">
        <template slot-scope="scope">
          <span>{{scope.row.applyAgent}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="block pagination-container" style="text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { rentApplyList, view, logByApplyCode } from "@/api/rent";
  import { selectCommunityListMyAll, findNeighborhoodInfoMyAll, getRentApplyStatus } from "@/api/basedata";

  export default {
    name: "rent4List",
    data() {
      return {
        showModal: false,
        list: null,
        neighborhoodCodeOptions: [],
        communityCodeOptions: [],
        applyStatusOptions: [],
        agreementNo: "", // 协议编号
        listLoading: false,
        searchLoading: false,
        validOptions: [],
        currentPage: 1,
        itemStatusKey: "",
        total: 0,
        listQuery: {
          rentApplyCode: "",
          houseCode: "",
          communityCode: "",
          neighborhoodCode: "",
          houseNo: "",
          houseRoomNo: "",
          applyStatus: "",
          renter: "",
          applyAgent: "",
          page: 1,
          pageSize: 10
        }
      };
    },
    filters: {
      formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf("."));
        }
        return "-";
      }
    },
    created() {
      this.getList();
      this.neighborhoodCodes();
      this.selectCommunityCode();
      this.getRentApplyStatus();
    },
    methods: {
      getList() {
        this.listLoading = false;
        rentApplyList(this.listQuery)
           .then(response => {
             this.list = response.data;
             this.total = response.count;
             this.listLoading = false;
             this.searchLoading = false;
           })
           .catch(error => {
             console.log(error);
             this.listLoading = false;
             this.searchLoading = false;
           });
      },
      handleSizeChange(n) {
        this.listQuery.pageSize = n;
        this.getList();
      },
      handleCurrentChange(n) {
        this.listQuery.page = n;
        this.getList();
      },
      search() {
        this.searchLoading = true;
        this.currentPage = 1;
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 所有的小区
      neighborhoodCodes() {
        findNeighborhoodInfoMyAll(null).then(response => {
          this.neighborhoodCodeOptions = response.data;
        });
      },
      // 所有社区
      selectCommunityCode() {
        selectCommunityListMyAll().then(response => {
          this.communityCodeOptions = response.data;
        });
      },
      // 所有拿房状态
      getRentApplyStatus() {
        getRentApplyStatus().then(response => {
          this.applyStatusOptions = response.data;
        });
      },
      toView(row) {
        this.$router.push({ path: `rentdetailnav/?rentApplyCode=${row.rentApplyCode}&applyStatusText=${row.applyStatusText}` });
      }
    }
};
</script>
<style scoped>
.form-static {
  padding: 0 10px;
}
</style>

