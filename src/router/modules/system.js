const templateRouter = [
  {
    path: "/system/role",
    name: "systemRole",
    component: () =>
      import(/* webpackChunkName: "system" */ "@/pages/system/role.vue"),
    meta: {
      title: '角色管理',
      breadcrumb: [
        { title: '系统管理', path: null },
        { title: '角色管理', path: null },
      ]
    }
  },
  {
    path: "/system/menu",
    name: "systemMenu",
    component: () =>
      import(/* webpackChunkName: "system" */ "@/pages/system/menu.vue"),
    meta: {
      title: '菜单管理',
      breadcrumb: [
        { title: '系统管理', path: null },
        { title: '菜单管理', path: null },
      ]
    }
  },
  {
    path: "/system/account",
    name: "systemAccount",
    component: () =>
      import(/* webpackChunkName: "system" */ "@/pages/system/account.vue"),
    meta: {
      title: '账号管理',
      breadcrumb: [
        { title: '系统管理', path: null },
        { title: '账号管理', path: null },
      ]
    }
  }
]

export default templateRouter
