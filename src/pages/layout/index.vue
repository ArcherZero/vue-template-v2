<template>
  <el-container class="page-layout-wrap">
    <el-aside width="250px" class="aside-wrap">
      <navgation :isHide="isHide"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 不需要收起菜单则注释下方节点 -->
        <!-- <div class="icon-wrapper" @click="isHide = !isHide">
          <el-icon :class="isHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-icon>
        </div> -->
        <el-breadcrumb separator="/">
          <template v-for="item in breadList">
            <el-breadcrumb-item
              v-if="item.path && item.path !== path"
              class="bread-font pointer"
              :key="item.path"
              :to="{ path: item.path }"
            >
              {{item.title}}
            </el-breadcrumb-item>
            <el-breadcrumb-item
              v-else
              class="bread-font"
              :key="item.title"
            >
              {{item.title}}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
        <div class="user">
          <el-dropdown>
            <span><i class="el-icon-setting" style="margin-right: 15px;"></i>王小虎</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main-wrap">
        <div class="page-wrap" v-loading="loading">
          <router-view class="content" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navgation from '@/components/Navigation/index.vue'
import * as CommonAction from '@/api/common'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navgation
  },
  data () {
    return {
      isHide: false
    }
  },
  computed: {
    ...mapGetters(['loading', 'token']),
    breadList () {
      return this.$route.meta.breadcrumb
    }
  },
  methods: {
    logout () {
      this.$confirm('是否确定退出登录？', '提示').then(async () => {
        const res = await CommonAction.logout({ access_token: this.token })
        if (res) {
          this.$router.replace('/login')
        }
      })
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

  .user {
    flex: 1;
    text-align: right;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  height: 60px;
  min-height: 60px;
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

.page-wrap {
  min-height: 100%;
  padding: 20px;
  background: #fff;
}

.content {
  width: 100%;
  height: 100%;
}
</style>
