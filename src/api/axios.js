import axios from 'axios'
import store from '../store'
import ApiResponse from '@/model/ApiResponse.class'
import ApiError from '@/model/ApiError.class'
import { Message } from 'element-ui'
import { removeSession } from '@/store/storage'
import vue from '../main'
import { ErrorDialog } from '@mainto-ui-component/vue'

// axios 配置
axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.VUE_APP_API_HOST
axios.defaults.withCredentials = false

// 对响应数据进行处理
axios.interceptors.response.use(function (response) {
  const res = new ApiResponse(response)

  if (res.success) {
    // 目前接口返回200，则必定有 msg，所以暂不考虑返回200，success=false 情况
    if (res.msg === 0) return res.msg
    return res.msg || true
  } else {
    // 因又拍云图片上传需要，不包含msg字段，故全部返回
    return res
  }
}, function (error) {
  let message = error.message
  let code = 0
  const traceId = error.response?.data?.trace_id || '未获取到TranceId'
  const url = error.config?.url || '未获取到接口地址'
  if (error.response && error.response.data) {
    const resError = error.response.data
    message = resError.error_msg
    code = resError.error_code
  }
  if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    Message.warning('网络请求超时')
  }
  const err = new ApiError(message, code)

  // 4011 未登录或登录状态失效
  // 如果是16进制映射的错误码，则只需要展示错误信息即可，不需要复制TraceId
  const COMMON_ERROR_CODE = [400, 404, 422, 500]
  if (err.matched && !COMMON_ERROR_CODE.includes(err.code)) {
    // 需要排除不统一处理的报错 [, 换一单]
    const excludeErrCode = [54072971265, 60414758916]
    !excludeErrCode.includes(+err.code) && Message.warning(err.message)
  } else {
    /* eslint-disable-next-line */
    ErrorDialog({
      traceId,
      url,
      errorMessage: err.message,
      errorContent: error.message
    })
  }

  switch (err.code) {
  case 4011:
    removeSession()
    vue.$router.replace({ name: 'login', query: { type: 'logout' } })
    return false
  }
  return Promise.reject(err)
})

// 设置请求头信息
axios.interceptors.request.use(
  config => {
    // 如果请求头里面带有 no-x-stream-id 则不传 x-stream-id
    const noXStreamId = config.headers.noXStreamId || false
    const newConfig = { ...config }
    noXStreamId && delete newConfig.headers.noXStreamId

    const streamId = store.getters.streamId
    if (streamId && streamId !== 'undefined' && !noXStreamId) {
      newConfig.headers['x-stream-id'] = streamId
    }
    return newConfig
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
