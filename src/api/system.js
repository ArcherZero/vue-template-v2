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

// 获取所有菜单
export function getAllMenus (data) {
  return axios.get(apiRouter + '/menus/findAlls', data)
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

// 获取指定角色菜单
export function getRoleMenu (data) {
  return axios.get(`${apiRouter}/menus/${data.id}/menus`)
}

// 角色分配菜单
export function grantedMenu (data) {
  return axios.post(apiRouter + '/menus/granted', data)
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
