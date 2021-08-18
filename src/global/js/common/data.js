/** ************************************************ 数据处理 ************************************************ **/

import deepCopy from '../function/deepCopy'

/**
 * 字段赋值
 * @param form
 * @param data
 * @param need
 * @returns {*}
 */
export const setField = (form, data, need) => {
  if (!need) need = deepCopy(form)
  let k
  for (k in need) {
    if (need.hasOwnProperty(k)) form[k] = (['undefined', ' - ', '-'].indexOf(data[k]) !== -1) ? need[k] : data[k]
  }
  return form
}

/**
 * 清除字段
 * @param form
 * @param need
 * @returns {*}
 */
export const clearField = (form, need) => {
  if (!need) need = deepCopy(form)
  for (let k in need) {
    if (need.hasOwnProperty(k)) form[k] = ''
  }
  return form
}

/**
 * 删除字段
 * @param form
 * @param need
 * @returns {*}
 */
export const delField = (form, need) => {
  if (!need) need = deepCopy(form)
  for (let k in need) {
    if (need.hasOwnProperty(k) && need[k] === null) delete form[k]
  }
  return form
}

/**
 * 获取对象的第一个属性
 * @param obj
 * @return {*}
 */
export const firstObj = (obj) => {
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) return obj[k]
  }
}

/**
 * 转换为小数
 * @param value
 * @param point
 * @param float
 * @return {(string | number)|string}
 */
export const toDecimal = (value, point, float) => {
  if (isNaN(value)) {
    return '0.00'
  }
  if (!point) point = 2
  let divi = Math.pow(10, point)
  value = (Math.round(value * divi) / divi).toFixed(point)
  if (float === 1) value = parseFloat(value)
  return value
}

/**
 * 判断是否是外部的链接
 * @param {string} path
 * @returns {Boolean}
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断是否数组
 * @param o
 * @returns {boolean}
 */
export function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

/**
 * 判断是否是数字
 * @param number
 * @return {boolean}
 */
export const isNumber = (number) => {
  let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  return regPos.test(number) || regNeg.test(number)
}

export default {
  setField,
  clearField,
  delField,
  firstObj,
  toDecimal,
  isExternal,
  isArray,
  isNumber
}
