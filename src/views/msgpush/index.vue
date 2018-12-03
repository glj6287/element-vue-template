<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="消息类型" prop="msgType">
        <el-input v-model="listQuery.msgType" size="small" placeholder="消息类型" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="接收人" prop="receiveCode">
        <el-input v-model="listQuery.receiveCode" size="small" placeholder="接收人" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="接收用户编码" prop="receiveUserCode">
        <el-input v-model="listQuery.receiveUserCode" size="small" placeholder="接收用户编码" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="发送用户编码" prop="sendUserCode">
        <el-input v-model="listQuery.sendUserCode" size="small" placeholder="发送者用户编码" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="推送状态" prop="pushStatus">
        <el-select v-model="listQuery.pushStatus" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('addMsgPush')"
                   type="success" size="small" icon="plus" @click="showAddDialog">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit  style="width: 100%">

      <el-table-column label="消息类型" width="100px ">
        <template slot-scope="scope">
          <span>{{ scope.row.msgTypeText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="消息标题" >
        <template slot-scope="scope">
          <span>{{scope.row.msgTitle}}</span>
        </template>
      </el-table-column>

      <el-table-column label="消息内容" width="300px">
        <template slot-scope="scope">
          <span>{{scope.row.msgContent}}</span>
        </template>
      </el-table-column>

      <el-table-column label="接收人" >
        <template slot-scope="scope">
          <span>{{scope.row.receiveCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="接收用户编码" >
        <template slot-scope="scope">
          <span>{{scope.row.receiveUserCode}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发送用户编码" >
        <template slot-scope="scope">
          <span>{{scope.row.sendUserCode}}</span>
        </template>
      </el-table-column>

      <el-table-column label="推送时间" >
        <template slot-scope="scope">
          <span>{{scope.row.sendDate}}</span>
        </template>
      </el-table-column>

      <el-table-column label="计划推送时间" >
        <template slot-scope="scope">
          <span>{{scope.row.planPushDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="推送状态">
        <template slot-scope="scope">
          <span>{{scope.row.pushStatus | debtFilter}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="创建者" >-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.creator}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="操作" v-if="$store.getters.buttons.includes('updateMsgPush')">
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
  import {msgPushList} from '@/api/msgpush'

  export default {
    name: 'msgpush-list',
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
            label: "未推送"
          },
          {
            value: "1",
            label: "成功"
          },
          {
            value: "2",
            label: "失败"
          },
          {
            value: "3",
            label: "推送中"
          }
        ],
        listQuery: {
          msgType: '',
          receiveUserCode: '',
          sendUserCode: '',
          pushStatus: null,
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
      debtFilter(status) {
        const statusMap = {
          '0': '未推送',
          '1': '成功',
          '2': '失败',
          '3': '推送中'
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
        msgPushList(this.listQuery).then(response => {
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
