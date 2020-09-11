import extend from '../../global/js/function/extend'
import deepCopy from '../../global/js/function/deepCopy'

import { generateBaseFields, lengthRule, requiredRule } from './base'

export const default_top_menu = {
  id: 0,
  title: '顶级菜单',
  status: 1
}

export const fields = generateFields() // 字段

export const placeholder = generatePlaceholders() // placeholder

export const verify = generateVerify() // 验证返回

/**
 * 前端验证规则
 */
export const validator = {
  name: {
    required: 'true',
    length_gt: '60'
  },
  title: {
    required: 'true',
    length_gt: '60'
  },
  remark: {
    length_gt: '120'
  }
}

export const locales = generateLocales() // 语言包

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateFields() {
  let base = generateBaseFields(['sort', 'status', 'statuses', 'remark', 'created_at', 'updated_at'])
  let user_menu = {
    user_menu: '后台菜单',
    menu: '菜单',
    id: '菜单ID',
    pid: '顶级菜单ID',
    top_menu: '顶级菜单',
    name: '菜单标识',
    title: '菜单名称',
    icon: '菜单图标',
    show: '是否显示',
    rules: '拥有权限'
  }
  return extend(base, user_menu)
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
      length_gt: lengthRule(fields.name, 60)
    },
    title: {
      required: requiredRule(fields.title),
      length_gt: lengthRule(fields.title, 60)
    },
    remark: {
      length_gt: lengthRule(fields.remark, 120)
    }
  }
}

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateLocales() {
  let user_menu = generateFields()
  user_menu.placeholder = placeholder
  user_menu.validator = validator
  user_menu.verify = verify
  return user_menu
}

/**
 * 处理菜单数据
 * @param user_menu
 * @param top
 */
export const user_menu = (user_menu, top = true) => {
  if (top) {
    return user_menu
  } else {
    if (user_menu.hasOwnProperty('menu')) return user_menu.menu
  }
}

/**
 * 处理顶级菜单
 * @param user_menu
 * @param top
 */
export const top_menu = (user_menu, top = false) => {
  if (top) {
    return user_menu
  } else {
    if (user_menu.hasOwnProperty('top_menu')) {
      if (user_menu.top_menu) {
        return user_menu.top_menu
      } else {
        return default_top_menu
      }
    }
  }
}

/**
 * 处理菜单拥有的权限
 * @param menu
 * @param top
 * @param index
 * @returns {[]}
 */
export function rules(menu, top = false, index = 'rules') {
  let items = []
  let rules = []
  if (top) {
    items = deepCopy(menu)
  } else {
    if (menu.hasOwnProperty(index) && menu[index]) {
      items = menu[index]
    }
  }
  for (let v of items) {
    rules.push(v)
  }
  return rules
}

export default {
  fields,
  placeholder,
  locales
}
