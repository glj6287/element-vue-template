<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="模板类型" prop="tplType">
        <el-input v-model="listQuery.tplType" size="small" placeholder="模板类型" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="模板名称" prop="tplName">
        <el-input v-model="listQuery.tplName" size="small" placeholder="模板名称" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="listQuery.state" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('addMsgTemp')"
                   type="success" size="small" icon="plus" @click="showAddDialog">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit  style="width: 100%">

      <el-table-column label="模板类型" min-width="200px">
        <template slot-scope="scope">
          <span v-show="!scope.row.edit">{{ scope.row.tplType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="模板编号" min-width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.tplCode}}</span>
        </template>
      </el-table-column>

      <el-table-column label="模板名称" min-width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.tplName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="模板内容" min-width="500px">
        <template slot-scope="scope">
          <span>{{scope.row.tplContent}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.state | debtFilter}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="创建者" min-width="200px">-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.creator}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="操作" v-if="$store.getters.buttons.includes('updateMsgTemp')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click='showEditDialog(scope.row)'>编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal>
  </div>
</template>

<script>
  import EditModal from './edit'
  import {msgTempList} from '@/api/msgtemp'

  export default {
    name: 'msgtemp-list',
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
        stateOptions: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "删除"
          },
          {
            value: "2",
            label: "停用"
          }
        ],
        listQuery: {
          tplType: '',
          tplName: '',
          state: null,
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
      debtFilter(status) {
        const statusMap = {
          '0': '正常',
          '1': '删除',
          '2': '停用'
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
        msgTempList(this.listQuery).then(response => {
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
      showAddDialog() {
        this.isEdit = false;
        this.showModal = true;
      },
      showEditDialog(item) {
        this.dataId = item.id
        this.isEdit = true
        this.showModal = true
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
