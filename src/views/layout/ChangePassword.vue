<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-drag style="max-width: 500px; height: 500px;">
          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改密码</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="">
            <slot name="body">
              <el-form class="form-container" :model="form" :rules="rules" ref="submitForm" label-position="top" label-width="80px">
                <el-form-item label="用户名">
                 {{userName}}
                </el-form-item>

                <el-form-item label="原密码" prop="password">
                  <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="newPassword">
                  <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码确认" prop="repeatPassword">
                  <el-input type="password" v-model="form.repeatPassword" auto-complete="off"></el-input>
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
  /* eslint-disable no-unused-vars */

  import { mapGetters } from 'vuex'
  import Utils from '@/utils/common'
  import { changePassword } from '@/api/login'

  export default {
    data() {
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        submitLoading: false,
        form: {
          password: '',
          newPassword: '',
          repeatPassword: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入原始密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新的密码', trigger: 'blur' }
          ],
          repeatPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'userName',
        'nickName',
        'jobNumber'
      ])
    },
    methods: {
      submit() {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            changePassword(this.form).then(response => {
              this.submitLoading = false
              Utils.success('密码修改成功')
              this.$emit('close')
            }).catch(() => {
              this.submitLoading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    margin-bottom: 22px;
  }
</style>
