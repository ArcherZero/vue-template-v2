# 表格通用组件

## Props

- tableData： 表格数据
- infoData：表头数据

```javascript
{
  // 例：
  // label、key字段必填，min字段非必填
  infoData: [
    { label: '企业名称', key: 'deptName', min: '200px' },
    { label: '经营许可证号', key: 'licenseNo', min: '100px' },
    { label: '申请类别', key: 'type', min: '80px' },
    { label: '申请报理由', key: 'reason', min: '150px' },
    { label: '状态', key: 'status' }
  ]
}
```

## 使用举例

```html
<m-table :tableData='tableData' :infoData='infoData'>
  <template #type="{ data }">
    <p>{{ APPLY_TYPE_MAP[data.type] }}</p>
  </template>
  <template #propName="{ data }">
    <p>特殊展示数据，propName对应infoData数组中的label：{{ AUDIT_MAP[data.propName] }}</p>
  </template>
  <el-table-column fixed="right" label="操作" min-width="150px">
      <template slot-scope="{ row }">
      <el-link type="primary">详情</el-link>
      <el-link type="danger">删除</el-link>
    </template>
  </el-table-column>
</m-table>
```
