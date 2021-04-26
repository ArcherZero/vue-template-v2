import axios from './axios'
import qs from 'qs'

// 获取token
export function token (data) {
  const param =qs.stringify({
    ...data,
    client_id: "evm-equipment",
    client_secret: "evm-equipment",
    grant_type: "password"
  })
  return axios.post('/api-auth/oauth/token', param)
}

export function userInfo (data) {
  return axios.get('/api-auth/oauth/userinfo', data)
}

export function menu () {
  return axios.get('/api-user/menus/current')
}

export function selectAll () {
  return axios.get('/api-visit/configuration/selectAll')
}
