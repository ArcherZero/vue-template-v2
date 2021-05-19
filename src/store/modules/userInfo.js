const state = {
  userToken: null,
  userInfoObj: null,
  deptInfo: null,
  menu: [],
  defaultActive: '',
  activePath: [], // 选中的导航菜单及其父项
}

const getters = {
  token: state => state.userToken?.access_token,
  menu: state => state.menu,
  defaultActive: state => state.defaultActive,
  activePath: state => state.activePath,
}

// 申明同步方法
const mutations = {
  setUserToken(state, obj) {
    state.userToken = obj
  },
  setUserInfoObj(state, obj) {
    state.userInfoObj = obj
  },
  setDeptInfo(state, obj) {
    state.deptInfo = obj
  },
  setMenu(state, obj) {
    console.log(process.env.VUE_APP_SERVER_MODE)
    if (process.env.VUE_APP_SERVER_MODE === 'dev') {
      obj.push({
        name: '业务组件库',
        css: "iconfont icon-shezhi",
        url: '/component',
        id: 9999,
        subMenus: [
          {
            name: '上传',
            // css: "iconfont icon-shezhi",
            id: 9998,
            url: '/component/upload'
          }
        ]
      })
    }
    state.menu = obj
  },
  setDefaultActive(state, v) {
    state.defaultActive = v
  },
  setActivePath(state, path) {
    state.activePath = path
  }
}

// 申明异步方法
const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
