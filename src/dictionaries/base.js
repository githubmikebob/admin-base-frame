/**
 * 通用字段
 * @returns {{updated_at: string, created_at: string, remark: string, sort: string, status: string}}
 */
export const fields = {
  sort: '排序',
  status: '状态',
  remark: '备注',
  created_at: '创建时间',
  updated_at: '更新时间',
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
  generateBaseFields,
  requiredRule,
  existsRule,
  lengthRule,
}