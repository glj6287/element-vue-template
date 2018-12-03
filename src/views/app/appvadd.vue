<template>

  <div style="background-color: white;padding: 20px;">
    <h4 class="housing_title">APP版本更新提示内容</h4>
    <el-form class="form-container" :model="paramInsert" ref="validateForm" :rules="rules" label-width="150px" >
      <div style="width: 700px;">
        <el-form-item label="更新的APP" prop="appCode"  >
          <el-select v-model="paramInsert.appCode" style="width: 174px" clearable placeholder="请选择更新的APP">
            <el-option v-for="item in appCodeOption" :key="item.dictValue" :label="item.dictValue"
                       :value="item.dictCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="APP类型" prop="appType"  >
          <el-select v-model="paramInsert.appType" style="width: 174px" clearable placeholder="请选择APP类型">
            <el-option v-for="item in appTypeOptions" :key="item.dictValue" :label="item.dictValue"
                       :value="item.dictCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="version"  >
          <el-input v-model="paramInsert.version" size="small" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="updateDesc"  >
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 12}" v-model="paramInsert.updateDesc" placeholder="请输入更新内容"></el-input>
        </el-form-item>
        <el-form-item label="更新地址" prop="downUrl"  >
          <el-input v-model="paramInsert.downUrl" placeholder="请输入更新地址"></el-input>
        </el-form-item>
        <el-form-item label="该版本git串号" prop="gitId"  >
          <el-input v-model="paramInsert.gitId" placeholder="请输入该版本git串号"></el-input>
        </el-form-item>

        <div style="text-align: center">
          <el-form-item style="float: left; display: inline">
            <el-button type="primary" size="medium" v-loading="insertLoading" @click="submitPush">确认发布</el-button>
          </el-form-item>
          <el-form-item  style="float: left; display: inline">
            <el-button type="primary" size="medium" v-loading="insertLoading" @click="cancelPush">取消发布</el-button>
          </el-form-item>
        </div>
        <br/>
        <br/>
      </div>
    </el-form>
  </div>

</template>

<script>

import Utils from '@/utils/common';
import { getAppCode } from "@/api/basedata";
import { save } from "@/api/app";

export default {
  data() {
    return {
      insertLoading: false,
      paramInsert: {
        appCode: null,
        appType: null,
        version: null,
        updateDesc: null,
        downUrl: null,
        gitId: null
      },
      appCodeOption: [],
      appTypeOptions: [{dictCode: "1", dictValue: "IOS"}, {dictCode: "2", dictValue: "安卓"}],
      rules: {
        appCode: [
          {required: true, message: '请选择更新的APP', trigger: 'change'}
        ],
        appType: [
          {required: true, message: '请选择APP类型', trigger: 'change'}
        ],
        version: [
          {required: true, message: '请输入版本号', trigger: 'blur'}
        ],
        updateDesc: [
          {required: true, message: '请输入更新内容', trigger: 'blur'}
        ],
        downUrl: [
          {required: true, message: '请输入更新地址', trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.getAppList();
  },
  methods: {
    getAppList() {
      getAppCode().then(response => {
        this.appCodeOption = response.data;
      });
    },
    submitPush() {
      this.$refs["validateForm"].validate((valid) => {
        if (valid) {
          var desc = this.paramInsert.updateDesc;
          // 转换格式换行符
          var newDesc = desc.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, " ");
          this.paramInsert.updateDesc = newDesc;
          console.log(this.paramInsert);
          save(this.paramInsert).then(response => {
            this.$message.success("发布成功！");
            this.$refs.validateForm.resetFields();
          });
        } else {
          return false;
        }
      });
    },
    cancelPush() {
      this.$confirm('您确认取消发布新版本更新吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs["validateForm"].resetFields();
      })
    }
  }
};
</script>
