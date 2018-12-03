<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="部门编号" prop="orgCode">
        <el-input v-model="listQuery.orgCode" placeholder="部门编号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="orgName">
        <el-input v-model="listQuery.orgName" placeholder="部门名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="父级部门编号" prop="pidCode">
        <el-input v-model="listQuery.pidCode" placeholder="父级部门编号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="listQuery.state" size="small" clearable>
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
        <el-button  size="small" v-if="$store.getters.buttons.includes('btnOrgDepartmentAdd')"
                   type="success" icon="plus" @click="showAddDialog">添加</el-button>
      </el-form-item>
      <!-- v-if="$store.getters.buttons.includes('btnOrgDepartmentAdd')" -->
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">

      <el-table-column  label="部门编码">
        <template slot-scope="scope">
          <span>{{ scope.row.orgCode }}</span>
        </template>
      </el-table-column>

      <el-table-column  label="部门名称">
        <template slot-scope="scope">
          <span>{{ scope.row.orgName }}</span>
        </template>
      </el-table-column>

      <el-table-column  label="父级编号">
        <template slot-scope="scope">
          <span>{{ scope.row.pidCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门负责人编号">
        <template slot-scope="scope">
          <span>{{ scope.row.dutyCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门负责人名称">
        <template slot-scope="scope">
          <span>{{ scope.row.dutyName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否有效">
        <template slot-scope="scope">
          <span>{{scope.row.state | validFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" v-if="$store.getters.buttons.includes('btnOrgDepartmentModify')">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
        <!-- v-if="$store.getters.buttons.includes('btnOrgDepartmentModify')" -->
      </el-table-column>
    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>

    <edit-modal v-if="showModal" @close="showModal = false" @getList="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal>

  </div>
</template>

<script>
import EditModal from "./edit";
import { organizationList } from "@/api/organization";

export default {
  // name: "organization-list",
  components: {
    EditModal
  },
  data() {
    return {
      isEdit: false, // 是否为编辑状态
      showModal: false,
      showPeopleCount: false,
      list: null,
      dataId: null,
      listLoading: true,
      searchLoading: false,
      currentPage: 1,
      total: 0,
      validOptions: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      nodeLevelOptions: [
        {
          value: "5",
          label: "团队"
        }
      ],
      listQuery: {
        orgCode: "",
        orgName: "",
        pidCode: "",
        state: "",
        page: 1,
        pageSize: 10
      }
    };
  },
  filters: {
    validFilter(status) {
      const statusMap = {
        "1": "是",
        "0": "否"
      };
      return statusMap[status];
    },
    peopleCountFilter(status) {
      return status;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      var _this = this;
      organizationList(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(function(error) {
          console.log(error);
          _this.listLoading = false;
          _this.searchLoading = false;
        });
    },

    search() {
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.getList();
    },
    showAddDialog() {
      this.isEdit = false;
      this.showModal = true;
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
};
</script>
