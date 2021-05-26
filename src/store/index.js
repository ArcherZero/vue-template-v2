import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import userInfo from './modules/userInfo'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    client: 'webApp'
  },
  mutations: {},
  actions: {},
  getters: {
    client: state => state.client
  },
  modules: {
    userInfo,
    common
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
