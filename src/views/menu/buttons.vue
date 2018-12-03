<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">「{{menuName}}」按钮管理</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="calendar-list-container">
                <el-form class="form-container" :model="menuBtn" :rules="rules" :inline="true" ref="submitForm">
                  <el-form-item label="按钮代码" prop="btnCode">
                    <el-input v-model="menuBtn.btnCode" size="small" placeholder="按钮代码"></el-input>
                  </el-form-item>
                  <el-form-item label="按钮名称" prop="btnName">
                    <el-input v-model="menuBtn.btnName" size="small" placeholder="按钮名称"></el-input>
                  </el-form-item>
                  <el-form-item label="按钮说明" prop="btnTitle">
                    <el-input v-model="menuBtn.btnTitle" size="small" placeholder="按钮说明"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button v-if="$store.getters.buttons.includes('btnMenuBtnAdd')" type="primary" v-loading="addSubmitLoading" size="small" @click="addSubmit">添加</el-button>
                  </el-form-item>
                </el-form>

                <el-table :data="buttons" v-loading.body="listLoading" border stripe fit  style="width: 100%">
                  <el-table-column label="按钮代码">
                    <template slot-scope="scope">
                      <el-input v-show="scope.row.edit" size="small" v-model="scope.row.btnCode"></el-input>
                      <span v-show="!scope.row.edit">{{ scope.row.btnCode }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="按钮名称">
                    <template slot-scope="scope">
                      <el-input v-show="scope.row.edit" size="small" v-model="scope.row.btnName"></el-input>
                      <span v-show="!scope.row.edit">{{scope.row.btnName}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="按钮说明">
                    <template slot-scope="scope">
                      <el-input v-show="scope.row.edit" size="small" v-model="scope.row.btnTitle"></el-input>
                      <span v-show="!scope.row.edit">{{scope.row.btnTitle}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="创建人">
                    <template slot-scope="scope">
                      <span>{{scope.row.creater}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button v-if="$store.getters.buttons.includes('btnMenuBtnModify')" :type="scope.row.edit ? 'primary' : 'text'" size="small" @click='handleEdit(scope.row)'>
                        {{scope.row.edit ? '完成' : '编辑'}}
                      </el-button>
                      <el-button v-if="scope.row.edit" type="text" size="small" @click='handleCancel(scope.row)'>取消</el-button>

                      <el-button v-if="!scope.row.edit" type="text" size="small" @click="deleteButton(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>

                </el-table>

                 <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getButtonList"></pagination-modal>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from '@/utils/common'
import { menuButtons, addMenuBtn, updateMenuBtn, deleteMenuBtn } from '@/api/menu'

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
    menuName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      addSubmitLoading: false,
      listLoading: false,
      buttons: [],
      menuBtn: {
        menuId: this.dataId,
        menuCode: this.dataCode,
        btnCode: '',
        btnName: '',
        btnTitle: ''
      },
      currentPage: 1,
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      rules: {
        btnCode: [
          { required: true, message: '请输入按钮代码', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        btnName: [
          { required: true, message: '请输入按钮名称', trigger: 'blur' }
        ],
        btnTitle: [
          { required: true, message: '请输入按钮说明', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getButtonList()
  },

  methods: {
    getButtonList() {
      this.listLoading = true
      menuButtons(this.dataCode, this.listQuery).then(response => {
        const items = response.data
        this.total = response.count
        this.buttons = items.map(v => {
          this.$set(v, 'edit', false)
          return v
        })
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
      })
    },
    addSubmit() {
      this.$refs['submitForm'].validate((valid) => {
        if (valid) {
          this.addSubmitLoading = true
          addMenuBtn(this.menuBtn).then(response => {
            this.addSubmitLoading = false
            this.menuBtn = {
              menuId: this.dataId,
              btnCode: '',
              btnName: '',
              btnTitle: ''
            }
            this.getButtonList()
            Utils.success(`添加成功`)
          }).catch(() => {
            this.addSubmitLoading = false
          })
        } else {
          return false
        }
      })
    },
    updateSubmit(item) {
      this.submitLoading = true
      updateMenuBtn(item).then( response => {
        this.submitLoading = false
        Utils.success(`修改成功`)
      }).catch(() => {
        this.submitLoading = false
      })
    },
    handleEdit(row) {
      if (row.edit) {
        delete row.createTime
        delete row.updateTime
        delete row.creater
        this.updateSubmit(row)
      }
      row.edit = !row.edit
    },
    handleCancel(row) {
      row.edit = false
    },
    deleteButton(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteMenuBtn(row.id).then(response => {
          this.listLoading = false
          Utils.success(`删除成功`)
          this.getButtonList()
        })
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
