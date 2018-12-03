<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 1200px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">「{{roleName}}」成员列表</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true">
                <el-form-item label="用户工号" prop="jobNum">
                  <el-input v-model="listQuery.jobNum" placeholder="用户工号" size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="listQuery.userName" placeholder="用户名" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" v-loading="searchLoading" @click="search">查询</el-button>
                  <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
              </el-form>

              <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">

                <el-table-column align="center" label="用户工号" >
                  <template slot-scope="scope">
                    <span>{{scope.row.jobNum}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="用户名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.userName }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="用户昵称">
                  <template slot-scope="scope">
                    <el-switch v-show="scope.row.edit" v-model="scope.row.IS_DEBT_ROLE" active-color="#13ce66" inactive-color="#ccc"></el-switch>
                    <span>{{scope.row.nickName}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="用户部门">
                  <template slot-scope="scope">
                    <span>{{scope.row.orgName}}</span>
                  </template>
                </el-table-column>

                <!--<el-table-column align="center" label="用户属性">-->
                  <!--<template scope="scope">-->
                    <!--<span>{{scope.row.belongTo | belongToFilter}}</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->

                <el-table-column align="center" label="用户状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.state | stateFilter}}</span>
                  </template>
                </el-table-column>

              </el-table>
               <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getMembers"></pagination-modal>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from '@/utils/common'
import { members } from '@/api/role'

export default {
  props: {
    dataId: {
      type: Number,
      default: null
    },
    dataName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      listLoading: true,
      searchLoading: false,
      list: null,
      roleName: this.dataName,
      currentPage: 1,
      total: 0,
      listQuery: {
        userName: '',
        jobNumber: '',
        page: 1,
        pageSize: 10
      },
      belongOptions: [{
        value: 1,
        label: '公司'
      }, {
        value: 2,
        label: '门店'
      }]
    }
  },
  created() {
    this.getMembers()
  },
  filters: {
    belongToFilter(belongTo) {
      const belongToMap = {
        '1': '公司',
        '2': '门店'
      }
      return belongToMap[belongTo]
    },
    stateFilter(state) {
      const stateMap = {
        '1': '可用',
        '2': '不可用'
      }
      return stateMap[state]
    }
  },
  methods: {
    getMembers(){
      this.listLoading = true
      members(this.dataId, this.listQuery).then( response => {
        this.total = response.count
        this.list = response.data
        this.listLoading = false
      }).catch(error => {
        Utils.error(error)
        this.listLoading = false
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.listQuery.startDate='';
    },
    search() {
      this.listLoading = true
      this.listQuery.page = 1
      this.getMembers()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-cascader, .el-select {
//   width: 100%;
// }
</style>
