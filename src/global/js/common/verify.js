import i18n from '../../../plugins/i18n'

/** ************************************************ 验证函数集合 ************************************************ **/

/**
 * 客户姓名长度验证
 * @param str
 * @returns {boolean}
 */
export const isName = (str) => {
  const reg = /^[\u4e00-\u9f5a]$/
  const arr = [...str]
  let len = 0
  for (let i = 0; i < arr.length; i++) {
    if (reg.test(arr[i])) len += 2
    else len++
  }
  return len <= 16;
}

/**
 * 身份证验证
 * @param str
 * @returns {boolean}
 */
export const isIdentity = (str) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  let now = new Date().getTime()
  let brithday = new Date(str.substring(6, 10) + '-' + str.substring(10, 12) + '-' + str.substring(12, 14)).getTime()
  if (isNaN(brithday)) return false
  if (brithday > now) return false
  return reg.test(str)
}

/**
 * 电话号码验证
 * @param str
 * @returns {boolean}
 */
export const isPhone = (str) => {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}

/**
 * QQ号码验证
 * @param str
 * @returns {boolean}
 */
export const isQQ = (str) => {
  const reg = /^[1-9][0-9]\d{4,}$/
  return reg.test(str)
}

/**
 * 金额验证（保留两位小数）
 * @param str
 * @returns {boolean}
 */
export const isMoney = (str) => {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  if (str === 0) return true
  return reg.test(str)
}

/**
 * 项目名称长度验证
 * @param str
 * @returns {boolean}
 */
export const isItem = (str) => {
  return str.length <= 30;
}

/**
 * 备注文字长度验证
 * @param str
 * @returns {boolean}
 */
export const isRemark = (str) => {
  const reg = /^[\u4e00-\u9f5a]$/
  const arr = [...str]
  let len = 0
  for (let i = 0; i < arr.length; i++) {
    if (reg.test(arr[i])) len += 2
    else len++
  }
  return len <= 100;
}

/**
 * 车牌号验证
 * @param str
 * @returns {boolean}
 */
export const isPlate = (str) => {
  const reg1 = /^[A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
  const reg2 = /^[A-Z0-9]{6}$/
  return reg1.test(str) || reg2.test(str)
}

/**
 * 车架号验证
 * @param str
 * @returns {boolean}
 */
export const isVin = (str) => {
  const reg = /^[A-Za-z0-9]{17}$/
  return reg.test(str)
}

/**
 * 发动机号验证
 * @param str
 * @returns {boolean}
 */
export const isEngine = (str) => {
  const reg = /^[A-Za-z0-9]{0,8}$/
  return reg.test(str)
}

/**
 * 保险单号验证
 * @param str
 * @returns {boolean}
 */
export const isInsuranceNo = (str) => {
  const reg = /^[A-Za-z0-9]{0,25}$/
  return reg.test(str)
}

/**
 * 正整数验证
 * @param value
 * @returns {boolean}
 */
export const isPositiveNumber = (value) => {
  let reg = /^[1-9]+[0-9]*$/
  return reg.test(value)
}

/**
 * 银行卡号验证
 * @param value
 * @returns {boolean}
 */
export const isBankNum = (value) => {
  let reg = /^(\d{16}|\d{19})$/
  return reg.test(value)
}

/**
 * 字符串非空格和中文验证
 * @param value
 * @returns {boolean}
 */
export const isPassword = (value) => {
  let reg = /^[^\u4e00-\u9fa5 ]+$/
  return reg.test(value)
}

/** ************************************************ form表单rules验证规则 ************************************************ **/

// 生成验证触发方式
const generateTrigger = (target, field) => {
  let key = target + '.validator.' + field + '.trigger'
  if (i18n.te(key)) return i18n.t(key)
  return 'blur'
}

// 验证是否必填
const generateRequired = (target, field) => {
  let key = target + '.validator.' + field + '.required'
  return !!(i18n.te(key) && i18n.t(key) === 'true')
}

// 生成验证规则
const generateValidator = (target, field, self) => {
  let prefix = target + '.validator.' + field
  let verify = target + '.verify.' + field
  if (i18n.te(prefix)) {
    let list = i18n.t(prefix)
    let validator
    for (let k in list) {
      if (list.hasOwnProperty(k)) {
        validator = (rule, value, callback) => {
          if ((!value && i18n.te(prefix + '.required')) && i18n.t(prefix + '.required') === 'true') return callback(new Error(i18n.t(verify + '.required')))
          if ((value && i18n.te(prefix + '.length_lt')) && value.length <= parseInt(i18n.t(prefix + '.length_lt'))) return callback(new Error(i18n.t(verify + '.length_lt')))
          if ((value && i18n.te(prefix + '.length_gt')) && value.length > parseInt(i18n.t(prefix + '.length_gt'))) return callback(new Error(i18n.t(verify + '.length_gt')))
          if ((value && i18n.te(prefix + '.format')) && !(i18n.t(prefix + '.format') + '(value)')) return callback(new Error(i18n.t(verify + '.format')))
          // 密码改变后再次对确认密码进行验证
          if (value && i18n.te(prefix + '.again')) self.$refs.form.validateField(i18n.t(prefix + '.again'))
          // 验证确认密码与密码是否一致
          if (i18n.te(prefix + '.equal') && value !== self.form[i18n.t(prefix + '.equal')]) return callback(new Error(i18n.t(verify + '.equal')))
          callback()
        }
      }
    }
    return validator
  } else {
    return {}
  }
}

// 自动生成验证规则
export default function rules(target, form, self = '') {
  let rule = {}
  for (let k in form) {
    if (form.hasOwnProperty(k) && i18n.te(target + '.validator.' + k)) {
      if (target === 'relation_id') console.log(target, k)
      rule[k] = [{
        validator: generateValidator(target, k, self),
        trigger: generateTrigger(target, k),
        required: generateRequired(target, k)
      }]
    }
  }
  return rule
}