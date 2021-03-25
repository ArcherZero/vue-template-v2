<template>
  <el-submenu v-if="submenu.children" :index='submenu.index'>
    <template slot="title">
      <div class="line-box">
        <img v-if="submenu.icon" :src="submenu.icon">
        <span>{{ submenu.title }}</span>
      </div>
    </template>
    <nav-submenu
      v-for="(item, index) in submenu.children"
      :key="index"
      :submenu="item"
    />
  </el-submenu>
  <el-menu-item v-else :index="submenu.index">
    <img :src="submenu.icon" alt="" v-if="iconShow && submenu.icon">
    {{ submenu.title }}
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
