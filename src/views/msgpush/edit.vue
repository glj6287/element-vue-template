<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}消息推送信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="push" label-width="130px">
                <el-form-item label="消息类型:" prop="msgType">
                  <el-select v-model="push.msgType"  style="width: 300px;" clearable >
                    <el-option v-for="item in msgTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="消息模板:" prop="tplCode">
                  <el-select v-model="push.tplCode"  style="width: 300px;" clearable >
                    <el-option v-for="item in msgTempAllOptions" :key="item.tplCode" :label="item.tplName" :value="item.tplCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="APP编码:" prop="appCode">
                  <el-select v-model="push.appCode"  style="width: 300px;" clearable >
                    <el-option v-for="item in appCodeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="消息标题:" prop="msgTitle">
                  <el-input v-model="push.msgTitle" placeholder="消息标题"></el-input>
                </el-form-item>
                <el-form-item label="消息内容:" prop="msgContent">
                  <el-input type="textarea"
                            :rows="2" v-model="push.msgContent" placeholder="消息内容"></el-input>
                </el-form-item>
                <el-form-item label="接受者账号:" prop="receiveCode">
                  <el-input v-model="push.receiveCode" placeholder="接受者账号"></el-input>
                </el-form-item>
                <el-form-item label="接受者编码:" prop="receiveUserCode">
                  <el-input v-model="push.receiveUserCode" placeholder="接受者编码"></el-input>
                </el-form-item>
                <el-form-item label="发送者编码:" prop="sendUserCode">
                  <el-input v-model="push.sendUserCode" placeholder="发送者编码"></el-input>
                </el-form-item>
                <el-form-item label="推送时间:" prop="planPushDate">
                  <el-date-picker v-model="push.planPushDate" @change="handDateChange" type="date" placeholder="开始日期" style="width:300px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="消息参数:" prop="remark">
                  <el-input type="textarea"
                            :rows="2" v-model="push.remark" placeholder='json格式参数:{"code": "882745"}'></el-input>
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
  import Utils from '@/utils/common';
  import { getPush, submitPush, selectMsgTempAll } from '@/api/msgpush';
  import { getMsgType, getAppCode } from "@/api/basedata";

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
        msgTypeOptions: [],
        appCodeOptions: [],
        msgTempAllOptions: [],
        push: {
          // id: this.dataId,
          msgType: "",
          tplCode: "",
          appCode: "",
          msgTitle: "",
          msgContent: "",
          receiveCode: "",
          receiveUserCode: "",
          sendUserCode: "",
          planPushDate: "",
          remark: ""
        },
        filters: {
          dateFilter(date) {
            if (date) {
              return date.substring(0, date.indexOf("T"));
            }
            return "-";
          }
        },
        rules: {
          msgType: [
            { required: true, message: '请选择消息类型', trigger: 'change' }
          ],
          tplCode: [
            { required: true, message: '请选择消息模板', trigger: 'change' }
          ],
          appCode: [
            { required: true, message: '请选择消息app', trigger: 'change' }
          ],
          receiveUserCode: [
            { required: true, message: '请输入接受者编码', trigger: 'blur' }
          ],
          sendUserCode: [
            { required: true, message: '请输入发送者编码', trigger: 'blur' }
          ],
          planPushDate: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    created() {
      if (this.isEdit) {
        console.log(this.isEdit);
        this.getDetail();
      }
      this.getOptions();
    },
    methods: {
      getOptions() {
        getMsgType().then(response => {
          this.msgTypeOptions = response.data;
        });
        getAppCode().then(response => {
          this.appCodeOptions = response.data;
        });
        selectMsgTempAll().then(response => {
          this.msgTempAllOptions = response.data;
        });
      },
      handDateChange(value) {
        if (value != null && value !== "") {
          this.push.planPushDate = value;
        }
      },
      getDetail() {
        this.getDataLoading = true;
        console.log(this.dataId)
        getPush(this.dataId)
          .then(response => {
            this.push = response.data;
            // 这个控件需要用字符串才能设置默认值
            this.push.msgType = `${response.data.msgType}`;
            this.push.msgTitle = `${response.data.msgTitle}`;
            this.push.msgContent = `${response.data.msgContent}`;
            this.push.receiveCode = `${response.data.receiveCode}`;
            this.push.receiveUserCode = `${response.data.receiveUserCode}`;
            this.push.sendUserCode = `${response.data.sendUserCode}`;
            this.push.planPushDate = `${response.data.planPushDate}`;
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
            delete this.push.createTime;
            delete this.push.updateTime;
            console.log(this.push)
            if (!this.isEdit) {
              this.push.id = "";
            }
            submitPush(this.isEdit, this.push).then(response => {
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
  /*.el-cascader, .el-select {*/
    /*width: 100%;*/
  /*}*/
</style>
