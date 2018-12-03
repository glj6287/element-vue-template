<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 550px; height: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">人员管理</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入员工拼音"
                v-model="dataUserList"
                :titles="['非当前团队员工', '当前团队员工']"
                :props="{
                  key: 'id'
                }"
                :data="dataUserListByBelongId">

                <!--<el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>-->
                <!--<el-button class="transfer-footer" slot="right-footer" size="small">确认</el-button>-->
              </el-transfer>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {userList, userListByBelongId, modifyOrganUserList} from '@/api/organization'

  export default {
    props: {
      id: {
        type: Number,
        default: null
      },
      pid: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        data: null,
        dataQuery: {
          teamId: '',
          belongId: ''
        },
        dataUserListByBelongId: [],
        dataUserList: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    },
    created() {
      this.getUnUserData();
    },
    methods: {
      getUnUserData() {
        var _this = this;
        _this.getDataLoading = true;
        // _this.dataQuery.teamId = _this.id;
        delete _this.dataQuery.teamId;
        _this.dataQuery.belongId = _this.pid;
        userListByBelongId(_this.dataQuery).then(response => {
          this.dataUserListByBelongId = response.data;
          _this.getDataLoading = false;
          this.getUserData();
        }).catch(function (error) {
          console.log(error);
          _this.getDataLoading = false;
        })
      },
      getUserData() {
        var _this = this;
        _this.getDataLoading = true;
        _this.dataQuery.teamId = _this.id;
        _this.dataQuery.belongId = _this.pid;
        userList(_this.dataQuery).then(response => {
          var data = [];
          var userList = response.data;
          userList.forEach((user, index) => {
            data.push(user.id);
          });
          this.dataUserList = data;
          _this.getDataLoading = false;
        }).catch(function (error) {
          console.log(error);
          _this.getDataLoading = false;
        })
      },
      submit() {
        var _this = this;
        _this.submitLoading = true;
        var data = {
          belongId : this.pid,
          teamId : this.id,
          keyList : _this.dataUserList
        };
        modifyOrganUserList(data).then(response => {
          _this.submitLoading = false;
          this.$emit('getList');
          this.$emit('close');
        }).catch(error => {
          console.log(error);
          _this.submitLoading = false;
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader, .el-select {
    width: 100%;
  }
</style>
