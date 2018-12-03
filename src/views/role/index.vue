<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="listQuery.roleName" size="small" placeholder="角色名称" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('btnOrgRoleAdd')"
                   type="success" size="small" icon="plus" @click="showModal = true">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit  style="width: 100%">

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

      <el-table-column align="center" label="是否有效">
        <template slot-scope="scope">
          <el-switch v-show="scope.row.edit" v-model="scope.row.state"
                     active-text="是" inactive-text="否" active-value="1" inactive-value="0"></el-switch>
          <span v-show="!scope.row.edit"
                :type="scope.row.state | debtFilter">{{scope.row.state | debtFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建者">
        <template slot-scope="scope">
          <span>{{scope.row.creator}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" v-if="$store.getters.buttons.includes('btnOrgRoleModify')">
        <template slot-scope="scope">
          <el-button :type="scope.row.edit ? 'primary' : 'text'" size="small" @click='handleEdit(scope.row)'>
            {{scope.row.edit ? '完成' : '编辑'}}
          </el-button>
          <el-button v-if="scope.row.edit" type="text" size="small" @click='handleCancel(scope.row)'>取消</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" :isEdit="isEdit" :dataId="dataId"></edit-modal>
  </div>
</template>

<script>
  import EditModal from './edit'
  import {roleList, roleEdit} from '@/api/role'

  export default {
    name: 'role-list',
    components: {
      EditModal
    },
    data() {
      return {
        isEdit: false, // 是否为编辑状态
        showModal: false,
        list: null,
        dataId: null,
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
          '1': '有效',
          '0': '无效'
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
