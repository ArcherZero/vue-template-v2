<template>
  <el-row id="nav">
    <div class="app-name">
      项目名称
    </div>
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
            v-for="(item, index) in menu"
            :key="index"
            :submenu="item"
          />
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import NavSubmenu from './NavSubmenu'
import { mapGetters } from 'vuex'

export default {
  name: 'navigation',
  props: {
    isHide: Boolean
  },
  data () {
    return {
      defaultActive: '/',
      navLogo: ''
    }
  },
  computed: {
    ...mapGetters(['menu']),
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
  }
}
</script>
<style lang="scss">
  @import "./index.scss";
</style>
