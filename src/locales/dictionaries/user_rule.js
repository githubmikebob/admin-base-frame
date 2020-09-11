import { generateBaseFields, lengthRule, requiredRule } from './base'

import extend from '../../global/js/function/extend'

export const fields = generateFields() // 字段

export const placeholder = generatePlaceholders() // placeholder

export const verify = generateVerify() // 验证返回

/**
 * 前端验证规则
 */
export const validator = {
  name: {
    required: 'true',
    length_gt: '30'
  }
}

export const locales = generateLocales() // 语言包

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateFields() {
  let base = generateBaseFields(['sort', 'status', 'statuses', 'remark', 'created_at', 'updated_at'])
  let user_rule = {
    user_rule: '后台权限',
    rule: '权限',
    menu: '所属菜单',
    id: '权限ID',
    name: '权限标识',
    rules: '拥有权限'
  }
  let rules = {
    rules: {
      Add: '添加',
      Index: '查看',
      Status: '启停用'
    }
  }
  return extend(base, user_rule, rules)
}

/**
 * 生成 placeholder
 * @returns {{}}
 */
export function generatePlaceholders() {
  return generateFields()
}

/**
 * 生成验证规则
 */
export function generateVerify() {
  return {
    name: {
      required: requiredRule(fields.name),
      length_gt: lengthRule(fields.name, 30)
    }
  }
}

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateLocales() {
  let user_rule = generateFields()
  user_rule.placeholder = placeholder
  user_rule.validator = validator
  user_rule.verify = verify
  return user_rule
}

export default {
  fields,
  placeholder,
  locales
}
