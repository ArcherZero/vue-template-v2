<template>
  <el-container class="page-layout-wrap">
    <el-aside width="250px" class="aside-wrap">
      <navgation :isHide="isHide"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="icon-wrapper" @click="isHide = !isHide">
          <el-icon :class="isHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-icon>
        </div>
        <div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </div>
      </el-header>

      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>

      <el-main class="main-wrap" style="padding: 0;">
        <router-view class="content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navgation from '@/components/Navigation/index.vue'

export default {
  components: {
    Navgation
  },
  data () {
    return {
      isHide: false
    }
  }
}
</script>

<style lang="scss">
.page-layout-wrap {
  min-height: 100vh;
  max-height: 100vh;
  background: rgb(255, 255, 255);
}

.header {
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(240, 242, 245);
  box-shadow: 0 5px 5px rgb(211, 211, 211);
}

.breadcrumb {
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 20px;
  background-color: rgb(240, 242, 245);
}

.icon-wrapper {
  padding: 10px;
}

.icon-wrapper:hover {
  cursor: pointer;
}

.el-aside {
  background: linear-gradient(360deg, rgb(29, 106, 190) 0%, rgb(44, 125, 199) 100%);
}

.el-footer {
  background-color: #3e3d44;
}

.el-main {
  padding: 10px;
  background: #ddd;
}

.content {
  width: 100%;
  height: 100%;
}
</style>
