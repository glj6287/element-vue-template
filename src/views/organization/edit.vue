<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text" @click="selectedHandleClick">{{isEdit ? '编辑' : '新增'}}部门信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :model="organization" :rules="rules" ref="submitForm">
                 <el-form-item label="部门编号" prop="orgCode" label-width="30%">
                  <el-input v-model="organization.orgCode" placeholder="部门编号"></el-input>
                </el-form-item>

                <el-form-item label="部门名称" prop="orgName" label-width="30%">
                  <el-input v-model="organization.orgName" placeholder="部门名称"></el-input>
                </el-form-item>

                <el-form-item v-loading="belongDeptLoading" label="归属部门" prop="department" label-width="30%">
                    <!-- <el-select v-model="organization.pidCode" value-key="id" filterable clearable placeholder="请选择">
                      <el-option
                        v-for="item in orgOptions"
                        :key="item.id"
                        :label="item.orgCode + ' | ' + item.orgName"
                        :value="item.orgCode">
                      </el-option>
                    </el-select> -->
                    <el-input v-model="organization.department" :readonly="true"  placeholder="部门名称" @click.native="selectedHandleClick"></el-input>
                </el-form-item>
              <!-- @change="belongDeptChange" -->

                <el-form-item label="部门负责人" prop="dutyCode" label-width="30%">
                  <el-select v-model="organization.dutyCode" value-key="id" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in dutyOptions"
                      :key="item.id"
                      :label="item.userCode + ' | ' + item.userName"
                      :value="item.userCode">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="是否生效" label-width="30%">
                  <el-switch v-model="organization.state"
                             active-color="#13ce66" inactive-color="#ccc"
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

          

          <departmentChoice v-if="showDepartmentModal"  @close="showDepartmentModal=false" @getData=departmentHandle></departmentChoice>
        </div>
      </div>

          <!-- <edit-modal v-if="showDepartmentModal" @close="showDepartmentModal = false" @getList="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal> -->

    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import departmentChoice from "./departmentChoice";
import {
  getList,
  getOrgan,
  submitOrgan,
  getTeamList,
  userListByBelongId,
  getDutyCodeList
} from "@/api/organization";
import { getOrgCodeList } from "@/api/user";
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
  components: {
    departmentChoice
  },
  data() {
    return {
      orgOptions: [],
      dutyOptions: [],
      submitLoading: false,
      getDataLoading: false,
      terminalAreaDisabled: true,
      dutySearchLoading: false,
      belongDeptLoading: false,
      businessProvinceAndCityLoading: false,
      showDepartmentModal: false, //归属部门
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",

      belongDeptQuery: {
        nodeLevel: "",
        dgLevel: 0,
        dgTotal: 2,
        pid: 0
      },
      organization: {
        pidCode: "",
        dutyCode: "",
        orgCode: "",
        orgName: "",
        id: this.dataId,
        state: 0,
        department:""
      },
      belongDeptOptions: [
        {
          id: "",
          name: "江苏",
          level: "1",
          children: []
        }
      ],
      belongDeptProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      provinceQuery: {
        level: "1",
        id: ""
      },
      temp: {
        belongProvinceAndCity: []
      },
      belongProvinceAndCity: [],
      belongProvinceAndCityOptions: [],
      belongProvinceAndCityProps: {
        value: "value",
        label: "label",
        children: "children"
      },
      businessProvinceAndCityOptions: [],
      businessProvinceAndCityProps: {
        value: "value",
        label: "label",
        children: "children"
      },
      rules: {
        dptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.dutyCode();
    this.getpidCode();
  },
  methods: {
    getpidCode() {
      getOrgCodeList()
        .then(response => {
          var pidCodeData = response.data;
          pidCodeData.forEach(ele => {
            this.orgOptions.push(ele);
          });
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    dutyCode() {
      getDutyCodeList()
        .then(response => {
          response.data.forEach(ele => {
            this.dutyOptions.push(ele);
          });
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    getList() {
      this.getDataLoading = true;
      getList(this.belongDeptQuery)
        .then(response => {
          this.getDataLoading = false;
          this.belongDeptOptions = response.data;

          if (this.isEdit) {
            this.getDetail();
          }
        })
        .catch(error => {
          this.getDataLoading = false;
          console.log(error);
        });
    },
    addBusinessProvinceAndCity() {
      this.organization.provinces.push({
        businessProvinceAndCity: [],
        key: Date.now()
      });
    },
    belongTerminalAreaChange() {
      if (this.organization.hasTerminal === "0") {
        this.terminalAreaDisabled = true;
        return;
      }
      this.terminalAreaDisabled = false;
    },
    removeBusinessProvinceAndCity(item) {
      this.$confirm("此操作将会丢失该项数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var index = this.organization.provinces.indexOf(item);
        if (index !== -1) {
          this.organization.provinces.splice(index, 1);
        }
      });
    },
    getDetail() {
      var data = {
        id: this.dataId
      };

      // 获取归属分公司
      this.getDataLoading = true;
      getOrgan(this.dataId)
        .then(response => {
          this.getDataLoading = false;
          this.organization.pidCode = response.data.pidCode;
          this.organization.dutyCode = response.data.dutyCode;
          this.organization.orgCode = response.data.orgCode;
          this.organization.orgName = response.data.orgName;
          this.organization.state = response.data.state;
        })
        .catch(error => {
          this.getDataLoading = false;
          console.log(error);
        });
    },
    provinceChange(provinceCode) {
      var province = [provinceCode];
      if (province) {
        this.getDataLoading = true;
        provinceViewList(this.provinceQuery)
          .then(response => {
            this.getDataLoading = false;
            this.belongProvinceAndCityOptions = response.data;
            this.belongProvinceAndCityItemChange(province);
          })
          .catch(error => {
            this.getDataLoading = false;
            console.log(error);
          });
      }
    },
    // belongDeptChange(value, isEditFlag, dutyId) {
    //   if (value) {
    //     this.dutyData = {}

    //     var belongId = value[value.length - 1]
    //     if (belongId !== '') {
    //       var query = {
    //         belongId: belongId
    //       }
    //       userListByBelongId(query).then(response => {
    //         this.dutyOptions = response.data
    //         if (isEditFlag) {
    //           if (dutyId) {
    //             this.dutyOptions.forEach((item, index) => {
    //               if (item.id == dutyId) {
    //                 this.dutyData = item
    //                 return
    //               }
    //             })
    //           }
    //         }
    //       }).catch(error => {
    //         console.log(error)
    //       })
    //     }
    //   }
    // },
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          if (this.dutyData) {
            this.organization.dutyId = this.dutyData.id || "";
            this.organization.dutyName = this.dutyData.userName || "";
          }
          var belongDept = this.organization.belongDept;
          if (belongDept) {
            this.organization.pid = belongDept[belongDept.length - 1] || "";
          }
          var belongProvinceAndCity = this.belongProvinceAndCity;
          if (belongProvinceAndCity) {
            this.organization.provinceCode = belongProvinceAndCity[0] || "";
            this.organization.cityCode =
              belongProvinceAndCity[belongProvinceAndCity.length - 1] || "";
          }
          if (this.organization.terminalArea) {
            var hasTerminalIds =
              this.organization.terminalArea[0] +
              "," +
              this.organization.terminalArea[1];
            this.organization.hasTerminalIds = hasTerminalIds;
          }
          if (this.organization.provinces) {
            var provinceAndCityIds = "";
            this.organization.provinces.forEach((item, index) => {
              if (
                item.businessProvinceAndCity[0] &&
                item.businessProvinceAndCity[1]
              ) {
                if (index === this.organization.provinces.length - 1) {
                  provinceAndCityIds += `${item.businessProvinceAndCity[0]},${
                    item.businessProvinceAndCity[1]
                  }`;
                } else {
                  provinceAndCityIds += `${item.businessProvinceAndCity[0]},${
                    item.businessProvinceAndCity[1]
                  }|`;
                }
              }
            });
            this.organization.provinceAndCityIds = provinceAndCityIds;
          }
          this.submitLoading = true;
          if (!this.isEdit) {
            this.organization.id = "";
          }
          submitOrgan(this.isEdit, this.organization)
            .then(response => {
              this.submitLoading = false;
              Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
              this.$emit("getList");
              this.$emit("close");
            })
            .catch(error => {
              console.log(error);
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    belongProvinceAndCityItemChange(val) {
      if (val) {
        var id = val[val.length - 1];
        this.provinceQuery.level = `2`;
        this.provinceQuery.id = id;
        this.getDataLoading = true;
        provinceViewList(this.provinceQuery)
          .then(response => {
            this.getDataLoading = false;
            var childrenList = response.data;
            this.setProvinceValue(
              id,
              this.belongProvinceAndCityOptions,
              childrenList
            );
          })
          .catch(error => {
            this.getDataLoading = false;
            console.log(error);
          });
      }
    },
    setProvinceValue(val, opt, childrenList) {
      for (var itm of opt) {
        if (itm.value == val) {
          itm.children = childrenList;
          if (this.isEdit) {
            this.belongProvinceAndCity = this.temp.belongProvinceAndCity;
          }
          return itm;
        }
      }
    },

    selectedHandleClick() {
      console.log(111);
      this.showDepartmentModal = !false;
    },

    departmentHandle(val){
      // console.log(val);
      this.organization.department = val
    }
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-cascader,
.el-select,
.el-input {
  width: 70%;
}
.modal-container {
  height: auto !important;
}
</style>
