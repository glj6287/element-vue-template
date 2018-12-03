<template>
  <div class="app-container">
      <el-form class="form-container" :model="listQuery" :inline="true" label-width="120px" ref="searchForm">
        <el-form-item label="合同编号:" prop="dsContractCode">
          <el-input v-model="listQuery.dsContractCode" size="small" placeholder="合同编号" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="小区名称:" prop="neigbodCode">
          <el-select
            v-model="listQuery.neigbodCode"
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
        <el-form-item label="社区名称:" prop="communityCode">
          <el-select v-model="listQuery.communityCode" size="small" style="width: 174px;" clearable>
            <el-option v-for="item in communityCodeOptions" :key="item.communityCode" :label="item.communityName" :value="item.communityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门牌号:" prop="houseNo">
          <el-input v-model="listQuery.houseNo" size="small" placeholder="门牌号" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="委托人姓名:" prop="wtrUsername">
          <el-input v-model="listQuery.wtrUsername" size="small" placeholder="委托人姓名" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="委托人证件号:" prop="wtrCertNo">
          <el-input v-model="listQuery.wtrCertNo" size="small" placeholder="委托人证件号" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="委托人手机号:" prop="wtrMobile">
          <el-input v-model="listQuery.wtrMobile" size="small" placeholder="委托人手机号" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="房东姓名:" prop="fdUsername">
          <el-input v-model="listQuery.fdUsername" size="small" placeholder="房东姓名" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="房东证件号:" prop="fdCertNo">
          <el-input v-model="listQuery.fdCertNo" size="small" placeholder="房东证件号" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="房东手机号:" prop="fdMobile">
          <el-input v-model="listQuery.fdMobile" size="small" placeholder="房东手机号" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="合同状态:" prop="dsContractStatus">
          <el-select v-model="listQuery.dsContractStatus" size="small" style="width: 174px" clearable>
            <el-option v-for="item in statusOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约特工:" prop="signName">
          <el-input v-model="listQuery.signName" size="small" placeholder="签约特工" @keyup.enter.native="search"></el-input>
        </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="180" label="合同编号" fixed align="center">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.dsContractCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140" label="社区">
        <template slot-scope="scope">
          <span>{{scope.row.communityName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140" label="小区">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="门牌号">
        <template slot-scope="scope">
          <span>{{scope.row.houseNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="120" label="委托人姓名">
        <template slot-scope="scope">
          <span>{{scope.row.wtrUsername}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="180" label="委托人证件号码">
        <template slot-scope="scope">
          <span>{{scope.row.wtrCertNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140" label="委托人手机号码">
        <template slot-scope="scope">
          <span>{{scope.row.wtrMobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="房东姓名">
        <template slot-scope="scope">
          <span>{{scope.row.fdUsername}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="200" label="房东证件号码">
      <template slot-scope="scope">
        <span>{{scope.row.fdCertNo}}</span>
      </template>
    </el-table-column>

      <el-table-column align="center" min-width="180" label="房东手机号码">
        <template slot-scope="scope">
          <span>{{scope.row.fdMobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="合同状态">
        <template slot-scope="scope">
          <span>{{scope.row.dsContractStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="签约特工">
        <template slot-scope="scope">
          <span>{{scope.row.signName }}</span>
        </template>
      </el-table-column>
    </el-table>

    <newdistrict-modal v-if="showModal" @close="showModal = false" @getList="getList" :rentstrategyCode=rentstrategyCode :isEdit="isEdit"></newdistrict-modal>
    <pagination-modal style="text-align:right;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>
  </div>
</template>

<script>
import {
  getlandlordList
} from "@/api/landlord";
import { signCompany, getDownstreamContractType, paymentType,
  getContractDsType, getContractDsRecordStatus, findNeighborhoodInfoMyAll, selectCommunityListMyAll } from "@/api/basedata";
import Utils from "@/utils/common";

export default {
data(){
      return{
        listQuery: {
          page: 1,
          pageSize: 10,
          wtrUsername: "",
          wtrCertNo  : "",
          wtrMobile:"",
          houseNo:"",
          dsContractCode:"",
          neigbodCode:"",
          communityCode:"",
          fdUsername: "",
          fdCertNo  : "",
          fdMobile:"",
          dsContractStatus:"",
          signName:""
        },
        neighborhoodCodeOptions:[],
        communityCodeOptions:[],
        statusOptions:[],
        list: [],
        listLoading: false,
        showModal:false,
        isEdit: false,
        searchLoading:false,
        total:0
      };
    },
  created() {
    this.getList();
    this.deadlineOptions();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getlandlordList(this.listQuery)
        .then(response => {
          console.log(response.data)
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          this.listLoading = false;
          this.searchLoading = false;
        });
    },
    search(){
      this.searchLoading = true;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toView(row) {
      this.$router.push({ path: `/contractmanagement/downstreamcontract/auditcontract/?dsContractCode=${row.dsContractCode}` });
    },
    deadlineOptions() {
      findNeighborhoodInfoMyAll(null).then(response => {
        this.neighborhoodCodeOptions = response.data;
      });
      selectCommunityListMyAll().then(response => {
        this.communityCodeOptions = response.data;
      });
      getContractDsType().then(response => {
        this.statusOptions = response.data;
      });
    }
  }
};
</script>

<style>

</style>
