<template>
  <div class="app-container calendar-list-container">

    <el-form class="form-container" :model="houseFile" :inline="false" ref="houseFileForm">
      <el-form-item label="房源附件:" prop="houseAttachType">
        <el-select v-model="houseFile.houseAttachType"  style="width: 200px;" clearable @change="selectFileHandler">
          <el-option v-for="item in houseAttachOptions" :key="item.code" :label="item.value" :value="item.code"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="附件类型:" prop="fileType">
        <el-select v-model="houseFile.fileType"  style="width: 200px;" clearable @change="selectFileTypeHandler">
          <el-option v-for="item in attachmentTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="houseFile.houseCode"  placeholder="房源编号" style="width: 200px" @blur="blurSearchFor" ></el-input>
      </el-form-item>
      <el-form-item label="附件上传:" prop="attachmentFile">
        <el-upload
          ref="uploadForm"
          :headers="headers"
          :action="houseUploadAction"
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
        <!--<el-button  @click="resetForm('houseFileForm')">重置</el-button>-->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { getAttachmentType } from "@/api/basedata";
  import { getToken } from "@/utils/auth";
  export default {
    name: "files-list",
    data() {
      return {
        houseUploadAction: "",
        listLoading: false,
        searchLoading: false,
        attachmentTypeOptions: [],
        houseAttachOptions: [
          { "code": "1201", "value": "房源图" },
          { "code": "1202", "value": "房产证" },
          { "code": "1203", "value": "验房图" }
        ],
        houseFile: {
          houseCode: "",
          houseAttachType: "",
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
      selectFileHandler() {
        console.log(this.houseFile.houseAttachType, this.houseFile.fileType, this.houseFile.houseCode)
        this.houseUploadAction = `${process.env.BASE_API}/oldFile/uploadImage/${this.houseFile.houseCode}/${this.houseFile.houseAttachType}/${this.houseFile.fileType}`;
      },
      selectFileTypeHandler() {
        console.log(this.houseFile.houseAttachType, this.houseFile.fileType, this.houseFile.houseCode)
        this.houseUploadAction = `${process.env.BASE_API}/oldFile/uploadImage/${this.houseFile.houseCode}/${this.houseFile.houseAttachType}/${this.houseFile.fileType}`;
      },
      blurSearchFor(event) {
        console.log(this.houseFile.houseAttachType, this.houseFile.fileType, this.houseFile.houseCode)
        this.houseUploadAction = `${process.env.BASE_API}/oldFile/uploadImage/${this.houseFile.houseCode}/${this.houseFile.houseAttachType}/${this.houseFile.fileType}`;
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
