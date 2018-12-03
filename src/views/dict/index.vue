<template>
  <div class="app-container">
    <el-row>
      <el-col>
          <el-form class="form-container" :inline="true">
            <el-form-item>
              <el-button v-if="$store.getters.buttons.includes('btnManageType')" size="small" type="primary" @click="searchDictType">管理字典类型</el-button>
              <el-button v-if="$store.getters.buttons.includes('btnAdd')" size="small" type="primary" @click="showAddDialog">添加字典值</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <el-table
          ref="singleTable"
          :data="dictTypeData"
          @current-change="handleCurrentTypeChange"

          style="width: 100%">
          </el-table-column>
          <el-table-column
            property="dictTypeName"
            label="字典类别">
          </el-table-column>
        </el-table> -->
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree class="filter-tree" :data="dictTypeData" :props="defaultProps" @current-change="handleCurrentTypeChange"
          highlight-current default-expand-all :filter-node-method="filterNode" ref="typeTree">
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-table :data="dictList" v-loading.body="listLoading" border stripe fit  style="width: 100%">

          <el-table-column align="center" label="编号">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型编码">
            <template slot-scope="scope">
              <span>{{ scope.row.dictType }}</span>
            </template>
          </el-table-column>

          <el-table-column label="编码">
            <template slot-scope="scope">
              <span>{{ scope.row.dictCode }}</span>
            </template>
          </el-table-column>

          <el-table-column label="文本">
            <template slot-scope="scope">
              <span>{{scope.row.dictValue}}</span>
            </template>
          </el-table-column>

          <el-table-column label="上级编号">
            <template slot-scope="scope">
              <span>{{scope.row.dictDataPid}}</span>
            </template>
          </el-table-column>

          <el-table-column label="描述说明">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <span>{{scope.row.state | isActiveFilter}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
              <span>{{scope.row.orderBy}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" v-if="$store.getters.buttons.includes('btnEdit')">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showEditDialog(scope.row)">编辑</el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getDictDataList"></pagination-modal>
      </el-col>
    </el-row>

    <edit-modal v-if="showModal" @close="showModal = false" @refresh="getDictDataList" :isEdit="isEdit" :dataId="dataId"></edit-modal>

    <type-modal v-if="showTypeModal" @close="showTypeModal = false" ></type-modal>

  </div>
</template>

<script>
import Utils from '@/utils/common'
import {dictTypeList,dictDataList} from '@/api/dict'
import EditModal from './edit'
import TypeModal from './typeIndex'


export default {
  name: 'dict',
  components: {EditModal,TypeModal},
  watch: {
    filterText(val) {
      this.$refs.typeTree.filter(val);
    }
  },
  data() {
    return {
      filterText: '',
      dictTypeData: [],
      dictList: null,
      total: 0,
      dataId: null,
      showModal: false,
      showTypeModal:false,
      defaultProps: {
        label: 'dictName'
      },
      listQuery: {
        dictType: "",
        isActive:'',
        page: 1,
        pageSize: 10
      },
      val:null
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
      this.getDictTypeList();
      this.getDictDataList(this.val);
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.dictName.indexOf(value) !== -1;
    },
    getDictTypeList(){
      dictTypeList().then(response => {
        this.total = response.count;
        this.dictTypeData = response.data;

      }).catch(function (error) {
        console.log(error)
      })
    },
    getDictDataList() {
      this.listLoading = true;
      var _this = this;
      dictDataList(this.listQuery).then(response => {
        this.total = response.count;
        this.dictList = response.data;
        this.listLoading = false;
      }).catch(function (error) {
        console.log(error);
        _this.listLoading = false;
      })
    },
    searchDictType(){
      this.showTypeModal = true;
    },
    showAddDialog(){
      this.isEdit = false;
      this.showModal = true;
    },
    showEditDialog(dictData){
      this.dataId = dictData.id;
      this.isEdit = true;
      this.showModal = true;
    },
    handleCurrentTypeChange(val, node) {
      this.listQuery.page = 1;
      this.listQuery.dictType = val.dictType;
      this.getDictDataList();
    },

  }
}
</script>
<style>
.el-tree {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 800px;
}
</style>
