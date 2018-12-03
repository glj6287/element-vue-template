<template>
  <div class="calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true">
      <!--<el-form-item label="名称" prop="procdefName">
        <el-input v-model="listQuery.procdefName" placeholder="流程名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>-->
        <el-form-item label="编码" prop="procdefKey">
          <el-input v-model="listQuery.procdefKey" placeholder="流程编码" size="small" @keyup.enter.native="search"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">

      <el-table-column min-width="200px" label="流程名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" label="流程ID">
        <template slot-scope="scope">
          <el-switch v-show="scope.row.edit" v-model="scope.row.IS_DEBT_ROLE" active-color="#13ce66" inactive-color="#ccc"></el-switch>
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" label="流程编码">
        <template slot-scope="scope">
          <span>{{scope.row.key}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="版本号">
        <template slot-scope="scope">
          <span>{{scope.row.version}}</span>
        </template>
      </el-table-column>

    <!--   <el-table-column width="100px" label="流程图">
        <template scope="scope">
          <span>{{scope.row.ROLE_CODE}}</span>
        </template>
      </el-table-column> -->

       <el-table-column align="center" label="流程图">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showProcessImageClick(scope.row)">查看</el-button>
        </template>
      </el-table-column>

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

    <!-- 流程图弹框区 -->
    <el-dialog title="工作流程图" :visible.sync="workFlowDialog" size="large">
      <img :src="processImageSrc" style="width: 100%; height: 100%;" />
    </el-dialog>

  </div>
</template>

<script>
import { workflowList } from '@/api/workflow'
import { showProcessImage } from '@/api/workflow'

export default {
  name: 'workflow-list',
  data() {
    return {
      list: null,
      listLoading: true,
      searchLoading: false,
      workFlowDialog: false,
      currentPage: 1,
      total: 0,
      processDefinitionId: '',
      processImageSrc: '',
      listQuery: {
        procdefName: '',
        procdefKey: '',
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
      workflowList(this.listQuery).then(response => {
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
    showProcessImageClick(row){
      this.processDefinitionId = row.id;
      this.processImageSrc = `${process.env.BASE_API}/activiti/flow-chart.png?processDefinitionId=${this.processDefinitionId}`
      this.workFlowDialog = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
