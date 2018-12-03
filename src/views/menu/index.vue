<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true">
      <el-form-item label="名称" prop="menuName">
        <el-input v-model="listQuery.menuName" size="small" placeholder="菜单名称" @keyup.enter.native="search"></el-input>
      </el-form-item>
        <el-form-item label="父菜单" prop="pidName">
          <el-input v-model="listQuery.pidName" size="small" placeholder="父菜单名称" @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="state">
          <el-select v-model="listQuery.state" size="small" clearable>
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button v-loading="searchLoading" @click="search" size="small"
                   type="primary" icon="search" v-if="$store.getters.buttons.includes('btnMenuQuery')">查询</el-button>
        <!-- <el-button type="primary" @click="showModal = true" size="small" v-if="$store.getters.buttons.includes('btnMenuAdd')">添加</el-button> -->
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">

      <el-table-column label="菜单名称" >
        <template slot-scope="scope">
          <span>{{ scope.row.menuCode }}|{{ scope.row.menuName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="菜单URL">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>

      <el-table-column label="父菜单名称">
        <template slot-scope="scope">
          <span>{{scope.row.pidName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否可用" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state | statusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="$store.getters.buttons.includes('btnMenuModify')" @click="showMenuDialog(scope.row)">编辑</el-button>
          <el-button type="text" size="small" v-if="$store.getters.buttons.includes('btnMenuBtnModify')" @click="showButtonsDialog(scope.row)">菜单按钮</el-button>
        </template>
      </el-table-column>

    </el-table>

     <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>

    <buttons-modal v-if="showModal" @close="showModal = false" :dataId="dataId" :dataCode="dataCode" :menuName="menuName"></buttons-modal>

    <edit-modal v-if="showMenunModal" @close="showMenunModal = false" @getList="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal>

  </div>
</template>

<script>
import ButtonsModal from './buttons'
import EditModal from './edit'
import { menuList } from '@/api/menu'

export default {
  name: 'menu-list',
  components: {
    ButtonsModal,
    EditModal
  },
  data() {
    return {
      isEdit: false, // 是否为编辑状态
      dataId: null,
      dataCode:'',
      menuName: '',
      showModal: false,
      showMenunModal: false,
      list: null,
      listLoading: true,
      searchLoading: false,
      currentPage: 1,
      total: 0,
      listQuery: {
        menuName: '',
        pidName: '',
        state: '',
        page: 1,
        pageSize: 10
      },
      stateOptions: [{
        value: '1',
        label: '可用'
      }, {
        value: '0',
        label: '不可用'
      }]
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '可用',
        '0': '不可用'
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
      menuList(this.listQuery).then(response => {
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
    showButtonsDialog(item) {
      this.showModal = true
      this.menuName = item.menuName
      this.dataId = item.id
      this.dataCode = item.menuCode;
      console.log(item.menuCode);
    },
    showMenuDialog(row) {
      this.dataId = row.id;
      this.isEdit = true;
      this.showMenunModal = true
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
