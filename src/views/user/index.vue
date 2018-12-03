<template>
  <div class="app-container calendar-list-container">
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
      <el-form-item label="是否可用" prop="state">
        <el-select v-model="listQuery.state" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('btnOrgUserAdd')" size="small" type="success" icon="plus" @click="showAddDialog">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">

      <el-table-column align="center" label="用户工号" min-width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.jobNum}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户昵称" min-width="110px" text-align="center">
        <template slot-scope="scope">
          <el-switch v-show="scope.row.edit" v-model="scope.row.IS_DEBT_ROLE" active-color="#13ce66" inactive-color="#ccc"></el-switch>
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门ID" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.orgCode}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="用户部门">
        <template slot-scope="scope">
          <span>{{scope.row.orgName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色" min-width="100px">
        <template slot-scope="scope">
          <div style="height: 27px; text-overflow: ellipsis; overflow: hidden;word-break: keep-all;">
            <span v-for="role in scope.row.roles">{{role.roleName}}、</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户状态" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.state | stateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机" min-width="130px">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" v-if="$store.getters.buttons.includes('btnOrgUserModify')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

     <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal>

  </div>
</template>

<script>
import EditModal from "./edit";
import { userList } from "@/api/user";

export default {
  name: "user-list",
  components: {
    EditModal
  },
  data() {
    return {
      isEdit: false, // 是否为编辑状态
      dataId: null, // 编辑时需要传递的主键
      // belongId: null, // 归属部门id
      showModal: false,
      list: null,
      listLoading: true,
      searchLoading: false,
      currentPage: 1,
      total: 0,
      stateOptions: [
        {
          value: "1",
          label: "可用"
        },
        {
          value: "0",
          label: "不可用"
        }
      ],
      listQuery: {
        nickName: "",
        userName: "",
        jobNum: "",
        orgName: "",
        state: null,
        page: 1,
        pageSize: 10
      }
    };
  },
  filters: {
    stateFilter(state) {
      const stateMap = {
        "1": "可用",
        "0": "不可用"
      };
      return stateMap[state];
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      var _this = this;
      userList(this.listQuery)
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
      this.listQuery.pag = 1;
      this.getList();
    },
    showAddDialog() {
      this.isEdit = false;
      this.showModal = true;
    },
    showEditDialog(item) {
      this.dataId = item.id
      // this.belongId = item.belongId
      this.isEdit = true
      this.showModal = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-select {
  width: 100px;
}
</style>
