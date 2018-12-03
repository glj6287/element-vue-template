<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改租客信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :model="organization" :rules="rules" ref="submitForm">

                <el-form-item label="租客名称" prop="tenantsName">
                  <el-input v-model="organization.tenantsName" placeholder="租客名称" ></el-input>
                </el-form-item>

                <el-form-item label="租客联系电话" prop="contactPhone">
                  <el-input v-model="organization.contactPhone" placeholder="租客联系电话" ></el-input>
                </el-form-item>

                <el-form-item label="公司名称" prop="companyName">
                   <el-input v-model="organization.companyName" placeholder="公司名称" ></el-input>
                </el-form-item>

                 <el-form-item label="公司电话" prop="companyPhone">
                   <el-input v-model="organization.companyPhone" placeholder="公司电话" ></el-input>
                </el-form-item>

                 <el-form-item label="社会信用代码" prop="socialCreditCode">
                   <el-input v-model="organization.socialCreditCode" placeholder="社会信用代码" ></el-input>
                </el-form-item>
             
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">修改</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common';
  import {updateMessage} from '@/api/tenantsInfo';

  export default {
    props: {
       row: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        dutySearchLoading: false,
        organization: {
         tenantsCode:this.row.tenantsCode,
         tenantsName:this.row.tenantsName,
         contactPhone:this.row.contactPhone,
         companyName:this.row.companyName,
         companyPhone:this.row.companyPhone,
         version:this.row.version,
         socialCreditCode:this.row.socialCreditCode
        },
        dutyData: {},
        rules: {
          // tenantsName: [
          //   { required: true, message: '请输入租客名称', trigger: 'blur' }
          // ],
          //  contactPhone: [
          //   { required: true, message: '请输入租客联系电话', trigger: 'blur' }
          // ],
          //  companyName: [
          //   { required: true, message: '请输入公司名称', trigger: 'blur' }
          // ],
          //  companyPhone: [
          //   { required: true, message: '请输入公司电话', trigger: 'blur' }
          // ],
          //  socialCreditCode: [
          //   { required: true, message: '请输入社会信用代码', trigger: 'blur' }
          // ],
        }
      }
    },
    created() {
      // this.getList();
    },
    methods: {
      submit() {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            console.log(this.organization);
            this.submitLoading = true;
            updateMessage(this.organization).then(response => {
              this.submitLoading = false;
              console.log(response);
              Utils.success(`修改成功`);
              this.$emit('getList');
              this.$emit('close');
            }).catch(error => {
              console.log(error);
              this.submitLoading = false;
            });
          } else {
            return false
          }
        });
      },
     
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader, .el-select {
    width: 100%;
  }
  .modal-container{
    height: calc(100% - 310px);
  }
</style>
