<template>
  <div class="app-container">
      <el-form class="form-container" :model="listQuery" :inline="true" label-width="120px" ref="searchForm">

        <el-form-item label="租客编号:" prop="tenantsCode">
          <el-input v-model="listQuery.tenantsCode" size="small" placeholder="合同编号" @keyup.enter.native="search"></el-input>
        </el-form-item>

         <el-form-item label="租客名称:" prop="tenantsName">
          <el-input v-model="listQuery.tenantsName" size="small" placeholder="租客名称" @keyup.enter.native="search"></el-input>
        </el-form-item>

        <el-form-item label="租客联系电话:" prop="contactPhone">
          <el-input v-model="listQuery.contactPhone" size="small" placeholder="租客联系电话" @keyup.enter.native="search"></el-input>
        </el-form-item>

        <el-form-item label="公司名称:" prop="companyName">
          <el-input v-model="listQuery.companyName" size="small" placeholder="公司名称" @keyup.enter.native="search"></el-input>
        </el-form-item>

        <el-form-item label="公司电话:" prop="companyPhone">
          <el-input v-model="listQuery.companyPhone" size="small" placeholder="公司电话" @keyup.enter.native="search"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
          <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>

    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="100" label="租客编号" fixed align="center">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.tenantsInfo.tenantsCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="150" label="租客名称">
        <template slot-scope="scope">
          <span>{{scope.row.tenantsInfo.tenantsName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="150" label="租客联系电话">
        <template slot-scope="scope">
          <span>{{scope.row.tenantsInfo.contactPhone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="150" label="公司名称">
        <template slot-scope="scope">
          <span>{{scope.row.tenantsInfo.companyName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="140" label="公司电话">
        <template slot-scope="scope">
          <span>{{scope.row.tenantsInfo.companyPhone}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" width="110" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('updateBtn')" @click="handleClick(scope.row)" type="text" >修改</el-button>
        </template>
      </el-table-column>

    </el-table>

    <edit-modal v-if="showModal" @close="showModal = false" @getList="getList" :row=row></edit-modal>
    <pagination-modal style="text-align:right;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>
  </div>
</template>

<script>
import { getTenantsInfo } from "@/api/tenantsInfo";
 import EditModal from './edit'
// import {getTenantsInfo} from "@/api/basedata";
import Utils from "@/utils/common";

export default {
  components:{
    EditModal
  },
  data() {
    return {
      listQuery: {
        tenantsCode: "",
        tenantsName: "",
        contactPhone: "",
        companyName: "",
        companyPhone: "",
        page: 1,
        pageSize: 10
      },
      row:{
        tenantsCode:"",
        tenantsName:"",
        contactPhone:"",
        companyName:"",
        companyPhone:"",
        version:""
      },
      list: [],
      listLoading: false,
      showModal: false,
      isEdit: false,
      searchLoading: false,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getTenantsInfo(this.listQuery)
        .then(response => {
          console.log(response.data);
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
    search() {
      this.searchLoading = true;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toView(row) {
      // this.$router.push({
      //   path: `/contractmanagement/downstreamcontract/auditcontract/?dsContractCode=${
      //     row.dsContractCode
      //   }`
      // });
    },
    //修改
    handleClick(row){
      this.row.tenantsCode = row.tenantsInfo.tenantsCode
      this.row.tenantsName = row.tenantsInfo.tenantsName
      this.row.contactPhone = row.tenantsInfo.contactPhone
      this.row.companyName = row.tenantsInfo.companyName
      this.row.companyPhone = row.tenantsInfo.companyPhone
      this.row.version = row.tenantsInfo.version
      this.row.socialCreditCode = row.infodetail.socialCreditCode   //社会信用代码
      this.showModal = true
    }
  }
};
</script>

<style>
</style>
