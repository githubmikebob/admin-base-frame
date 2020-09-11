import $base, { equalRule } from './base'
import extend from '@/global/js/function/extend'

/**
 * 字段
 * @type {{}}
 */
export const fields = generateFields()

/**
 * Placeholder
 * @type {{}}
 */
let inputList = ['mobile', 'code', 'password', 'password_confirmation']
export const placeholder = $base.generatePlaceholders(fields, inputList)

export const verify = generateVerify()

/**
 * 前端验证规则
 */
export const validator = {
  mobile: {
    required: 'true',
    format: 'isPhone',
  },
  code: {
    required: 'true'
  },
  password: {
    required: 'true',
    length_lt: '5',
    length_gt: '13',
    format: 'isPassword',
    again: 'password_confirmation' // 值改变后再次对again里面的值进行验证
  },
  password_confirmation: {
    required: 'true',
    length_lt: '5',
    length_gt: '13',
    format: 'isPassword',
    equal: 'password' // 是否与equal里面的值是否一致
  }
}

export const error = generateError()

/**
 * 语言包
 */
export const locales = generateLocales()

/**
 * 生成语言包
 */
export function generateLocales() {
  let forget = generateFields()
  forget.placeholder = placeholder
  forget.validator = validator
  forget.verify = verify
  return forget
}

/**
 * 生成语言包
 */
export function generateFields() {
  let base = $base.generateBaseFields(['status', 'remark', 'created_at', 'updated_at'])
  let forget = {
    mobile: '手机号码',
    code: '验证码',
    password: '新密码',
    password_confirmation: '新密码二次确认'
  }
  return extend(base, forget)
}

/**
 * 生成验证规则
 */
export function generateVerify() {
  return {
    mobile: {
      required: $base.requiredRule(fields.mobile),
      format: $base.formatRule(fields.mobile)
    },
    code: {
      required: $base.requiredRule(fields.code),
    },
    password: {
      required: $base.requiredRule(fields.password),
      length_lt: $base.lengthRule(fields.password, 6, 2),
      length_gt: $base.lengthRule(fields.password, 12),
      format: $base.formatRule(fields.password, '空格或中文', 2)
    },
    password_confirmation: {
      required: $base.requiredRule(fields.password_confirmation),
      length_lt: $base.lengthRule(fields.password_confirmation, 6, 2),
      length_gt: $base.lengthRule(fields.password_confirmation, 12),
      format: $base.formatRule(fields.password_confirmation, '空格或中文', 2),
      equal: equalRule(fields.password_confirmation, fields.password)
    }
  }
}

export function generateError() {
  return {}
}

export default {
  fields,
  placeholder,
  locales
}
