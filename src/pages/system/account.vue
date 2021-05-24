<template>
  <!-- 系统管理-账号管理 -->
  <div>
    <SearchBar @search="search">
      <SingleSearch v-model="param.keyword" label="姓名或手机号" />
    </SearchBar>
    <MTable :tableData='tableData' :infoData='infoData'>
      <el-table-column prop="changeWorkTime" label="操作" width="350px">
        <template slot-scope="{ row }">
          <el-link class="mr-10" type="primary">编辑</el-link>
          <el-link
            type="success"
            size="mini"
            @click="adjuestUser(row,true)"
            v-if="!scope.row.enabled"
          >启用</el-link>
          <el-link type="danger" size="mini" @click="adjuestUser(row,false)" v-else>停用</el-link>
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
  name: 'account',
  components: {
    SearchBar,
    SingleSearch,
    MTable
  },
  data () {
    return {
      tableData: [{ id: 1 }],
      infoData: [
        { label: '工号', key: 'jobnumber' },
        { label: '姓名', key: 'center' },
        { label: '手机号', key: 'username' },
        { label: '角色', key: 'role' },
        { label: '用户状态', key: 'status' },
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
