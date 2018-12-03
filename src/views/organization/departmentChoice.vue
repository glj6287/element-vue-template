<template>
 <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 500px;">

            <div class="modal-header">
                <slot name="header">
                <h3 slot="header" class="text">选择公司</h3>
                <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
                </slot>
            </div>

            <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
             <slot name="body">
                <el-input
                    placeholder="输入关键字进行搜索"
                    v-model="keyword">
                </el-input>
                 <div class="modal-body" v-loading="listLoading">
                    <slot name="body">
                        <!-- <el-tree  :data="data"
                                  ref="tree"
                                  :props="defaultProps"
                                  node-key="id"
                                  :show-checkbox="true"
                                  :check-strictly="true"
                                  @node-click="handleNodeClick"
                                  @getHalfCheckedNodes="getNodeHandClick"
                                  :highlight-current="true"
                                  :check-on-click-node="true"
                                  :default-expand-all="defaultExpand"
                        ></el-tree> -->
                                <el-tree
                                class="filter-tree"
                                :data="data2"
                                :props="defaultProps"
                                default-expand-all
                                :filter-node-method="filterNode"
                                :highlight-current="true"
                                @node-click="getHandClickNode"
                                ref="tree2">
                                </el-tree>
                    </slot>
                </div>

              <!-- <el-form class="form-container" :model="organization" :rules="rules" ref="submitForm">
                 <el-form-item label="关键字:" prop="keyword" label-width="15%">
                  <el-input v-model="organization.keyword" size="small" style="width:250px;margin-right:10px;"></el-input>
                  <el-button type="primary" v-loading="submitLoading" size="small">搜索</el-button>
                </el-form-item>

                <div class="modal-body" v-loading="listLoading">
                    <slot name="body">
                        <el-tree  :data="data"
                                  ref="tree"
                                  :props="defaultProps"
                                  node-key="id"
                                  :show-checkbox="true"
                                  :check-strictly="true"
                                  @node-click="handleNodeClick"
                                  @getHalfCheckedNodes="getNodeHandClick"
                                  :highlight-current="true"
                                  :check-on-click-node="true"
                                  :default-expand-all="defaultExpand"
                        ></el-tree>

                                <el-tree
                                class="filter-tree"
                                :data="data2"
                                :props="defaultProps"
                                default-expand-all
                                :filter-node-method="filterNode"
                                ref="tree2">
                                </el-tree>
                    </slot>
                </div>

              </el-form> -->

            </slot>
          </div>
        
          <div class="modal-footer">
            <slot name="footer">
              <el-button type="primary" v-loading="submitLoading" @click="submitHandleClick">确定</el-button>
              <el-button @click="$emit('close')">取消</el-button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
export default {
  data() {
    return {
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      listLoading: false,
      getDataLoading: false,
      submitLoading: false,
      defaultCheckKeys: [],
      defaultExpand: true,
      keyword: "",
      selectedVal: "", //选中中的val
      isLeaf: false, //判断是否为子节点
      rules: {
        dptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  watch: {
    keyword(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    handleCheckChange(node, checked, indeterminate) {
      console.log(node.key);
      const code = node.code;
      const id = node.id;
      if (node.key.indexOf("menu-") >= 0) {
        // Menu data
        if (checked) {
          this.newMenuIdArr.push(code);
        } else {
          this.deletedMenuIdArr.push(code);
        }
      } else if (node.key.indexOf("btn-") >= 0) {
        // Button data
        if (checked) {
          this.newBtnIdArr.push(id);
        } else {
          this.deletedBtnIdArr.push(id);
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
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getHandClickNode(data, node, item) {
      this.selectedVal = data.label;
      this.isLeaf = node.isLeaf; //是否为子节点
    },
    submitHandleClick() {
      this.submitLoading = true;
      if (this.selectedVal) {
        if (this.isLeaf == !false) {
            this.$emit("getData", this.selectedVal);
            this.$emit("close");
            this.submitLoading = true;
        }else{
            Utils.info('不能选择父节点!')
            this.submitLoading = false;
            return 
        }
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  height: 600px !important;
}
</style>
