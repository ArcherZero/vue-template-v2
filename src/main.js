import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.scss'
import 'zero-directive' // 自定义指令

Vue.config.productionTip = false
Vue.use(Element, { size: 'mini' })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
