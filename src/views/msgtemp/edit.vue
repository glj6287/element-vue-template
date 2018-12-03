<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}消息模板信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="temp">
                <el-form-item label="模板类型" prop="tplType">
                  <el-input v-model="temp.tplType" placeholder="模板类型"></el-input>
                </el-form-item>
                <el-form-item label="模板编号" prop="tplCode">
                  <el-input v-model="temp.tplCode" placeholder="模板编号"></el-input>
                </el-form-item>
                <el-form-item label="模板名称" prop="tplName">
                  <el-input v-model="temp.tplName" placeholder="模板名称"></el-input>
                </el-form-item>
                <el-form-item label="模板内容" prop="tplContent">
                  <el-input type="textarea"
                            :rows="2" v-model="temp.tplContent" placeholder="模板内容"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="temp.state" size="small" style="width: 174px;" clearable>
                    <el-option v-for="item in stateOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
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
  import Utils from '@/utils/common'
  import { getTemp, submitTemp } from '@/api/msgtemp'

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
        submitLoading: false,
        getDataLoading: false,
        temp: {
          id: this.dataId,
          tplType: '',
          tplCode: '',
          tplName: '',
          tplContent: '',
          state: '0'
        },
        stateOptions: [{
          value: '0',
          label: '正常'
        }, {
          value: '1',
          label: '删除'
        }, {
          value: '2',
          label: '停用'
        }],
        rules: {
          tplType: [
            { required: true, message: '请输入模板类型', trigger: 'blur' }
          ],
          tplCode: [
            { required: true, message: '请输入模板编号', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        console.log(this.isEdit);
        this.getDetail();
      }
    },
    methods: {
      getDetail() {
        this.getDataLoading = true;
        getTemp(this.dataId)
          .then(response => {
            this.temp = response.data;
            // 这个控件需要用字符串才能设置默认值
            this.temp.tplType = `${response.data.tplType}`;
            this.temp.tplCode = `${response.data.tplCode}`;
            this.temp.tplName = `${response.data.tplName}`;
            this.temp.tplContent = `${response.data.tplContent}`;
            this.temp.state = `${response.data.state}`;
            this.getDataLoading = false;
          })
          .catch(error => {
            Utils.error(error);
            this.getDataLoading = false;
          });
      },
      submit() {
        this.$refs["submitForm"].validate(valid => {
          if (valid) {
            this.submitLoading = true;
            delete this.temp.createTime;
            delete this.temp.updateTime;
            if (!this.isEdit) {
              this.temp.id = "";
            }
            submitTemp(this.isEdit, this.temp)
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
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.el-cascader, .el-select {*/
    /*width: 100%;*/
  /*}*/
</style>
