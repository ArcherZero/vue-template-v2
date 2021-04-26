const state = {
  userToken: null,
  userInfoObj: null,
  deptInfo: null,
  menu: []
}

const getters = {
  token: state => state.userToken?.access_token,
  menu: state => state.menu
}

// 申明同步方法
const mutations = {
  setUserToken(state,obj) {
    state.userToken = obj
  },
  setUserInfoObj(state,obj) {
    state.userInfoObj = obj
  },
  setDeptInfo(state,obj) {
    state.deptInfo = obj
  },
  setMenu(state, obj) {
    state.menu = obj
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
