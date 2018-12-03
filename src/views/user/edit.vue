<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 700px;height: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}用户信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container" :rules="rules" ref="submitForm" :model="user" label-width="100px">
                <el-form-item label="工号" prop="jobNum">
                  <el-input v-model="user.jobNum" placeholder="工号" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="user.userName" placeholder="用户名"></el-input>
                </el-form-item>
                 <el-form-item label="昵称" prop="nickName">
                   <el-input v-model="user.nickName" placeholder="用户昵称"></el-input>
                 </el-form-item>
                 <el-form-item label="密码" prop="userPwd">
                   <el-input v-model="user.userPwd" placeholder="用户密码"></el-input>
                 </el-form-item>
                 <el-form-item label="手机" prop="phone">
                   <el-input v-model="user.phone" placeholder="手机"></el-input>
                 </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="user.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="orgCode">
                  <el-select v-model="user.orgCode" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.orgCode"
                      :label="item.orgName"
                      :value="item.orgCode">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" v-if="isEdit">
                  <el-switch v-model="user.state"
                    active-text="有效" inactive-text="无效"
                    active-value="1" inactive-value="0"></el-switch>
                </el-form-item>

                <el-form-item label="是否全部社区">
                  <el-switch v-model="user.communityState"
                    active-text="是" inactive-text="否"
                    active-value="1" inactive-value="0" ></el-switch>
                </el-form-item>

                 <el-form-item label="" >
                    <div style="margin: 15px 0;"></div>
                   <el-checkbox-group v-model="user.communityCodes">
                      <el-row :gutter="10">
                        <el-col :span="8" v-for="item in communityList" :key="item.communityCode">
                          <el-checkbox :label="item.communityCode" :key="item.communityCode">{{item.communityName}}</el-checkbox>
                        </el-col>
                      </el-row>
                    </el-checkbox-group>
                </el-form-item>
              </el-form>
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
import Utils from "@/utils/common";
import {
  getUser,
  submitUser,
  getOrgCodeList,
  handleRoleList
} from "@/api/user";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dataId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      options: [],
      submitLoading: false,
      getDataLoading: false,
      isIndeterminate: false,
      user: {
        orgCode: "",
        id: this.dataId,
        userName: "",
        nickName: "",
        jobNum: "",
        phone: "",
        email: "",
        state: "",
        communityState: "",
        communityCodes: []
      },
      communityList: [],
      rules: {
        jobNum: [
          { required: true, message: "请输入用户工号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPwd: [
          {
            required: !this.isEdit,
            message: "请输入用户密码",
            trigger: "blur"
          },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        nickName: [],
        phone: []
      }
    };
  },
  created() {
    this.getList();
    this.getOrgcode();
    this.getRoleList();
  },
  methods: {
    getOrgcode() {
      getOrgCodeList()
        .then(response => {
          var orgData = response.data;
          orgData.forEach(ele => {
            this.options.push(ele);
          });
        })
        .catch(error => {
          Utils.error(error);
        });
    },

    getList() {
      this.getDataLoading = true;
      console.log(this.isEdit)
      if (this.isEdit) {
        console.log(this.isEdit)
        this.getDetail();
      }
      this.getDataLoading = false;
    },
    getDetail() {
      this.getDataLoading = true;
      getUser(this.dataId)
        .then(response => {
          // this.user = response.data;
          this.user.jobNum = response.data.jobNum;
          this.user.userCode = response.data.userCode;
          this.user.userName = response.data.userName;
          this.user.nickName = response.data.nickName;
          this.user.userPwd = response.data.userPwd;
          this.user.phone = response.data.phone;
          this.user.email = response.data.email;
          this.user.orgCode = response.data.orgCode;
          if (response.data.communityCodes != null) {
            this.user.communityCodes = response.data.communityCodes;
          }
          // 这个控件需要用字符串才能设置默认值
          this.user.state = `${response.data.state}`;
          this.user.communityState = `${response.data.communityState}`;
          this.user.userPwd = ""; // 页面不显示用户密码
          // if (this.user.communityState === "1") {
          //   this.handleCheckAllChange(event);
          // }
          this.getDataLoading = false;
        })
        .catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
        });
    },
    // 判断是否是全小区
    getRoleList() {
      handleRoleList(this.dataId).then(response => {
        response.data.communityAllList.forEach(ele => {
          this.communityList.push(ele);
        });
      });
    },
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          delete this.user.createTime;
          delete this.user.updateTime;
          if (!this.isEdit) {
            this.user.id = "";
          }
          submitUser(this.isEdit, this.user)
            .then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
            })
            .catch(error => {
              Utils.error(error);
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
/*.modal-container {*/
  /*height: auto !important;*/
/*}*/
.modal-body{
   overflow-x: hidden!important;
}
.modal-container {
  // max-width: 700px !important;
  height: 800px !important;
  overflow-y: hidden!important;
}
</style>
