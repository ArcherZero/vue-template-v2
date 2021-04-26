const templateRouter = [
  {
    path: "/template/list",
    name: "template",
    component: () =>
      import(/* webpackChunkName: "template" */ "@/pages/template/index.vue"),
    meta: {
      title: '模板列表',
      breadcrumb: [
        { title: '模板', path: null },
        { title: '模板列表', path: null },
      ]
    }
  },
]

export default templateRouter
