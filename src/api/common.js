import axios from './axios'
import qs from 'qs'

// 获取token
export function token(data) {
  const param = qs.stringify({
    ...data,
    client_id: "webApp",
    client_secret: "webApp",
    grant_type: "password"
  })
  return axios.post('/api-auth/oauth/token', param)
}

// 退出登录
export function logout(data) {
  return axios.post('/api-auth/oauth/remove/token', data)
}

export function userInfo(data) {
  return axios.get('/api-auth/oauth/userinfo', data)
}

export function menu() {
  return axios.get('/api-user/menus/current')
}

export function selectAll() {
  return axios.get('/api-visit/configuration/selectAll')
}
// 文件上传
export function upload(data) {
  return axios.post('/api-file/files-anon', data)
}
