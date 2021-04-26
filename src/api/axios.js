import axios from 'axios'
import store from '@/store'
import router from "@/router"
import { Message } from 'element-ui'
import ApiResponse from '@/model/ApiResponse.class'

// axios 配置
axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = false

// 对响应数据进行处理
axios.interceptors.response.use(
  response => {
    const res = new ApiResponse(response)
    setTimeout(() => {
      store.commit('SET_LOADING', false)
    }, 200)

    try {
      const code = response.status
      // 请求成功返回response.data
      if (code >= 200 && code < 300) {
        return res.data
      } else {
        return false
      }
    } catch (e) {
      console.error(e)
    }
  },
  error => {
    let userInfo = store.state.userToken.userInfo
    setTimeout(() => {
      store.commit('SET_LOADING', false)
    }, 200)
    if (error.response?.data?.message) {
      Message.error(error.response.data.message)
    }
    if (error.response) {
      switch (error.response.status) {
      case 404:
        Message.error(error.response.data.msg)
        break
      case 401:
        if (error.response.data.msg === 'Invalid access token: ' + userInfo.access_token) {
          router.push("/login")
          window.localStorage.clear()
          window.sessionStorage.clear()
          Message.error("权限已过期请重新登录")
          store.state.userInfo.userInfo = null
        }
        break
      case 500:
        if (!error.response?.data?.message) {
          Message.error('接口参数错误')
        }
      default:
        Message.error(error.response.data.msg)
      }
    }
    return Promise.reject(error)
  }
)

// 设置请求头信息
axios.interceptors.request.use(
  config => {
    store.commit('SET_LOADING', true)
    const token = store.getters.token
    if (config.url === '/api-auth/oauth/token') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  async get (url, params) {
    return axios.get(url, { params })
  },
  async post (url, params) {
    return axios.post(url, params)
  },
  async delete (url, params) {
    return axios.delete(url, params)
  }
}
