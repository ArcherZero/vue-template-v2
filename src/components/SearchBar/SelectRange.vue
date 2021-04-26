<template>
  <div class="search">
    <div class="single-label">{{ label + '：'}}</div>
    <el-date-picker
      v-model="param"
      type="daterange"
      align="right"
      size="large"
      unlink-panels
      value-format="yyyy-MM-DD"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    label: String,
    value: Array
  },
  computed: {
    param: {
      get: function () {
        return this.value
      },
      set: function (value) {
        return this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  height: 40px;
  margin: 5px 32px 5px 0;

  ::v-deep .el-input {
    width: 200px;
    height: 40px;

    .el-input__inner {
      height: 40px;
    }
  }

  ::v-deep .el-select {
    width: 200px;
    height: 40px;
  }
}

.single-label {
  width: 100px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
</style>
