import { generateBaseFields, lengthRule, requiredRule } from './base'
import extend from '../../global/js/function/extend'
import deepCopy from '../../global/js/function/deepCopy';

export const default_top_menu = {
  id: 0,
  name: '顶级菜单',
  status: 1
}

export const fields = generateFields() // 字段

export const placeholder = generatePlaceholders() // placeholder

export const locales = generateLocales() // 语言包

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

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateFields() {
  let base = generateBaseFields(['sort', 'status', 'remark', 'created_at', 'updated_at'])
  let setUp = {
    menu: '菜单',
    id: '菜单ID',
    pid: '顶级菜单ID',
    top_menu: '顶级菜单',
    name: '菜单名称',
    title: '菜单标识',
    icon: '菜单图标',
    show: '是否显示',
    rules: '拥有权限'
  }
  let menu = {
    Login: '登录',
    Home: '首页',
    Forget: '忘记密码'
  }
  return extend(base, setUp, menu)
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
  let menu = generateFields()
  menu.placeholder = placeholder
  menu.validator = validator
  menu.verify = verify
  return menu
}

/**
 * 处理菜单数据
 * @param menu
 * @param top
 */
export const menu = (menu, top = true) => {
  if (top) {
    return menu
  } else {
    if (menu.hasOwnProperty('menu')) return menu.menu
  }
}

/**
 * 处理顶级菜单
 * @param menu
 * @param top
 */
export const top_menu = (menu, top = false) => {
  if (top) {
    return menu
  } else {
    if (menu.hasOwnProperty('top_menu')) {
      if (menu.top_menu) {
        return menu.top_menu
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
 * @returns {*[]|*}
 */
export const rules = (menu, top = false) => {
  let items = []
  let rules = []
  if (top) { items = deepCopy(menu) } else {
    if (menu.hasOwnProperty('rules') && menu.rules) { items = menu.rules }
  }
  for (let v of items) { rules.push(v.rule) }
  return rules
}

export default {
  fields,
  placeholder,
  locales
}
