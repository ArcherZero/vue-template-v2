<template>
  <el-row id="nav">
    <div class="app-name">项目名称</div>
    <el-col :span="24" class="wrap" id="navContentWrap">
      <div class="tag-info">
        <el-menu
          text-color="#94A3B8"
          active-text-color="#3b82f6"
          :router="true"
          class="el-menu-vertical-demo"
          :default-active="defaultActive"
          :unique-opened="true"
          :collapse="isHide"
          @select="setRoute"
          background-color="#fff"
          :collapse-transition="false"
        >
          <el-submenu
            v-for="(item, index) in menuList"
            :key="index"
            :class="
              hasActive(item.url) ? 'first_submenu active' : 'first_submenu'
            "
            :index="item.url"
            v-if="item.isleaf"
          >
            <template slot="title">
              <i v-if="item.css" :class="[item.css, 'menuicon']"></i>
              <span slot="title" class="submenu_name">{{ item.name }}</span>
            </template>
            <el-menu-item
              :index="item2.url"
              v-for="(item2, index2) in item.subMenus"
              :key="index2"
              :class="
                hasActive(item2.url)
                  ? 'second_submenu active'
                  : 'second_submenu'
              "
            >
              <i v-if="item2.css" :class="[item2.css, 'menuicon']"></i>
              <div class="submenu_circle"></div>
              <span slot="title" class="submenu_name">{{ item2.name }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            :class="
              hasActive(item.url) ? 'first_submenu active' : 'first_submenu'
            "
            :index="item.url"
            v-else
          >
            <i v-if="item.css" :class="[item.css, 'menuicon']"></i>
            <span slot="title" class="submenu_name">{{ item.name }}</span>
          </el-menu-item>

          <!--
          <div v-for="(item, index) in menuList" :key="index">
            <el-submenu
              :class="
                hasActive(item.url) ? 'first_submenu active' : 'first_submenu'
              "
              :index="item.url"
              v-if="item.isleaf"
            >
              <template slot="title">
                <i v-if="item.css" :class="[item.css, 'menuicon']"></i>
                <span slot="title" class="submenu_name">{{ item.name }}</span>
              </template>

              <el-menu-item
                :index="item2.url"
                v-for="(item2, index2) in item.subMenus"
                :key="index2"
                :class="
                  hasActive(item2.url)
                    ? 'second_submenu active'
                    : 'second_submenu'
                "
              >
                <i v-if="item2.css" :class="[item2.css, 'menuicon']"></i>
                <div class="submenu_circle"></div>
                <span slot="title" class="submenu_name">{{ item2.name }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              :class="
                hasActive(item.url) ? 'first_submenu active' : 'first_submenu'
              "
              :index="item.url"
              v-else
            >
              <i v-if="item.css" :class="[item.css, 'menuicon']"></i>
              <span slot="title" class="submenu_name">{{ item.name }}</span>
            </el-menu-item>
          </div>

          <nav-submenu
            v-for="(item, index) in menuList"
            :key="index"
            :submenu="item"
          />
          -->
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "navigation",
  props: {
    isHide: Boolean,
  },
  data() {
    return {
      navLogo: "",
      menuList: [],
    };
  },
  computed: {
    ...mapGetters(["menu", "defaultActive", "activePath"]),
    userName() {
      return "";
    },
  },
  components: {},
  mounted() {
    this.getMenuList();
  },
  methods: {
    ...mapMutations(["setDefaultActive", "setActivePath"]),
    getMenuList() {
      this.menu &&
        this.menu.forEach((item, index) => {
          if (item.subMenus) {
            item.isleaf = true;
          }
        });
      this.menuList = this.menu;
    },
    setRoute(route, path) {
      this.setDefaultActive(route);
      this.setActivePath(path);
    },
    hasActive(url) {
      let arr = this.activePath.filter((item, index) => {
        return url && item === url;
      });
      return arr.length > 0;
    },
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
