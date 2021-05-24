<template>
  <div class="tableComponent">
    <el-table :data="tableData" stripe >
      <el-table-column
        v-bind="item"
        :key="item.key"
        v-for="item in infoData"
        :min-width="item.min"
      >
        <slot :name="item.key" :data="scope.row" slot-scope="scope">{{ getValue(scope.row, item.key) | textEmptyFilter}}</slot>
      </el-table-column>
      <!-- 操作列 -->
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'tableComponent',
  props: {
    infoData: Array,
    tableData: Array
  },
  methods: {
    getValue (obj, prop) {
      const props = prop.split('.')
      if (props.length > 1) {
        let res = JSON.parse(JSON.stringify(obj))
        for (let i = 0; i < props.length; i++) {
          res = res[props[i]]
        }
        return res
      }
      return obj[prop]
    }
  }
}
</script>
