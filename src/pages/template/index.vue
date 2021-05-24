<template>
  <!-- 企业端-车辆管理 -->
  <div>
    <SearchBar @search="search">
      <SingleSearch v-model="param.model" label="品牌型号" />
      <SelectRange v-model="param.complainDate" label="时间范围"></SelectRange>
      <SelectSearch v-model="param.status" label="运营状态" :options="TAXI_STATUS_MAP" />
    </SearchBar>
    <div class="flex-right">
      <el-button type="primary" size="medium" @click="$router.push('./new')">新增</el-button>
    </div>
    <MTable :tableData='tableData' :infoData='infoData'>
      <template #status="{ data }">
        <p>{{ TAXI_STATUS_MAP[data.status] }}</p>
      </template>
      <el-table-column prop="changeWorkTime" label="操作" width="350px">
        <template slot-scope="{ row }">
          <el-link class="mr-10" type="primary" @click="goDetail(row.id)">详情</el-link>
          <el-link type="danger">删除</el-link>
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
import SelectSearch from '@/components/SearchBar/SelectSearch'
import SelectRange from '@/components/SearchBar/SelectRange'
import MTable from '@/components/MTable'

export default {
  name: 'companyCarManage',
  components: {
    SearchBar,
    SingleSearch,
    SelectSearch,
    SelectRange,
    MTable
  },
  data () {
    return {
      tableData: [{ id: 1 }],
      infoData: [
        {label: '车牌号码', key: 'no', min: '100px'},
        {label: '企业名称', key: 'companyName', min: '150px'},
        {label: '道路运输证号', key: 'transCardNo', min: '120px'},
        {label: '有效期起', key: 'transValidStart', min: '100px'},
        {label: '有效期止', key: 'transValidEnd', min: '100px'},
        {label: '运营状态', key: 'status'}
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
      if (param.complainDate && param.complainDate.length) {
        param.start = param.complainDate[0]
        param.end = param.complainDate[1]
        delete param.complainDate
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
