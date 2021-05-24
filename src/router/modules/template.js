const templateRouter = [
  {
    path: "/template/list",
    name: "template",
    component: () =>
      import(/* webpackChunkName: "template" */ "@/pages/template/index.vue"),
    meta: {
      title: '模板列表1',
      breadcrumb: [
        { title: '模板列表1', path: null },
        { title: '模板列表1-1', path: null },
      ]
    }
  },
  {
    path: "/template/new",
    name: "templateNew",
    component: () =>
      import(/* webpackChunkName: "template" */ "@/pages/template/new.vue"),
    meta: {
      title: '模板新增',
      breadcrumb: [
        { title: '模板列表1', path: null },
        { title: '模板新增', path: null },
      ]
    }
  },
  {
    path: "/component/upload",
    name: "component",
    component: () =>
      import(/* webpackChunkName: "template" */ "@/pages/component/upload.vue"),
    meta: {
      title: '上传',
      breadcrumb: [
        { title: '业务组件', path: null },
        { title: '上传', path: null },
      ]
    }
  }
]

export default templateRouter
