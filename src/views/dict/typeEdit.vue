<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;max-height: 400px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}字典类型</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container" :rules="rules" ref="submitForm" :model="dictType" label-width="80px">
                 <el-form-item label="编码" prop="dictType">
                   <el-input v-model="dictType.dictType" placeholder="编码" :disabled="isEdit"></el-input>
                 </el-form-item>
                 <el-form-item label="类型名称" prop="dictName">
                   <el-input v-model="dictType.dictName" placeholder="类型名称"></el-input>
                 </el-form-item>
                <el-form-item label="是否启用" prop="state">
                  <el-switch v-model="dictType.state"
                    active-text="有效" inactive-text="无效"
                    active-value="1" inactive-value="0"></el-switch>
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
import { getDictType, submitDictType } from '@/api/dict'

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
      dictType:{
        id: null,
        dictType:'',
        dictName:'',
        state:'',
      },
      rules: {
        dictType:[
          { required: true, message: '请输入类型编码', trigger: 'blur' }
        ],
        dictName:[
          { required: true, message: '请输入类型名称', trigger: 'blur' }
        ]

      }

    }
  },
  created() {
    if (this.isEdit) {
      this.getDetail();
    }
  },
  methods: {
    getDetail(){
      this.getDataLoading = true;
      getDictType(this.dataId).then( response => {
        this.dictType = response.data;
        this.getDataLoading = false;
      }).catch(error => {
        Utils.error(error);
        this.getDataLoading = false;
      })
    },
    submit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          delete this.dictType.createTime;
          delete this.dictType.updateTime;
          console.log(this.dictData);
          submitDictType(this.isEdit, this.dictType).then( response => {
            this.submitLoading = false;
            this.$emit('close');
            this.$emit('refresh');
            //this.getDictDataList();
            Utils.success(`${this.isEdit ? '修改' : '添加'}成功`);
          }).catch( error => {
            Utils.error(error);
            this.submitLoading = false;
          })
        } else {
          return false;
        }
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-cascader, .el-select {
//   width: 100%;
// }
</style>
