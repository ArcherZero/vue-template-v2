import axios from './axios'

const apiRouter = '/api-taxi'

export function roles (data) {
  return axios.get(apiRouter + '/roles', data)
}

export function menus (data) {
  return axios.get(apiRouter + '/menus/findAlls', data)
}

export function account (data) {
  return axios.get(apiRouter + '/users', data)
}
