// 页面加载状态
export default {
  state: {
    loading: false
  },
  getters: {
    loading: state => state.loading
  },
  mutations: {
    SET_LOADING(state, val) {
      state.loading = val
    }
  }
}
