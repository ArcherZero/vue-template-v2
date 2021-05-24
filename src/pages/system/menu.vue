<template>
  <!-- 系统管理-角色管理 -->
  <div>
    <div class="flex-right">
      <el-button type="primary" size="medium">新增</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <el-table :data="row.subMenus" stripe style="width: 100%;">
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="css" label="CSS"></el-table-column>
              <el-table-column prop="sort" label="Sort"></el-table-column>
              <el-table-column prop="url" label="Url"></el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="{ row }">
                  <div>
                    <el-button type="danger" @click="remove(row)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="css" label="CSS"></el-table-column>
        <el-table-column prop="sort" label="Sort"></el-table-column>
        <el-table-column prop="url" label="Url"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="{ row }">
            <div>
              <el-button type="primary">新增</el-button>
              <el-button type="danger" @click="remove(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
      background
      :current-page.sync="page"
      :page-size.sync="pageSize"
      @size-change="size => search(1, size)"
      @current-change="search"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import * as SystemAction from '@/api/system'

export default {
  name: 'menu',
  data () {
    return {
      tableData: [],
      param: {},
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    async search (page = 1, size) {
      // size change、按条件搜索时重置页码为1
      if (page === 1) this.page = 1
      const param = {
        pageNum: page,
        pageSize: size || this.pageSize,
        ...this.param
      }
      // 调用获取列表数据接口
      const res = await SystemAction.menus(param)
      console.log(res)
      this.tableData = res.data
      this.total = res.totalSize
    },
    async remove (id) {
      this.$confirm('是否确定删除？', '提示').then(async () => {
        this.$message.success('删除成功！')
      })
    }
  },
  created () {
    this.search()
  }
}
</script>
