<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="120px" ref="searchForm">
      <el-form-item label="合同编号:" prop="contractCode">
        <el-input v-model="listQuery.contractCode" size="small" placeholder="合同编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号:" prop="bankCard">
        <el-input v-model="listQuery.bankCard" size="small" placeholder="银行卡号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="收款人姓名:" prop="payeeName">
        <el-input v-model="listQuery.payeeName" size="small" placeholder="收款人姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="180" label="合同编号" fixed align="center">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.contractCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140" label="收款人编号">
        <template slot-scope="scope">
          <span>{{scope.row.payeeCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="140" label="收款人姓名">
        <template slot-scope="scope">
          <span>{{scope.row.payeeName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="银行卡卡号">
        <template slot-scope="scope">
          <span>{{scope.row.bankCard}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="120" label="银行卡名称">
        <template slot-scope="scope">
          <span>{{scope.row.bankName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="180" label="支行名称">
        <template slot-scope="scope">
          <span>{{scope.row.bankSubbranchName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="操作" v-if="$store.getters.buttons.includes('shipBillCancel')" >
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('updateBtn')" @click="showEditDialog(scope.row)" type="text" >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-modal v-if="showModal" @close="showModal = false" @getList="getList" :contractCode=contractCode :isEdit="isEdit"></edit-modal>
    <pagination-modal style="text-align:right;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>
  </div>
</template>

<script>
  import { getpayeeList } from "@/api/payee";
  import EditModal from "./edit";

  export default {
    components: {
      EditModal
    },
    data() {
      return {
        listQuery: {
          page: 1,
          pageSize: 10,
          contractCode: "",
          bankCard: "",
          payeeName: ""
        },
        list: [],
        listLoading: false,
        showModal: false,
        isEdit: false,
        searchLoading: false,
        contractCode: "",
        total: 0
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        getpayeeList(this.listQuery)
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
        this.$router.push({ path: `upstreamcontract/detailinfo/?contractCode=${row.contractCode}` });
      },
      showEditDialog(row) {
        console.log(row.contractCode);
        this.contractCode = row.contractCode;
        this.isEdit = true;
        this.showModal = true;
      }
    }
  };
</script>

<style>

</style>
