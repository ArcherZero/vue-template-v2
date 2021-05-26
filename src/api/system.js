import axios from './axios'
import store from '../store'

const apiRouter = '/api-taxi'

// 角色
export function roles (data) {
  return axios.get(apiRouter + '/roles', data)
}

// 新增编辑角色
export function addRole (data) {
  const param = {
    client: store.getters.client,
    ...data
  }
  return axios.post(apiRouter + '/roles/saveOrUpdate', param)
}

// 删除角色
export function removeRole (data) {
  return axios.delete(`${apiRouter}/roles/${data.id}`)
}

// 菜单列表
export function menus (data) {
  const param = {
    clientId: store.getters.client,
    ...data
  }
  return axios.get(apiRouter + '/menus/findAlls', param)
}

// 新增菜单
export function addMenu (data) {
  const param = {
    clientId: store.getters.client,
    ...data
  }
  return axios.post(apiRouter + '/menus/saveOrUpdate', param)
}

// 删除菜单
export function removeMenu (data) {
  return axios.delete(`${apiRouter}/menus/${data.id}`)
}

// 账号列表
export function account (data) {
  return axios.get(apiRouter + '/users', data)
}

// 启用-停用账号
export function accountEnable (data) {
  return axios.put(apiRouter + '/users/updateEnabled', data)
}

// 新增账号
export function addAccount (data) {
  return axios.post(apiRouter + '/users/saveOrUpdate', data)
}
