<template>
  <div class="app-container calendar-list-container">

    <el-form class="form-container" :model="tenantsFile" :inline="false" ref="tenantsFileForm">

      <el-form-item label="附件类型:" prop="fileType">
        <el-select v-model="tenantsFile.fileType"  style="width: 200px;" clearable @change="selectFileTypeHandler">
          <el-option v-for="item in attachmentTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租客相关编号:" prop="tenantsCode">
        <el-input v-model="tenantsFile.tenantsCode"  placeholder="租客相关编号" style="width: 200px" @blur="blurSearchFor" ></el-input>
      </el-form-item>
      <el-form-item label="附件上传:" prop="attachmentFile">
        <el-upload
          ref="uploadForm"
          :headers="headers"
          :action="tenantsUploadAction"
          list-type="picture-card"
          multiple
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <!--<el-button  type="primary" icon="plus" v-loading="searchLoading" @click="search">保存</el-button>-->
        <!--<el-button  @click="resetForm('tenantsFileForm')">重置</el-button>-->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { getAttachmentType } from "@/api/basedata";
  import { getToken } from "@/utils/auth";
  export default {
    name: "tenantsFiles-list",
    data() {
      return {
        tenantsUploadAction: "",
        listLoading: false,
        searchLoading: false,
        attachmentTypeOptions: [],
        tenantsFile: {
          tenantsCode: "",
          fileType: ""
        },
        headers: {
          "Authorization": getToken()
        }
      };
    },
    filters: {
    },
    created() {
      this.getOption();
    },
    methods: {
      getOption() {
        getAttachmentType().then(response => {
          this.attachmentTypeOptions = response.data;
        });
      },
      selectFileTypeHandler() {
        console.log(this.tenantsFile.tenantsCode, this.tenantsFile.fileType);
        this.tenantsUploadAction = `${process.env.BASE_API}/oldFile/tenantsImage/${this.tenantsFile.tenantsCode}/${this.tenantsFile.fileType}`;
      },
      blurSearchFor(event) {
        console.log(this.tenantsFile.tenantsCode, this.tenantsFile.fileType);
        this.tenantsUploadAction = `${process.env.BASE_API}/oldFile/tenantsImage/${this.tenantsFile.tenantsCode}/${this.tenantsFile.fileType}`;
      },
      search() {
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      beforeUpload(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file.url);
      },
      uploadSuccess(response, file, fileList) {
        if (response.code === "000000") {
          this.$message.success("上传成功");
        } else {
          this.$message.error(response.msg);
        }
        this.$refs.uploadForm.clearFiles();
      },
      uploadError(err, file, fileList) {
        console.log(err);
        this.$message.error("上传失败！");
        this.$refs.uploadForm.clearFiles();
      }
    }
  };
</script>
