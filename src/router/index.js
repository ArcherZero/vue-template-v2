import Vue from "vue"
import VueRouter from "vue-router"
import Layout from '@/pages/layout'
import store from '@/store'
import template from './modules/template'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      ...template
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import( "../pages/Login.vue"),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const token = store.state.userInfo.userToken
  const pathname = to.path.split('/')[1]
  if (token) {
    next()
  } else {
    if (pathname === 'login') {
      next()
    } else {
      router.push('/login')
    }
  }

})

export default router;
