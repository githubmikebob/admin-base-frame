import deepCopy from '../function/deepCopy'
import transform from '../function/transform'
import { isArray } from '../common/data'

/**
 * 获取列的值
 * @param row
 * @param props
 * @returns {any}
 */
export function generateScopeValue(row, props) {
  let value = deepCopy(row)
  if (props !== '') {
    if (isArray(props)) {
      let a = []
      props.map(prop => {
        (generateScopeValue(row, prop) !== '') ? a.push(generateScopeValue(row, prop)) : ''
        // prop = prop.split('.')[0]
        // if (row.hasOwnProperty(prop) && row[prop] !== null) {
        //   a.push(row[prop].name)
        // }
      })
      value = (a.length > 0) ? deepCopy(a.join(' / ')) : ''
    } else {
      props = props.split('.')
      for (let v of props) {
        if (value.hasOwnProperty(v) && value[v] !== null) {
          value = deepCopy(value[v])
        } else {
          value = ''
        }
      }
    }
  }
  return value
}

/**
 * 列的值，转译成语言包
 * @param value
 * @param language
 * @returns {string|*}
 */
export function generateScopeLanguage(value, language) {
  if (language && value !== '') {
    return transform(language + '.' + value)
  } else {
    return value
  }
}

export default {
  generateScopeValue,
  generateScopeLanguage
}