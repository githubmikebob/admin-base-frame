/** ************************************************ 表格数据处理 ************************************************ **/

import deepCopy from '../function/deepCopy'
import transform from '../function/transform'
import { isArray } from '../common/data'
import store from '../../../store'

/**
 * 本地搜索 展示数据
 * @param self
 * @param searchResult
 * @param data
 */
export const showData = (self, searchResult, data) => {
  if (!searchResult) searchResult = deepCopy(data)
  self.total = searchResult.length
  let start = (self.page - 1) * self.size
  let end = self.size * self.page
  self.data = searchResult.slice(start, end)
}

export const generateScopeValue = (row, props, language) => {
  let value = ''
  let _row = deepCopy(row)
  if (props !== '') {
    props = props.split('.')
    for (let v of props) {
      if (_row.hasOwnProperty(v) && _row[v] !== null) {
        value = deepCopy(_row[v])
        _row = deepCopy(_row[v])
      } else {
        value = ''
      }
    }
  } else { value = _row }
  if (language && value !== '') {
    return transform(language + '.' + value)
  } else {
    return value
  }
}

export const makeScopeValue = (row, prop, language = '', split = ' - ') => {
  if (isArray(prop)) {
    let value = ''
    let text = []
    for (let p of prop) {
      value = generateScopeValue(row, p, language)
      if (value !== '') text.push(value)
    }
    return text.join(split)
  } else {
    return generateScopeValue(row, prop, language)
  }
}

export const makeScopePrice = (row, prop, color = false) => {
  let price = makeScopeValue(row, prop)
  let style = ''
  if (color) {
    if (parseFloat(price) >= 0) {
      style = 'success'
    } else {
      style = 'danger'
    }
    return style
  }
  return price
}

export const makeScopeDate = (row, prop, format, split = '-') => {
  let time = generateScopeValue(row, prop, false)
  time = new Date(time)
  let day = []
  switch (format) {
    case 'date':
      return time
    case 'day':
      day.push(time.getFullYear(), time.getMonth() + 1, time.getDate())
      return day.join(split)
  }
}

export const checkRule = (rule) => {
  let rules = store.state.user.rules
  if (rule.length === 0) return true
  else return rule.some(rule => rules.includes(rule))
}

export default {
  showData,
  generateScopeValue,
  makeScopeValue,
  makeScopePrice,
  makeScopeDate,
  checkRule
}
