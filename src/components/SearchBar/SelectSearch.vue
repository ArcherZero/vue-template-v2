<template>
  <div class="search">
    <div class="single-label">{{ label + '：'}}</div>
    <el-select v-model="param" :placeholder="placeholder" clearable>
      <el-option
        v-for="(val, key) in options"
        :key="key"
        :label="val"
        :value="key"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    label: String,
    value: String,
    options: Object
  },
  computed: {
    param: {
      get: function () {
        return this.value
      },
      set: function (value) {
        return this.$emit('input', value)
      }
    },
    placeholder () {
      return `请选择${ this.label || '' }`
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
