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
    path: "/template2/list",
    name: "template2",
    component: () =>
      import(/* webpackChunkName: "template" */ "@/pages/template2/index.vue"),
    meta: {
      title: '模板列表1',
      breadcrumb: [
        { title: '模板列表1', path: null },
        { title: '模板列表1-2', path: null },
      ]
    }
  },
]

export default templateRouter
