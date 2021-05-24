import * as util from './index'

function _validator (customValid, rule, value, callback) {
  if (rule.required && util.isBlank(value)) callback(new Error(rule.messageNull))
  else if (!rule.required && !value) callback()
  else if (!customValid) callback(new Error(rule.messageError))
  else callback()
}

/**
* @description 手机号码验证
*/
export const phoneValidator = (rule, value, callback) => {
  const reg = /^1[0-9]{10}$/.test(value)
  _validator(reg, rule, value, callback)
}

/**
 * @description 手机号码和固定电话验证
 */
export const telValidator = (rule, value, callback) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[0-9]{10}))$/.test(value)
  _validator(reg, rule, value, callback)
}

/**
* @description 邮箱验证
*/
export const emailValidator = (rule, value, callback) => {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)
  _validator(reg, rule, value, callback)
}

/**
* @description 身份证号校验
*/
export const identityValidator = (rule, value, callback) => {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
  _validator(reg, rule, value, callback)
}

/**
 * @description http、https开头url验证（非严谨）
 */
export const urlValidator = (rule, value, callback) => {
  const reg = /^(http|https):\/\/([\w.]+\/?)\S*/.test(value)
  _validator(reg, rule, value, callback)
}
