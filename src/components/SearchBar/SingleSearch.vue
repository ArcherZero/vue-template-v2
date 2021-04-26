<template>
  <div class="search">
    <div class="single-label">{{ labelText }}</div>
    <el-input v-model="param" :placeholder="placeholder" clearable></el-input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    options: Array,
    label: String,
    value: String,
    type: String
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
    labelText () {
      if (this.options?.length) {
        return this.options[0].label + '：'
      }
      return (this.label + '：') || ''
    },
    placeholder () {
      if (this.options?.length) {
        return this.options[0].placeholder || `请输入${ this.options[0].label }`
      } else {
        return `请输入${ this.label }`
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

    .el-input__inner {
      margin-right: -1px;
      border-radius: 4px 0 0 4px;
    }
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
