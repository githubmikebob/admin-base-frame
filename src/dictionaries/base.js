import extend from '../global/js/function/extend'

/**
 * 通用字段
 */
export const fields = generateFields()

/**
 * placeholder
 */
export const placeholder = generatePlaceholders()

/**
 * 语言包
 */
export const locales = generateLocales()

export function generateFields() {
  let base = {
    type: '类型',
    price: '价格',
    discount: '折扣',
    sort: '排序',
    status: '状态',
    statuses: {
      '-1': '全部',
      1: '正常',
      2: '禁用',
      color: {
        1: 'primary',
        2: 'danger'
      }
    },
    remark: '备注',
    created_at: '创建时间',
    updated_at: '更新时间',
    action: '操作'
  }
  let search = {
    search: {
      keyword: '关键词 搜索',
      common: '按 名称、首字母、简拼、全拼 进行搜索'
    }
  }
  return extend(base, search)
}

/**
 * 生成需要的基础词典
 * @param need
 * @returns {{}}
 */
export function generateBaseFields(need) {
  let base = {}
  for (let v of need) {
    base[v] = fields[v]
  }
  return base
}

/**
 * 生成 placeholder
 * @returns {{}}
 */
export function generatePlaceholders() {
  return generateFields()
}

/**
 * 生成语言包
 */
export function generateLocales() {
  let base = generateFields()
  base.placeholder = placeholder
  // menu.validator = validator
  // menu.verify = verify
  return base
}

/**
 * 必填规则
 * @param field
 * @param type
 * @returns {string}
 */
export const requiredRule = (field, type = 1) => {
  switch (type) {
    default:
      return field + '不能为空'
    case 1:
      return '请填写' + field
    case 2:
      return '请选择' + field
  }
}

/**
 * 是否存在验证
 * @param field
 * @returns {string}
 */
export const existsRule = (field) => {
  return field + ' 不存在'
}

/**
 * 长度规则
 * @param field
 * @param length
 * @param type
 * @returns {string}
 */
export const lengthRule = (field, length, type = 1) => {
  switch (type) {
    default:
      return field + '不能超过' + length + '个字符'
    case 2:
      return field + '不能小于' + length + '个字符'
  }
}

export function generateBaseRules() {

}

export default {
  locales,
  generateBaseFields,
  requiredRule,
  existsRule,
  lengthRule,
}