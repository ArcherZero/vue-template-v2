<template>
  <!-- 系统管理-角色管理 -->
  <div>
    <div class="flex-right">
      <el-button type="primary" size="medium" @click="addTop">新增</el-button>
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
                    <el-link class="mr-10" type="warning" @click="edit(row)">编辑</el-link>
                    <el-link type="danger" @click="remove(row.id)">删除</el-link>
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
              <el-link class="mr-10" type="primary" @click="addSubMenu(row)">新增</el-link>
              <el-link class="mr-10" type="warning" @click="edit(row)">编辑</el-link>
              <el-link type="danger" @click="remove(row.id)">删除</el-link>
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
    <MenuConfigDialog ref="menu" @success="search"/>
  </div>
</template>

<script>
import * as SystemAction from '@/api/system'
import MenuConfigDialog from './menuConfigDialog'

export default {
  components: {
    MenuConfigDialog
  },
  data () {
    return {
      tableData: [],
      param: {},
      page: 1,
      pageSize: 500,
      total: 0
    }
  },
  methods: {
    async search (page = 1, size) {
      // size change、按条件搜索时重置页码为1
      if (page === 1) this.page = 1
      const param = {
        pageNum: page,
        // pageSize: size || this.pageSize,
        ...this.param
      }
      // 调用获取列表数据接口
      const res = await SystemAction.menus(param)
      if (!res) return
      // 一个系统应该只有一个parentId为-1的菜单
      this.tableData = res.data.filter(item => +item.parentId === -1)
      this.tableData.forEach(item => {
        res.data.forEach(menu => {
          if (!item.subMenus) item.subMenus = []
          if (+menu.parentId === +item.id) item.subMenus.push(menu)
        })
      })
      this.total = this.tableData.length
    },
    async remove (id) {
      this.$confirm('是否确定删除？', '提示').then(async () => {
        const res = await SystemAction.removeMenu({ id })
        if (!res) return
        this.$message.success('删除成功！')
      })
    },
    edit (row) {
      this.$refs.menu.show(row)
    },
    // 添加顶级目录
    addTop () {
      this.$refs.menu.show({ parentName: '顶级目录', parentId: -1 })
    },
    // 添加子目录
    addSubMenu (row) {
      this.$refs.menu.show({ parentName: row.name, parentId: row.id })
    }
  },
  created () {
    this.search()
  }
}
</script>
