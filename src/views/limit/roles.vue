<template>
  <div class="calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true" @submit.native.prevent>
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="listQuery.roleName" placeholder="角色名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="searchLoading" size="small" type="primary" icon="search" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <el-input v-show="scope.row.edit" size="small" v-model="scope.row.roleName"></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色编码">
        <template slot-scope="scope">
          <span>{{scope.row.roleCode}}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建者">
        <template slot-scope="scope">
          <span>{{scope.row.creator}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('btnAuthConfig')" type="text" size="small" @click='limitConfigModal(scope.row)'>权限配置</el-button>
          <el-button v-if="$store.getters.buttons.includes('btnUserList')" type="text" size="small" @click='memberListModal(scope.row)'>成员列表</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <member-modal v-if="showMemberModal" @close="showMemberModal = false" :dataId="dataId" :dataName="dataName"></member-modal>
    <menu-modal v-if="showMenuModal" @close="showMenuModal = false" :dataId="dataId" :dataCode="dataCode" :dataName="dataName"></menu-modal>
  </div>
</template>

<script>
  import MemberModal from './role-member'
  import MenuModal from './role-menu'
  import {roleList, roleEdit} from '@/api/role'

  export default {
    name: 'role-list',
    components: {
      MemberModal,
      MenuModal
    },
    data() {
      return {
        isEdit: false, // 是否为编辑状态
        dataId: null,
        dataCode:null,
        dataName: null,
        showMemberModal: false,
        showMenuModal: false,
        list: null,
        listLoading: false,
        searchLoading: false,
        currentPage: 1,
        total: 0,
        listQuery: {
          roleName: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
      debtFilter(status) {
        const statusMap = {
          '1': '是',
          '0': '否'
        }
        return statusMap[status]
      },
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
        roleList(this.listQuery).then(response => {
          const items = response.data
          this.list = items.map(v => {
            this.$set(v, 'edit', false)
            return v
          })
          this.total = response.count
          this.listLoading = false
          this.searchLoading = false
        }).catch(function (error) {
          console.log(error)
          this.listLoading = false
          this.searchLoading = false
        })
      },
      handleEdit(row) {
        console.log(row);
        if (row.edit) {
          delete row.createTime
          delete row.updateTime
          roleEdit(row)
        }
        row.edit = !row.edit
      },
      handleCancel(row) {
        row.edit = false
      },

      search() {
        this.searchLoading = true
        this.listQuery.page = 1
        this.getList()
      },
      limitConfigModal(item) {
        this.showMenuModal = true
        this.dataId = item.id
        this.dataCode = item.roleCode
        this.dataName = item.roleName
      },
      memberListModal(item) {
        this.showMemberModal = true
        this.dataId = item.id
        this.dataName = item.roleName
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
