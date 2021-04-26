<template>
  <el-submenu v-if="submenu.subMenus" :index='submenu.id'>
    <template slot="title">
      <div class="line-box">
        <i v-if="submenu.css" :class="['iconfont', 'mr-10', submenu.css]"></i>
        <span>{{ submenu.name }}</span>
      </div>
    </template>
    <nav-submenu
      v-for="(item, index) in submenu.subMenus"
      :key="index"
      :submenu="item"
    />
  </el-submenu>
  <el-menu-item v-else :index="submenu.index">
    <i v-if="submenu.css" :class="['iconfont', 'mr-10', submenu.css]"></i>
    {{ submenu.name }}
  </el-menu-item>
</template>

<script>
import NavSubmenu from '@/components/Navigation/NavSubmenu'

export default {
  name: 'NavSubmenu',
  props: {
    submenu: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    iconShow () {
      const submenu = this.submenu
      return submenu.index === '/' || submenu.index === '/customer/list' || submenu.index === '/refund/list'
    }
  },
  components: {
    NavSubmenu
  }
}
</script>
