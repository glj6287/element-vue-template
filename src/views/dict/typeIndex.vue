<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">数据字典类型</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">

              <el-form class="form-container" :model="listQuery" ref="searchForm" :inline="true">
                <el-form-item>
                  <el-button size="small" type="primary" @click="showAddDialog">添加</el-button>

                </el-form-item>
              </el-form>

              <el-table :data="typeList" v-loading.body="listLoading" border stripe fit  style="width: 100%">

                <el-table-column align="center" label="编号">
                  <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="编码">
                  <template slot-scope="scope">
                    <span>{{ scope.row.dictType }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="类型名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.dictName}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="是否启用">
                  <template slot-scope="scope">
                    <span>{{scope.row.state | isActiveFilter}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showUpdateDialog(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>

              </el-table>

               <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getTypeList"></pagination-modal>

              <edit-modal v-if="showModal" @close="showModal = false" @refresh="getTypeList" :isEdit="isEdit" :dataId="dataId"></edit-modal>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <!-- <el-button @click="$emit('close')">取消</el-button> -->

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from '@/utils/common'
import {typePageList} from '@/api/dict'
import EditModal from './typeEdit'


export default {
  components: {
      EditModal
  },
  data() {
    return {
      getDataLoading: false,
      searchLoading: false,
      listLoading:false,
      showModal:false,
      typeList:[],
      dataId: null,
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 10
      },
    }
  },
  filters: {
    isActiveFilter(isActive) {
      const isActiveMap = {
        '1': '启用',
        '0': '未启用'
      }
      return isActiveMap[isActive]
    }
  },
  created() {
    this.getTypeList();
  },
  methods: {
    getTypeList() {
      this.listLoading = true;
      var _this = this;
      console.log(this.listQuery);
      typePageList(this.listQuery).then(response => {

        this.total = response.count;
        this.typeList = response.data;

        console.log(response.data);
        this.listLoading = false;

      }).catch(function (error) {
        console.log(error);
        _this.listLoading = false;

      })
    },
    showAddDialog(){
      this.isEdit = false;
      this.showModal = true;
    },
    showUpdateDialog(item){
      this.dataId = item.id;
      this.isEdit = true;
      this.showModal = true;
    },

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-cascader, .el-select {
//   width: 100%;
// }
</style>
