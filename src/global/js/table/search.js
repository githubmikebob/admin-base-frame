/**
 * 处理关键词
 * @param column
 * @param keyword
 * @return {string|*}
 */
import deepCopy from '../function/deepCopy'

/**
 * 本地搜索分页
 * @param self
 */
const generateList = (self) => {
  let pool = deepCopy(self.pool)
  self.total = pool.length
  let start = (self.page - 1) * self.size
  let end = self.size * self.page
  self.list = pool.slice(start, end)
  if (self.list.length === 0 && self.page > 1) {
    self.page -= 1
    generateList(self) // 没有数据，重新计算分页
  }
}

const generateKeyword = (column, keyword) => {
  switch (column) {
    case 'first_char':
    case 'jian_pin':
    case 'letter':
    case 'short':
      return keyword.toUpperCase()
    case 'spell':
      return keyword.toLowerCase()
    case 'pin_yin':
      return keyword.substr(0, 1).toUpperCase() + keyword.substr(1).toLowerCase()
    default:
      return keyword
  }
}

const filterKeyword = (config, item) => {
  let flag = false
  let index = []
  let temp = {}
  let keyword = ''
  // key 没有设置，则不搜索
  if (config.value === '' || config.key === '') {
    return true
  } else {
    for (let k of config.key) {
      index = k.split('.')
      temp = deepCopy(item)
      for (let i of index) {
        if (!temp.hasOwnProperty(i)) {
          break
        } else {
          temp = temp[i]
        }
      }
      keyword = generateKeyword(index[index.length - 1], config.value)
      if ((temp && isNaN(temp)) && temp.indexOf(keyword) !== -1) flag = true
      else if (temp && temp.toString().indexOf(keyword) !== -1) flag = true
      if (flag) break
    }
    return flag
  }
}

const filterInt = (config, item) => {
  if (config.value === -1) {
    return true
  } else {
    let index = config.key.split('.')
    let temp = deepCopy(item)
    for (let i of index) {
      if (!temp.hasOwnProperty(i)) {
        break
      } else {
        temp = temp[i]
      }
    }
    return parseInt(temp) === parseInt(config.value)
  }
}

const match = (keyword, item) => {
  let flag = true
  for (let k in keyword) {
    if (keyword.hasOwnProperty(k) && keyword[k].key !== '') {
      switch (keyword[k].type) {
        case 'keyword':
          flag = filterKeyword(keyword[k], item)
          break
        case 'int':
          if (flag) flag = filterInt(keyword[k], item)
          break
        default:
          flag = true
          break
      }
    }
  }
  return flag
}

export default function search() {
  if (this.hasOwnProperty('localSearch') && this.localSearch) {
    if (this.hasOwnProperty('keyword') && Object.keys(this.keyword).length > 0) {
      this.pool = this.remote.filter((item) => {
        return match(this.keyword, item)
      })
    } else {
      this.pool = deepCopy(this.remote)
    }
    if (this.hasOwnProperty('layout') && this.layout === 0) this.list = deepCopy(this.pool)
    else generateList(this)
  } else {
    this.getTable()
  }
}
