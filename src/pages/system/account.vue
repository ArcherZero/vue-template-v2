<template>
  <!-- 系统管理-账号管理 -->
  <div>
    <SearchBar @search="search">
      <SingleSearch v-model="param.keyword" label="姓名或手机号" />
    </SearchBar>
    <div class="flex-right">
      <el-button type="primary" @click="addAccount">新增</el-button>
    </div>
    <MTable :tableData='tableData' :infoData='infoData'>
      <el-table-column prop="changeWorkTime" label="操作" width="350px">
        <template slot-scope="{ row }">
          <el-link class="mr-10" type="primary" @click="edit(row)">编辑</el-link>
          <el-link
            type="success"
            size="mini"
            @click="adjuestUser(row, true)"
            v-if="!row.enabled"
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
    <AccountEditDialog :roles="roles" ref="account" @success="search"/>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import SingleSearch from '@/components/SearchBar/SingleSearch'
import MTable from '@/components/MTable'
import * as SystemAction from '@/api/system'
import AccountEditDialog from './accountEditDialog'

export default {
  name: 'account',
  components: {
    SearchBar,
    SingleSearch,
    MTable,
    AccountEditDialog
  },
  data () {
    return {
      tableData: [],
      infoData: [
        { label: '用户编号', key: 'id' },
        { label: '账号', key: 'username' },
        { label: '用户名', key: 'nickname' },
        { label: '手机号', key: 'phone' },
        { label: '创建时间', key: 'createTime' }
      ],
      param: {},
      page: 1,
      pageSize: 10,
      total: 0,
      roles: [],
      qrcodeUrl: ''
    }
  },
  methods: {
    async search (page = 1, size) {
      // size change、按条件搜索时重置页码为1
      if (page === 1) this.page = 1
      const param = {
        page: page,
        limit: size || this.pageSize,
        ...this.param
      }
      // 调用获取列表数据接口
      const res = await SystemAction.account(param)
      this.tableData = res.data
      this.total = res.totalSize
    },
    // 启用/停用
    adjuestUser (row, status) {
      this.$confirm(`是否确定${status ? '启用' : '停用'}该账号？`, '提示').then(async () => {
        const res = await SystemAction.accountEnable({ id: row.id, enabled: status })
        if (!res) return
        this.$message.success('操作成功！')
        this.search()
      })
    },
    remove (id) {
      this.$confirm('是否确定删除？', '提示').then(async () => {
        this.$message.success('删除成功！')
      })
    },
    addAccount () {
      this.$refs.account.show()
    },
    edit (row) {
      this.$refs.account.show(row)
    },
    async getRoles () {
      const res = await SystemAction.roles()
      if (!res) return
      this.roles = res.data
    }
  },
  created () {
    this.search()
    this.getRoles()
  }
}
</script>
