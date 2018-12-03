<template>
  <div class="calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="listQuery.roleName" placeholder="角色名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="listQuery.roleCode" placeholder="角色编码" size="small" @keyup.enter.native="search"></el-input>
        </el-form-item>
      <el-form-item label="流程名称" prop="processName">
        <el-input v-model="listQuery.processName" placeholder="流程名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">

      <el-table-column min-width="180px" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="角色编码">
        <template slot-scope="scope">
          <el-switch v-show="scope.row.edit" v-model="scope.row.IS_DEBT_ROLE" active-color="#13ce66" inactive-color="#ccc"></el-switch>
          <span>{{scope.row.roleCode}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="流程名称">
        <template slot-scope="scope">
          <span>{{scope.row.processName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.creater}}</span>
        </template>
      </el-table-column>

        <el-table-column width="180px" label="系统角色编码">
        <template slot-scope="scope">
          <span>{{scope.row.sysRoleCode}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('btnFlowRoleConfModify')" type="text" size="small" @click="handleShowPeople(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    <!--   <el-table-column width="100px" label="流程图">
        <template scope="scope">
          <span>{{scope.row.ROLE_CODE}}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column width="150px" label="修改人">
        <template scope="scope">
          <span>{{scope.row.creater}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" label="修改时间">
        <template scope="scope">
          <span>{{scope.row.creater}}</span>
        </template>
      </el-table-column> -->

    </el-table>

     <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <transfer-modal v-if="showTransfer" @close="showTransfer = false" @getList="getList" :pRoleId="pRoleId" :sysRoleCode="sysRoleCode"></transfer-modal>

  </div>
</template>

<script>

import { workflowRoleList } from '@/api/workflow'
import TransferModal from './transfer'

export default {
  name: 'workflowrole-list',
  components: {
    TransferModal
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchLoading: false,
      currentPage: 1,
      total: 0,
      sysRoleCode:'',
      pRoleId:'',
      showTransfer: false,
      listQuery: {
        processName: '',
        roleName: '',
        roleCode: '',
        page: 1,
        pageSize: 10
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'true': '是',
        'false': '否'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var _this = this;
      workflowRoleList(this.listQuery).then(response => {
        this.total = response.count
        this.list = response.data
        this.listLoading = false
        this.searchLoading = false
      }).catch(function(error) {
        console.log(error)
        _this.listLoading = false
        _this.searchLoading = false
      })
    },
    handleEdit(row) {
      if (row.edit) {
        // submit row data
        roleEdit(row)
      }
      row.edit=!row.edit
    },

    search() {
      this.searchLoading = true
      this.listQuery.page = 1
      this.getList()
    },
    handleShowPeople(row) {
        this.sysRoleCode = row.sysRoleCode;
        this.pRoleId = row.pRoleId;
        this.showTransfer = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
