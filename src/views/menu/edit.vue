<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}菜单信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container" :rules="rules" ref="submitForm"  :model="sysMenu">
                <el-form-item prop="menuName" label="菜单名称">
                  <el-input v-model="sysMenu.menuName" placeholder="菜单名称"></el-input>
                </el-form-item>
                 <el-form-item label="菜单URL">
                   <el-input v-model="sysMenu.url" :disabled="true" placeholder="菜单URL"></el-input>
                 </el-form-item>
                <el-form-item label="父类菜单名称">
                  <el-input v-model="sysMenu.pidName" placeholder="父类菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="是否可用">
                  <el-switch v-model="sysMenu.state"
                  on-text="可用" off-text="不可用"
                  on-value="1" off-value="0"></el-switch>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button v-if="$store.getters.buttons.includes('btnMenuModify')" type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { selectMenu, updateSysMenu } from "@/api/menu";
import Utils from "@/utils/common";

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
      sysMenu: {
        id: this.dataId,
        menuName: "",
        pidName: "",
        url: "",
        isLeaf: false,
        valid: ""
      },
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.isEdit) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      var data = {
        id: this.dataId
      };
      this.getDataLoading = true;
      selectMenu(this.dataId)
        .then(response => {
          this.getDataLoading = false;
          // this.user.state = `${response.data.state}`
          this.sysMenu = response.data;
        })
        .catch(error => {
          this.getDataLoading = false;
          console.log(error);
        });
    },
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          console.log(this.sysMenu);
          this.submitLoading = true;
          delete this.sysMenu.createTime;
          delete this.sysMenu.updateTime;
          updateSysMenu(this.sysMenu)
            .then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              this.$emit("getList");
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
.el-cascader,
.el-select {
  width: 100%;
}
</style>
