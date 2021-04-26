/**
 * @description 处理请求返回 response 类，返回200情况
 * response.data 格式：
 * {
 *    code: number
 *    message: string,
 *    data: [any] // 新增接口data返回为null
 * }
 */

class ApiResponse {
  constructor (response) {
    this.response = response.data
    this.code = response.code || 0 // 接口原返回 response
    this.message = null // 处理完的最终数据
    this.data = null
    this.__handleResponse(response)
  }

  __handleResponse (response) {
    if (response.code === 0 || response.code) {
      this.data = this.response.data
      this.message = this.response.message
    } else {
      this.data = this.response
      this.message = '...'
    }

    if (this.code === 0 && this.data === null) this.data = true
  }
}

export default ApiResponse
