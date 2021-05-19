<template>
 <el-submenu
    :class="hasActive(submenu.url) ? 'first_submenu active' : 'first_submenu'"
    :index="submenu.url"
    v-if="submenu.isleaf"
  >
    <template slot="title">
      <i v-if="submenu.css" :class="[submenu.css, 'menuicon']"></i>
      <span class="submenu_name">{{ submenu.name }}</span>
    </template>
    <el-menu-item
      :index="item2.url"
      v-for="(item2,index2) in submenu.subMenus"
      :key="index2"
      :class="hasActive(item2.url) ? 'second_submenu active' : 'second_submenu'"
    >
      <i v-if="item2.css" :class="[item2.css, 'menuicon']"></i>
      <div class="submenu_circle"></div>
      <span slot="title" class="submenu_name">{{ item2.name }}</span>
    </el-menu-item>
  </el-submenu>
  <el-menu-item
    :class="hasActive(submenu.url) ? 'first_submenu active' : 'first_submenu'"
    :index="submenu.url"
    v-else
  >
    <i v-if="submenu.css" :class="[submenu.css, 'menuicon']"></i>
    <span slot="title" class="submenu_name">{{ submenu.name }}</span>
  </el-menu-item>
  <!--
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
  -->
</template>

<script>
import { mapGetters } from "vuex";
//import NavSubmenu from '@/components/Navigation/NavSubmenu'

export default {
  name: "NavSubmenu",
  props: {
    submenu: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(["activePath"]),
  },
  mounted() {
    console.log(this.activePath);
  },
  components: {
    //NavSubmenu
  },
  methods: {
    hasActive(url) {
      let arr = this.activePath.filter((item, index) => {
        return item === url;
      });
      return arr.length > 0;
    },
  },
};
</script>
