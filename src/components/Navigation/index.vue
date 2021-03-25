<template>
  <el-row id="nav">
    <div class="app-name">
      交通运输车保姆码
    </div>
    <!-- <div class="logo-wrap">
      <img :src="navLogo" alt="">
    </div>
    <div class="user-wrap">
      <div class="name">{{userName}}</div>
    </div> -->
    <el-col :span="24" class="wrap" id="navContentWrap">
      <div class="tag-info">
        <el-menu
          text-color="#fff"
          active-text-color="#fff"
          :router="true"
          class="el-menu-vertical-demo"
          :default-active="defaultActive"
          :unique-opened="true"
          :collapse="isHide"
        >
          <nav-submenu
            v-for="(item, index) in navgations"
            :key="index"
            :submenu="item"
          />
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import navgations from './config.js'
import NavSubmenu from './NavSubmenu'
// import { mapGetters } from 'vuex'

export default {
  name: 'navigation',
  props: {
    isHide: Boolean
  },
  data () {
    return {
      defaultActive: '/',
      navgations: navgations,
      navLogo: ''
    }
  },
  computed: {
    // ...mapGetters(['userInfo']),
    userName () {
      return ''
    }
  },
  components: {
    NavSubmenu
  },
  watch: {
    $route (to, from) {
      this.defaultActive = this.$route.path
    }
  },
  methods: {
    // 筛选出有权限访问的导航项。。。。。。。
    filterNavgations (navgations) {
      return navgations.filter((item, index) => {
        if (item.children) {
          item.children = this.filterNavgations(item.children)
          if (!item.children.length) return false
        }
        if (!item.auth || !item.auth.length) return true
        const state = this.permissions.base_auth.some(per => {
          return item.auth.indexOf(per.name) > -1
        })
        return state
      })
    }
  },
  created () {
    this.navgations = [...this.filterNavgations(this.navgations)]
    this.defaultActive = this.$route.path
  }
}
</script>
<style lang="scss">
  @import "./index.scss";
</style>
