import { checkDate } from './verify'

/** ************************************************ 数据处理 Start ************************************************ **/
export const random = () => {
  let random = Math.ceil(Math.random() * 900) + 100
  return random < 1000 ? random : 999
}
/**
 * 生产订单号
 */
export const formNo = () => {
  let now = new Date()
  let time = now.getTime().toString().substring(5)
  let rand = random()
  return now.getFullYear().toString() + getMonth(now.getTime()) + getDay(now.getTime()) + time + rand
}

export const batchNo = () => {
  let no = formNo()
  return no.substring(2)
}

/**
 * 获取日期格式
 * @param timestamp 时间戳
 * @return {*}
 */
export const formatDate = (timestamp) => {
  if (!timestamp) timestamp = new Date().getTime()
  else if (timestamp && isNaN(timestamp)) timestamp = timestamp.replace(/-/g, '/')
  let date = new Date(timestamp)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  let strDate = Y + M + D + h + m + s
  return { date: date, time: strDate, Y: Y, M: M, D: D, h: h, m: m, s: s }
}

export const formatTime = (timestamp) => {
  let date = formatDate(timestamp)
  return date.Y + date.M + date.D + date.h + date.m + date.s
}

export const formatDay = (timestamp) => {
  if (!timestamp) timestamp = new Date().getTime()
  let date = formatDate(timestamp)
  return date.Y + date.M + date.D
}

export const formatFloat = (value) => {
  let n = parseFloat(value)
  if (isNaN(n)) {
    return 0.00
  } else {
    return Math.round(n * 100) / 100
  }
}

export const formatFixed = (value) => {
  let n = parseFloat(value)
  if (isNaN(n)) {
    return 0.00
  } else {
    return n.toFixed(2)
  }
}

export const getYear = (timestamp = new Date().getTime()) => {
  let date = new Date(timestamp)
  return date.getFullYear()
}

export const getMonth = (timestamp = new Date().getTime()) => {
  let date = new Date(timestamp)
  let month = date.getMonth() + 1
  return month < 10 ? '0' + month : month
}

export const getLastMonth = (timestamp = new Date().getTime()) => {
  let date = new Date(timestamp)
  let month = date.getMonth()
  return month < 10 ? '0' + month : month
}

export const getDay = (timestamp = new Date().getTime()) => {
  let date = new Date(timestamp)
  let day = date.getDate()
  return day < 10 ? '0' + day : day
}

export const getWeek = (dayOfWeek) => {
  let day
  switch (dayOfWeek) {
    case 0:
      day = '日'
      break
    case 1:
      day = '一'
      break
    case 2:
      day = '二'
      break
    case 3:
      day = '三'
      break
    case 4:
      day = '四'
      break
    case 5:
      day = '五'
      break
    case 6:
      day = '六'
      break
  }
  return day
}

/**
 * 获取时间戳
 * @param date
 * @returns {*}
 */
export const getTimestamp = (date = '') => {
  if (!checkDate(date)) {
    return ''
  }
  date = new Date(date)
  return date.getTime()
}

// export const TMap = (key) => {
//   return new Promise(function (resolve, reject) {
//     window.init = function () {
//       resolve(qq) // 注意这里
//     }
//     var script = document.createElement('script')
//     script.type = 'text/javascript'
//     script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=' + key
//     script.onerror = reject
//     document.head.appendChild(script)
//   })
// }

export default {
  formNo,
  batchNo,
  random,
  formatDate,
  formatTime,
  formatDay,
  formatFloat,
  formatFixed,
  getYear,
  getLastMonth,
  getWeek,
  getTimestamp
}
