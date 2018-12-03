<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">「{{roleName}}」权限配置</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="listLoading">
            <slot name="body">
              <el-tree
                :data="data"
                ref="menuTree"
                show-checkbox
                check-strictly
                node-key="key"
                @check-change="handleCheckChange"
                :default-checked-keys="defaultCheckKeys"
                :default-expand-all="defaultExpand"
                :props="defaultProps">
              </el-tree>
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
import { menuTree } from '@/api/menu'
import { menusByRole, modifyRoleMenu } from '@/api/limit'

export default {
  props: {
    dataId: {
      type: Number,
      default: null
    },
    dataCode: {
      type: String,
      default: null
    },
    dataName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      listLoading: true,
      submitLoading: false,
      list: null,
      roleName: this.dataName,
      data: [],
      newMenuIdArr: [],
      newBtnIdArr: [],
      deletedMenuIdArr: [],
      deletedBtnIdArr: [],
      defaultCheckKeys: [],
      defaultExpand:true,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getMenuIds()
  },
  methods: {
    getMenuTree() {
      menuTree().then(response => {
        this.data = response.data
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    getMenuIds() {
      this.listLoading = true
      menusByRole(this.dataCode).then(response => {
        this.defaultCheckKeys = response.data
        this.getMenuTree()
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    submit() {
      // 数据去重
      if (this.newMenuIdArr.length !== 0 && this.deletedMenuIdArr.length !== 0) {
        this.newMenuIdArr.slice().forEach((newId, i) => {
          const ind = this.deletedMenuIdArr.indexOf(newId)
          if (ind > -1) {
            this.deletedMenuIdArr.splice(ind, 1)
            this.newMenuIdArr.splice(i, 1)
          }
        })
      }
      if (this.newBtnIdArr.length !== 0 && this.deletedBtnIdArr.length !== 0) {
        this.newBtnIdArr.slice().forEach((newId, i) => {
          const ind = this.deletedBtnIdArr.indexOf(newId)
          if (ind > -1) {
            this.deletedBtnIdArr.splice(ind, 1)
            this.newBtnIdArr.splice(i, 1)
          }
        })
      }

      if (this.newMenuIdArr.length === 0 && this.newBtnIdArr.length === 0 &&
        this.deletedMenuIdArr.length === 0 && this.deletedBtnIdArr.length === 0) {
        Utils.info('尚未做任何修改！')
        return
      }

      this.submitLoading = true
      modifyRoleMenu(this.dataCode, this.newMenuIdArr, this.newBtnIdArr, this.deletedMenuIdArr, this.deletedBtnIdArr).then(response => {
        Utils.success(response.msg)
        this.submitLoading = false
        this.newMenuIdArr = []
        this.newMenuIdArr = []
        this.newBtnIdArr = []
        this.deletedMenuIdArr = []
        this.$emit('close')
      }).catch(error => {
        console.log(error)
        this.submitLoading = false
      })
    },
    handleCheckChange(node, checked, indeterminate) {
      console.log(node.key)
      const code = node.code
      const id = node.id
      if (node.key.indexOf('menu-') >= 0) {
        // Menu data
        if (checked) {
          this.newMenuIdArr.push(code)
        } else {
          this.deletedMenuIdArr.push(code)
        }
      } else if (node.key.indexOf('btn-') >= 0) {
        // Button data
        if (checked) {
          this.newBtnIdArr.push(id)
        } else {
          this.deletedBtnIdArr.push(id)
        }
      }

      if (checked) {
        // let copyData = this.data.slice()
        // let ok = false
        // let result
        // while (!ok) {
        //   const item = copyData.shift()
        //   if (item.key === node.key) {
        //     result = item
        //     ok = true
        //   } else if (item.children && item.children.length > 0) {
        //     copyData = copyData.concat(item.children)
        //   }
        // }
        // console.log(result)
        // this.$refs.menuTree.setChecked(result.key)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .modal-container{
//   overflow-y:hidden!important;
// }
.modal-container{
  height: 800px!important;
  overflow: hidden!important;
}
</style>
