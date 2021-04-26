<template>
  <div class="search-bar">
    <div class="search-item">
      <slot></slot>
    </div>
    <div :class="['btn-wrap', {'btn-top': btnFix}]">
      <el-button size="big" type="primary" @click="search">搜索</el-button>
      <!-- <el-button size="big" type="seach" @click="reset">重置</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnFix: Boolean
  },
  data () {
    return {
      form: null
    }
  },
  methods: {
    search () {
      this.$emit('search')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 32px;
  background-color: #fff;
  border-radius: 4px;

  .search-item {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }
}

.btn-wrap {
  display: flex;
  align-self: flex-start;
  justify-self: flex-end;
}

.btn-top {
  align-self: flex-start;
  margin-top: 5px;
}
</style>
