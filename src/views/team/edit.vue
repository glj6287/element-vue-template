<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}团队信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :model="organization" :rules="rules" ref="submitForm">
                <el-form-item label="团队名称" prop="dptName">
                  <el-input v-model="organization.dptName" placeholder="团队名称" ></el-input>
                </el-form-item>
                <el-form-item label="归属分公司">
                  <el-cascader v-model="organization.belongDept" placeholder="直接输入可搜索" filterable clearable
                               :options="belongDeptOptions" :props="belongDeptProps" @change="belongDeptChange"></el-cascader>
                </el-form-item>
                <el-form-item label="团队负责人">
                  <el-select v-model="dutyData" value-key="id" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in dutyOptions"
                      :key="item.id"
                      :label="item.userName + ' | ' + item.jobNumber"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--<el-form-item label="团队负责人">-->
                  <!--<el-select-->
                    <!--v-model="dutyData"-->
                    <!--multiple-->
                    <!--:multiple-limit="1"-->
                    <!--filterable-->
                    <!--remote-->
                    <!--value-key="id"-->
                    <!--placeholder="请输入人员姓名"-->
                    <!--:remote-method="remoteMethod"-->
                    <!--:loading="dutySearchLoading">-->
                    <!--<el-option-->
                      <!--v-for="item in searchDutyList"-->
                      <!--:key="item.id"-->
                      <!--:label="item.userName + ' | ' + item.id"-->
                      <!--:value="item">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="是否生效">
                  <el-switch v-model="organization.valid"
                             active-color="#13ce66" inactive-color="#ccc"
                             active-text="是" inactive-text="否"
                             active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="有无子节点">
                  <el-switch v-model="organization.isLeaf"
                             active-color="#13ce66" inactive-color="#ccc"
                             active-text="有" inactive-text="无"
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
  import Utils from '@/utils/common';
  import {getList, getTeamDetail, getDutyList, userListByBelongId, getTeamList, submitOrganTeam} from '@/api/organization';

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
        dutySearchLoading: false,
        belongDeptQuery: {
          nodeLevel: '',
          dgLevel: 0,
          dgTotal: 3,
          pid: 0,
          teamFlag: '2'
        },
        organization: {
          id: this.dataId,
          roleCode: '',
          dutyId: '',
          dutyName: '',
          belongDept: [],
          pid: '',
          isLeaf: false,
          valid: false
        },
        dutyData: {},
        dutyOptions: {},
        belongDeptOptions: [{
          id: '',
          name: '江苏',
          level: '1',
          children: []
        }],
        belongDeptProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        searchDutyList: [],
        rules: {
          dptName: [
            { required: true, message: '请输入团队名称', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.getDataLoading = true;
        getList(this.belongDeptQuery).then(response => {
          this.getDataLoading = false;
          this.belongDeptOptions = response.data;

          if (this.isEdit) {
            this.getDetail();
          }
        }).catch(error => {
          console.log(error);
          this.getDataLoading = false;
        })
      },
      getDetail() {
        var data = {
          id: this.dataId
        };

        //获取归属分公司
        this.getDataLoading = true;
        getTeamList(data).then(response => {
          this.getDataLoading = false;
          var belongDept = [];
          var idList = response.data.idList;

          idList.forEach((id, index) => {
            belongDept.push(id);
          });

          //获取团队信息
          this.getDataLoading = true;
          getTeamDetail(this.dataId).then(response => {
            this.getDataLoading = false;
            this.organization.dptName = response.data.dptName;
            this.organization.belongDept = belongDept;
            this.organization.valid = response.data.valid;
            this.organization.isLeaf = response.data.isLeaf;
            var dutyId = response.data.dutyId;
            this.belongDeptChange(belongDept, true, dutyId);
          }).catch(error => {
            this.getDataLoading = false;
            console.log(error);
          })

        }).catch(error => {
          console.log(error);
          this.getDataLoading = false;
        })
      },
      submit() {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            if (this.dutyData) {
              this.organization.dutyId = this.dutyData.id;
              this.organization.dutyName = this.dutyData.userName;
            }
            var belongDept = this.organization.belongDept;
            if (belongDept) {
              this.organization.pid = belongDept[belongDept.length - 1];
            }
            this.submitLoading = true;
            submitOrganTeam(this.isEdit, this.organization).then(response => {
              this.submitLoading = false;
              console.log(response);
              Utils.success(`${this.isEdit ? '修改' : '添加'}成功`);
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
      belongDeptChange(value, isEditFlag, dutyId) {
        if (value) {
          this.dutyData = {};

          var belongId = value[value.length - 1];
          if (belongId !== '') {
            var query = {
              belongId: belongId
            };
            userListByBelongId(query).then(response => {
              this.dutyOptions = response.data;
              if (isEditFlag) {
                this.dutyOptions.forEach((item, index) => {
                  if (item.id == dutyId) {
                    this.dutyData = item;
                    return;
                  }
                });
              }
            }).catch(error => {
              console.log(error);
            });
          } else {

          }
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.dutySearchLoading = true;
          var data = {
            userName: query
          };
          getDutyList(data).then(response => {
            this.dutySearchLoading = false;
            this.searchDutyList = response.data;
          }).catch(error => {
            console.log(error);
          });
        } else {
          this.searchDutyList = [];
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader, .el-select {
    width: 100%;
  }
</style>
