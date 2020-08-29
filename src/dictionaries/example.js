import { generateBaseFields } from './base'
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
export const validator = {}

export const error = generateError()

/**
 * 语言包
 */
export const locales = generateLocales()

/**
 * 生成语言包
 */
export function generateLocales() {
  let example = generateFields()
  example.placeholder = placeholder
  example.validator = validator
  example.verify = verify
  return example
}

/**
 * 生成语言包
 */
export function generateFields() {
  let base = generateBaseFields(['status', 'remark', 'created_at', 'updated_at'])
  let example = {
  }
  return extend(base, example)
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
  return {}
}

export function generateError() {
  return {}
}

export default {
  fields,
  placeholder,
  locales
}
