<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改收款人信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :model="payee" :rules="rules" ref="submitForm">

                <el-form-item label="合同编号:" prop="contractCode">
                  <el-input v-model="payee.contractCode" placeholder="合同编号" disabled="disabled"></el-input>
                </el-form-item>

                <el-form-item label="收款人姓名:" prop="payeeName">
                  <el-input v-model="payee.payeeName" placeholder="收款人姓名" ></el-input>
                </el-form-item>

                <el-form-item label="银行卡号:" prop="bankCard">
                  <el-input v-model="payee.bankCard" placeholder="银行卡号" ></el-input>
                </el-form-item>

                <el-form-item label="银行名称:" prop="bankName">
                  <el-select v-model="payee.bankName" size="small" style="width: 100%;" clearable value-key="bankName">
                    <el-option v-for="item in bank" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
                  </el-select>
                  <!--<el-input v-model="payee.bankName" placeholder="银行名称" ></el-input>-->
                </el-form-item>

                <el-form-item label="银行支行:" prop="bankSubbranchName">
                  <el-input v-model="payee.bankSubbranchName" placeholder="银行支行" ></el-input>
                </el-form-item>

                <el-form-item label="附件上传:" prop="bankFileCode">
                  <span v-for="item in payee.sysFileVoList"  :key="item.attcCode">
                    <img  :src="item.attcUrlSmall"  @click="showImageClick(item.attcUrl)" /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                  </span>
                  <span v-if='fileCode == ""'>
                  <el-upload
                    :headers="headers"
                    :action="contractUploadAction"
                    list-type="picture-card"
                    multiple
                    :show-file-list="false"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :on-error="uploadError">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  </span>
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
  import { updateMessage , getPayee ,updatePayee,deleteImage} from '@/api/payee';
  import { getBankType } from "@/api/basedata";
  import { getToken } from "@/utils/auth";
  import Viewer from "v-viewer";
  import 'viewerjs/dist/viewer.css'
  import Vue from "vue";
  Vue.use(Viewer);

  export default {
    props: {
      contractCode: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        dutySearchLoading: false,
        payee: {
          contractCode: "",
          bankCard: "",
          bankCode: "",
          bankName: "",
          bankFileCode: "",
          payeeName: "",
          payeeCode: "",
          version: ""
        },
        fileCode: "",
        headers: {
          Authorization: getToken()
        },
        contractUploadAction: `${process.env.BASE_API}/oldFile/contractImage/${this.contractCode}/1206`,
        bank: [],
        rules: {
          bankName: [
            { required: true, message: "请选择银行名称", trigger: "change" }
          ],
          bankCard: [
            { required: true, message: "银行卡号不能为空", trigger: "blur" }
          ],
          payeeName: [
            { required: true, message: "收款人姓名不能为空", trigger: "blur" }
          ],
          bankSubbranchName: [
            { required: true, message: "银行支行不能为空", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.getDetail();
      this.deadlineOptions();
    },
    methods: {
      submit() {
        this.$refs['submitForm'].validate((valid) => {
          if(this.fileCode == ""){
            Utils.warning("请上传银行卡正面照");
            return;
          }
          if (valid) {
            console.log("收款人"+ JSON.stringify(this.payee));
            this.submitLoading = true;
            updatePayee(this.payee).then(response => {
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
            return false;
          }
        });
      },
      getDetail() {
        console.log(this.contractCode);
        getPayee(this.contractCode)
          .then(response => {
            console.log(this.payee)
            this.payee = response.data;
            this.fileCode = this.payee.bankFileCode;
            console.log(this.payee)
            this.getDataLoading = false;
          })
          .catch(error => {
            Utils.error(error);
            this.getDataLoading = false;
          });
      },
      deadlineOptions() {
        getBankType().then(response => {
          this.bank = response.data;
        });
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
          this.getDetail();
          this.$message.success("上传成功");
        } else {
          this.getDetail();
          this.$message.error(response.msg);
        }
      },
      uploadError(err, file, fileList) {
        console.log(err);
        this.$message.error("上传失败！");
      },
      // 图片预览
      showImageClick(src) {
        // this.imageSrc = `${src}?t=${new Date().getTime()}`;
        this.imageSrc = src;
        this.$nextTick(() => {
          const viewer = this.$el.querySelector(".images").$viewer;
          viewer.show();
        });
      },
      deleteImageClick(item) {
        console.log(item);
        deleteImage(item.attcCode)
          .then(response => {
            this.getDetail();
            this.fileCode = "";
            Utils.success(`删除成功`);
          })
          .catch(error => {
            Utils.error(error);
          });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader, .el-select {
    width: 100%;
  }
  .modal-container{
    height: calc(100% - 310px);
  }
</style>
