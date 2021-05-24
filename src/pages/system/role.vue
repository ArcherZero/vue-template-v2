<template>
  <!-- 系统管理-角色管理 -->
  <div>
    <SearchBar @search="search">
      <SingleSearch v-model="param.keyword" label="角色名称" />
    </SearchBar>
    <MTable :tableData='tableData' :infoData='infoData'>
      <el-table-column prop="changeWorkTime" label="操作" width="350px">
        <template slot-scope="{ row }">
          <el-link class="mr-10" type="primary">权限设置</el-link>
          <el-link class="mr-10" type="warning">菜单设置</el-link>
          <el-link class="mr-10" type="primary">编辑</el-link>
          <el-link type="danger" @click="remove(row.id)">删除</el-link>
        </template>
      </el-table-column>
    </MTable>
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
import SearchBar from '@/components/SearchBar'
import SingleSearch from '@/components/SearchBar/SingleSearch'
import MTable from '@/components/MTable'
import * as SystemAction from '@/api/system'

export default {
  name: 'role',
  components: {
    SearchBar,
    SingleSearch,
    MTable
  },
  data () {
    return {
      tableData: [{ id: 1 }],
      infoData: [
        { label: '角色名称', key: 'name' },
        { label: 'CODE', key: 'code' },
        { label: '创建时间', key: 'createTime' },
        { label: '有效期起', key: 'transValidStart' }
      ],
      param: {},
      page: 1,
      pageSize: 10,
      total: 0,
      TAXI_STATUS_MAP: {
        on: '营业',
        off: '停业'
      },
      qrcodeUrl: ''
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
      const res = await SystemAction.roles(param)
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
