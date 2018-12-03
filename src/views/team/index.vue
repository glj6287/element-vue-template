<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="团队名称" prop="dptName">
        <el-input v-model="listQuery.dptName" placeholder="团队名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="归属分公司" prop="pidName">
        <el-input v-model="listQuery.pidName" placeholder="归属分公司" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="团队状态" prop="valid">
        <el-select v-model="listQuery.valid" size="small" clearable >
          <el-option
            v-for="item in validOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button size="small" type="success" icon="plus" @click="showAddDialog" v-if="$store.getters.buttons.includes('btnOrgTeamAdd')">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">

      <el-table-column label="团队名称" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.dptName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="归属分公司" min-width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.belongCompany}}</span>
        </template>
      </el-table-column>

      <el-table-column label="归属分部" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.belongDept}}</span>
        </template>
      </el-table-column>

      <el-table-column label="归属区域" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.belongArea}}</span>
        </template>
      </el-table-column>

      <el-table-column label="归属总部" min-width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.belongHQ}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否有效" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.valid | validFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="人员数量" min-width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click='handleShowPeople(scope.row)'>
            <span>{{scope.row.peopleCount}}</span>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('btnOrgTeamModify')" type="text" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" @getList="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal>
    <transfer-modal v-if="showTransfer" @close="showTransfer = false" @getList="getList" :id="id" :pid="pid"></transfer-modal>

  </div>
</template>

<script>
  import EditModal from './edit'
  import TransferModal from './transfer'
  import {teamList} from '@/api/organization'

  export default {
    name: 'department-list',
    components: {
      EditModal,
      TransferModal
    },
    data() {
      return {
        isEdit: false, // 是否为编辑状态
        showModal: false,
        showTransfer: false,
        list: null,
        dataId: null,
        id: null,
        pid: null,
        listLoading: true,
        searchLoading: false,
        currentPage: 1,
        total: 0,
        validOptions: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        nodeLevelOptions: [{
          value: '5',
          label: '团队'
        }],
        listQuery: {
          dptName: '',
          pidName: '',
          valid: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
      validFilter(status) {
        const statusMap = {
          '1': '是',
          '0': '否'
        };
        return statusMap[status]
      },
      peopleCountFilter(status) {
        return status
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        var _this = this;
        teamList(this.listQuery).then(response => {
          this.total = response.count;
          this.list = response.data;
          this.listLoading = false;
          this.searchLoading = false
        }).catch(function (error) {
          console.log(error);
          _this.listLoading = false;
          _this.searchLoading = false
        })
      },

      search() {
        this.searchLoading = true;
        this.listQuery.page = 1;
        this.getList()
      },
      handleShowPeople(row) {
        this.id = row.id;
        this.pid = row.pid;
        this.showTransfer = true;
      },
      showAddDialog(){
        this.isEdit = false
        this.showModal = true
      },
      showEditDialog(item) {
        this.dataId = item.id;
        this.isEdit = true;
        this.showModal = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
