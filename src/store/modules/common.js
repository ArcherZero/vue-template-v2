import * as SystemAction from '@/api/system'

// 页面加载状态
export default {
  state: {
    loading: false,
    allMenu: [] // 全部菜单
  },
  getters: {
    loading: state => state.loading,
    allMenu: state => state.allMenu
  },
  mutations: {
    SET_LOADING(state, val) {
      state.loading = val
    },
    SET_ALL_MENU (state, val) {
      state.allMenu = val
    }
  },
  actions: {
    async getAllMenu ({ commit }) {
      const res = await SystemAction.getAllMenus()
      const parent = res.data.find(item => item.parentId === '-1' && item.clientId === 'webApp')
      this.parentId = parent.id
      const target = res.data.filter(item => item.clientId === 'webApp')
      const result = target.filter(item => +item.parentId === +parent?.id)
      result.forEach(item => {
        if (!item.subMenus) item.subMenus = []
        target.forEach(menu => {
          if (+menu.parentId === +item.id) item.subMenus.push(menu)
        })
      })
      commit('SET_ALL_MENU', result)
    }
  }
}
