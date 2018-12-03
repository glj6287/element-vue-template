<template>
  <el-date-picker v-model="time" type="date" align="left" size="small" clearable :placeholder="placeholder" @change="dateChange" :picker-options="datePickerOptions">
  </el-date-picker>
</template>
<script>
export default {
  name: "DatePicker",
  props: ["model", "placeholder", "minDate", "maxDate"],
  data() {
    return {
      time: "",
      datePickerOptions: {
        disabledDate: time => {
          if (this.maxDate) {
            return time.getTime() > new Date(this.maxDate);
          } else if (this.minDate) {
            return time.getTime() < new Date(this.minDate);
          }
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  watch: {
    model(n, o) {
      this.time = n || "";
    }
  },
  methods: {
    dateChange(val) {
      this.$emit("update:model", val);
    }
  }
};
</script>
<style>

</style>
