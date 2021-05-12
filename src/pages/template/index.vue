<template>
  <!-- 企业端-车辆管理 -->
  <div>
    <SearchBar @search="search">
      <SingleSearch v-model="param.model" label="品牌型号" />
      <SelectRange v-model="param.complainDate" label="时间范围"></SelectRange>
      <SelectSearch v-model="param.status" label="运营状态" :options="TAXI_STATUS_MAP" />
    </SearchBar>
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="no" label="车牌号码"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" width="300"></el-table-column>
      <el-table-column prop="transCardNo" label="道路运输证号"></el-table-column>
      <el-table-column prop="transValidStart" label="有效期起"></el-table-column>
      <el-table-column prop="transValidEnd" label="有效期止"></el-table-column>
      <el-table-column prop="transValidEnd" label="运营状态">
        <template slot-scope="{ row }">{{ TAXI_STATUS_MAP[row.status] }}</template>
      </el-table-column>
      <el-table-column prop="changeWorkTime" label="操作" width="350px">
        <template slot-scope="{ row }">
          <el-link class="mr-10" type="primary" @click="goDetail(row.id)">详情</el-link>
          <el-link type="danger">删除</el-link>
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
import SearchBar from '@/components/SearchBar'
import SingleSearch from '@/components/SearchBar/SingleSearch'
import SelectSearch from '@/components/SearchBar/SelectSearch'
import SelectRange from '@/components/SearchBar/SelectRange'

export default {
  name: 'companyCarManage',
  components: {
    SearchBar,
    SingleSearch,
    SelectSearch,
    SelectRange
  },
  data () {
    return {
      tableData:[],
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
      console.log(param)
      // 调用获取列表数据接口
      // const res = await TaxiAction.selectPage(param)
      // this.tableData = res.dataList
      // this.total = res.totalSize
    },
    goDetail (id) {
      // go detail
    },
    async del (id) {
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
