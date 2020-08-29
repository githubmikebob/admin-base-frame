import { existsRule, generateBaseFields, lengthRule, requiredRule } from './base'
import extend from '../global/js/function/extend'

/**
 * 字段
 * @type {{}}
 */
export const fields = generateFields()

/**
 * Placeholder
 * @type {{}}
 */
export const placeholder = generatePlaceholders()

export const verify = generateVerify()

/**
 * 前端验证规则
 */
export const validator = {
  rule: {
    required: 'true',
    length_gt: '60'
  },
  menu_id: {
    required: 'true'
  },
  remark: {
    length_gt: '120'
  }
}

/**
 * 语言包
 */
export const locales = generateLocales()

/**
 * 生成语言包
 */
export function generateLocales() {
  let menu = generateFields()
  menu.placeholder = placeholder
  menu.validator = validator
  menu.verify = verify
  return menu
}

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateFields() {
  let base = generateBaseFields(['status', 'remark', 'created_at', 'updated_at'])
  let employee_rule = {
    employee_rule: '权限',
    id: '权限ID',
    menu: '所属菜单',
    rule: '权限标识',
  }
  return extend(base, employee_rule)
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
    id: {
      exists: existsRule(fields.id)
    },
    rule: {
      required: requiredRule(fields.name),
      length_gt: lengthRule(fields.name, 60)
    },
    menu_id: {
      required: requiredRule(fields.title, 2),
    },
    remark: {
      length_gt: lengthRule(fields.remark, 120)
    }
  }
}

/**
 * 处理菜单数据
 * @param rule
 * @param top
 */
export const employee_rule = (rule, top = true) => {
  if (top) {
    return rule
  } else {
    if (rule.hasOwnProperty('employee_rule')) return rule.rule
  }
}

export default {
  fields,
  placeholder,
  locales
}
