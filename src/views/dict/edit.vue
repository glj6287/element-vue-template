<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}数据字典</h3>
              <i class="el-dialog__close el-icon el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container" :rules="rules" ref="submitForm" :model="dictData" label-width="80px">
                <!--<el-form-item label="上级编号" prop="pidCode">-->
                  <!--<el-input v-model="dictData.pidCode" placeholder="上级编号"></el-input>-->
                <!--</el-form-item>-->
                 <el-form-item label="类型" prop="dictType">
                   <el-input v-model="dictData.dictType" placeholder="字典类型" :disabled="isEdit"></el-input>
                 </el-form-item>
                 <el-form-item label="编码" prop="dictCode">
                   <el-input v-model="dictData.dictCode" placeholder="编码"></el-input>
                 </el-form-item>
                 <el-form-item label="名称" prop="dictValue">
                   <el-input v-model="dictData.dictValue" placeholder="名称"></el-input>
                 </el-form-item>
                <el-form-item label="排序" prop="orderBy">
                   <el-input v-model="dictData.orderBy" placeholder="数据排序"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="remark">
                   <el-input v-model="dictData.remark" placeholder="描述说明"></el-input>
                </el-form-item>
                 <el-form-item label="启用" prop="state">
                   <el-switch v-model="dictData.state"
                     active-text="是" inactive-text="否"
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
import { getDictData, submitDictData } from '@/api/dict'

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
      dictData:{
        id: null,
        dictType:null,
        pidCode:null,
        dictCode:'',
        dictValue:'',
        state:'',
        orderBy:null,
        remark:''
      },
      rules: {
        dictCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        dictType:[
          { required: true, message: '请输入类型', trigger: 'blur' }
        ],
        dictValue:[
          { required: true, message: '请输入字典名称', trigger: 'blur' },
        ],
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
      getDictData(this.dataId).then( response => {
        this.dictData = response.data;
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
          delete this.dictData.createTime;
          delete this.dictData.updateTime;
          console.log(this.dictData);
          submitDictData(this.isEdit, this.dictData).then( response => {
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
