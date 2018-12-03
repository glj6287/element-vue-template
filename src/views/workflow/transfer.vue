<template>
  <transition name="modal">
    <div class="modal-mask workflow-transfer">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 900px; height: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">流程角色配置</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-transfer
                filterable
                filter-placeholder="请输入用户拼音"
                v-model="allotedUserList"
                :titles="['系统用户角色', '流程角色用户']"
                :props="{key: 'userId',label: 'connectName'}"
                :data="allUserList">
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
  import {queryAllotProcessRole, bindUserIdToProcess} from '@/api/workflow'

  export default {
    props: {
      pRoleId: {
        type: Number,
        default: null
      },
      sysRoleCode: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        data: null,
        dataQuery: {
          sysRoleCode: ''
        },
        allotedUserList: [],
        allUserList: []
        // ,
        // filterMethod(query, item) {
        //   return item.pinyin.indexOf(query) > -1;
        // }
      };
    },
    created() {
      this.getUnUserData();
    },
    methods: {
      getUnUserData() {
        var _this = this;
        _this.getDataLoading = true;
        _this.dataQuery.sysRoleCode = _this.sysRoleCode;

        queryAllotProcessRole(_this.dataQuery).then(response => {
          console.log(response.data);
          //未分配所有
          this.allUserList = response.data.allUserList;
          console.log(this.allUserList)
          //已分配
          response.data.allotedUserList.forEach(function(user, index) {
            _this.allotedUserList.push(user.userId);
          });
          console.log(this.allotedUserList);
           _this.getDataLoading = false;

        }).catch(function (error) {
          console.log(error);
          _this.getDataLoading = false;
        })
      },
      submit() {
        var _this = this;
        _this.submitLoading = true;

        if(_this.allotedUserList.length==0){
            this.$message.error("用户集合不能为空");
            _this.submitLoading = false;
            return false;
        }

        var data = {
          pRoleId: this.pRoleId,
          sysRoleCode : this.sysRoleCode,
          userIdList : _this.allotedUserList
        };
        console.log(data);

        this.$confirm('确定流程角色配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bindUserIdToProcess(data).then(response => {
            _this.submitLoading = false;
            this.$emit('getList');
            this.$emit('close');
            this.$message({
                 message: '流程角色配置成功',
                 type: 'success'
            });
          }).catch(error => {
            console.log(error);
            _this.submitLoading = false;
          });
        }).catch(() => {
           _this.submitLoading = false;
          this.$message({
            type: 'info',
            message: '已取消流程角色配置'
          });
        });

      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .workflow-transfer .el-transfer-panel {
    width: 380px;
  }
  .workflow-transfer .el-transfer-panel__body {
    height: 350px;
  }
  .workflow-transfer .el-transfer-panel__list.is-filterable {
    height: 282px;
  }
</style>
