import logo from '@/assets/logo.png'

export default [
  {
    index: '/',
    icon: logo,
    title: '首页'
  },
  {
    index: '/contract',
    icon: logo,
    title: '出租车管理',
    children: [
      {
        index: '/contract/list',
        title: '合同列表'
      }
    ]
  }
]
