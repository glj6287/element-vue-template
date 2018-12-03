<template>
  <div class="block pagination-container" style="text-align:right;">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PaginationModal",
  props: ["total", "pageSize", "page"],
  data() {
    return {};
  },
  methods: {
    handleSizeChange(n) {
      this.$emit("update:pageSize", n);
      this.$emit("getList");
    },
    handleCurrentChange(n) {
      this.$emit("update:page", n);
      this.$emit("getList");
    }
  }
};
</script>

<style>

</style>
