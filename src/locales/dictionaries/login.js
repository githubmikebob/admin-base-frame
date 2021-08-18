import $base from './base'
import extend from '../../global/js/function/extend'

// 生成基础语言包
export function generateFields() {
  let base = $base.generateBaseFields(['status', 'remark', 'created_at', 'updated_at'])
  let login = {
    mobile: '手机号码',
    password: '密码',
    expired: '登录过期，请重新登录',
    expired_title: '登录过期',
  }
  let app = {
    copyright: 'Copyright © 2016-2019 厦门客管家网络科技有限公司 版权所有 闽ICP备156465131-5',
    consultation: '免费咨询热线：',
    about_link: {
      home: '首页',
      management_software: '管理软件',
      weChat_marketing: '微信营销',
      jake_mode: '积客模式',
      customer_analysis: '客户分析',
      shareholder_dividend: '股东分红',
      employee_dividends: '员工分红',
      phone_guardian: '手机管家'
    }
  }
  return extend(base, login, app)
}

export const fields = generateFields()

// 生成Placeholder
let inputList = ['mobile', 'password']
export const placeholder = $base.generatePlaceholders(fields, inputList)

// 前端验证规则
export const validator = {
  mobile: {
    required: 'true',
    format: 'isPhone',
  },
  password: {
    required: 'true',
    length_lt: '5',
    length_gt: '13',
    format: 'isPassword',
  },
}

// 生成验证规则
export function generateVerify() {
  return {
    mobile: {
      required: $base.requiredRule(fields.mobile),
      format: $base.formatRule(fields.mobile)
    },
    password: {
      required: $base.requiredRule(fields.password),
      length_lt: $base.lengthRule(fields.password, 6, 2),
      length_gt: $base.lengthRule(fields.password, 12),
      format: $base.formatRule(fields.password, '空格或中文', 2)
    }
  }
}

export const verify = generateVerify()

export function generateError() {
  return {}
}

export const error = generateError()

// 生成最终语言包
export function generateLocales() {
  let login = generateFields()
  login.placeholder = placeholder
  login.validator = validator
  login.verify = verify
  return login
}

export const locales = generateLocales()

export default {
  fields,
  placeholder,
  locales
}
