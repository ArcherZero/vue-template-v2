import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.scss'
import 'zero-directive' // 自定义指令
import './assets/font_2017068_jv12sw9izi8/iconfont.css';

Vue.config.productionTip = false
Vue.use(Element, { size: 'mini' })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
