<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 750px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">「{{userName}}」权限设置</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body" v-loading="listLoading">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedRoles" @change="handleCheckedChange">
                <el-row :gutter="10">
                  <el-col :span="6" v-for="role in roles" :key="role.id">
                    <el-checkbox :label="role.roleCode" :key="role.roleCode">{{role.roleName}}</el-checkbox>
                  </el-col>
                </el-row>
              </el-checkbox-group>
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
import Utils from '@/utils/common'
import { allRoleList } from '@/api/role'
import { roleByUser, modifyUserRole } from '@/api/limit'

export default {
  props: {
    dataId: {
      type: Number,
      default: null
    },
    dataCode: {
      type: String,
      default: null
    },
    dataName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      listLoading: true,
      submitLoading: false,
      userName: this.dataName,
      checkAll: false,
      checkedRoles: [],
      roles: [],
      isIndeterminate: false
    }
  },
  mounted() {
    this.getUserRoles()
  },
  methods: {
    getRoles() {
      allRoleList().then(response => {
        this.roles = response.data
        this.listLoading = false
      }).catch( error => {
        this.listLoading = false
      })
    },
    getUserRoles() {
      this.listLoading = true
      roleByUser(this.dataCode).then(response => {
        this.checkedRoles = response.data
        if (this.checkedRoles.length > 0) {
          this.isIndeterminate = true
        }
        this.getRoles()
      }).catch( error => {
        this.listLoading = false
      })
    },
    submit() {
      this.submitLoading = true
      var roleIdStr = "";
      this.checkedRoles.forEach(function(item) {
        if (roleIdStr !== "") {
          roleIdStr += "&"
        }
        roleIdStr += "roleCodes=" + item
      })
      console.log(roleIdStr);
      modifyUserRole(this.dataCode, roleIdStr).then( response => {
        Utils.success(response.msg)
        this.submitLoading = false
        this.$emit('close')
      }).catch( error => {
        this.submitLoading = false
      })
    },
    handleCheckAllChange(event) {
      if (event.target.checked) {
        var _this = this;
        this.roles.forEach(function(item, i) {
          _this.checkedRoles.push(item.roleCode)
        })
      } else {
        this.checkedRoles = [];
      }

      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container{
  height: 850px!important;
  overflow: hidden!important;
}
.el-row {
  margin-right: 0px !important;
}
.el-checkbox {
  line-height: 30px;
}
</style>
