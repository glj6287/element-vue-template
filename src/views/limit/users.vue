<template>
  <div class="calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true" label-width="70px">
      <el-form-item label="工号" prop="jobNum">
        <el-input v-model="listQuery.jobNum" placeholder="用户工号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="listQuery.userName" placeholder="用户名" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="listQuery.nickName" placeholder="用户昵称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="orgName">
        <el-input v-model="listQuery.orgName" placeholder="用户部门" size="small" clearable></el-input>
      </el-form-item>
      <!--<el-form-item label="属性" prop="belongTo">-->
        <!--<el-select v-model="listQuery.belongTo" size="small" style="width: 174px;" clearable>-->
          <!--<el-option-->
            <!--v-for="item in belongOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="是否可用" prop="state">
        <el-select v-model="listQuery.state" size="small" style="width: 174px;" clearable>
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">

      <el-table-column align="center" label="用户工号" min-width="90px">
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

      <el-table-column align="center" label="权限">
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('btnUserAuth')" type="text" size="small" @click='roleModal(scope.row)'>用户权限</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>

    <role-modal v-if="showRoleModal" @close="showRoleModal = false" :dataId="dataId" :dataCode="dataCode" :dataName="dataName"></role-modal>
  </div>
</template>

<script>
import { userList } from '@/api/user'
import RoleModal from './user-role'

export default {
  name: 'member-list',
  components: {
    RoleModal
  },
  data() {
    return {
      dataId: null,
      dataCode: null,
      dataName: null,
      showRoleModal: false,
      list: null,
      listLoading: true,
      searchLoading: false,
      currentPage: 1,
      total: 0,
      stateOptions: [{
        value: '1',
        label: '可用'
      }, {
        value: '0',
        label: '不可用'
      }],
      listQuery: {
        nickName: '',
        userName: '',
        jobNum: '',
        orgName: '',
        state: null,
        page: 1,
        pageSize: 10
      }
    }
  },
  filters: {
    // belongToFilter(belongTo) {
    //   const belongToMap = {
    //     '1': '公司',
    //     '2': '门店'
    //   }
    //   return belongToMap[belongTo]
    // },
    stateFilter(state) {
      const stateMap = {
        '1': '可用',
        '0': '不可用'
      }
      return stateMap[state]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var _this = this;
      userList(this.listQuery).then(response => {
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

    search() {
      this.searchLoading = true
      this.listQuery.page = 1
      this.getList()
    },
    roleModal(item){
      this.showRoleModal = true
      this.dataName = `${item.userName} - ${item.jobNum}`
      this.dataId = item.id
      this.dataCode = item.userCode
      console.log(item.userCode);
      console.log(item.id);
    },
    dataModal(item) {
      this.dataId = item.id
      this.showModal = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-select {
  width: 100px;
}
</style>
