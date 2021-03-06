import message from './message'

const prefix = 'KGJCrm_'
/**
 * 定时储存前端数据
 * @param k 数据id
 * @param v 数据值
 * @param t 储存时间
 */
export const set = (k, v, t) => {
  k = prefix + k
  try {
    if (!localStorage) return false
    let exp = (new Date().getTime() - 1) + t * 1000
    if (!t) exp = 0
    let data = { val: v, exp: exp }
    localStorage.setItem(k, JSON.stringify(data))
  } catch (e) {
    message.message('error', 'error')
  }
}

/**
 * 获取储存在前端的数据
 * @param k 数据id
 */
export const get = (k) => {
  k = prefix + k
  try {
    if (!localStorage) return false
    let data = JSON.parse(localStorage.getItem(k))
    if (!data) return null
    else return data.val
  } catch (e) {
    remove(k)
    return null
  }
}

/**
 * 获取数据到期时间
 * @param k
 * @returns {*}
 */
export const getExp = (k) => {
  k = prefix + k
  try {
    if (!localStorage) return false
    let data = JSON.parse(localStorage.getItem(k))
    if (!data) return null
    return data.exp
  } catch (e) {
    remove(k)
    return null
  }
}

/**
 * 返回缓存的数据是否超时，true为超时，false为不超时
 * @param { string } k
 * @returns {Boolean}
 **/
export const isOverTime = (k) => {
  return (new Date().getTime()) > (getExp(k))
}

/**
 * 移除前端储存的数据
 * @param k 数据id
 * @returns {boolean}
 */
export const remove = (k) => {
  k = prefix + k
  if (!localStorage) return false
  localStorage.removeItem(k)
}

/**
 * 清楚所有前端储存的数据
 * @returns {boolean}
 */
export const clear = () => {
  if (!localStorage) return false
  localStorage.clear()
}

/**
 * 清除前端储存的除登陆外的所有数据(登陆信息不清除)
 * @returns {boolean}
 */
export const clearData = () => {
  let login = ['userInfo', 'api', 'rules', 'menus', 'driverCode', 'token', 'layout']
  login = login.map(item => {
    return prefix + item
  })
  if (!localStorage) return false
  for (let i in localStorage) {
    if (localStorage.hasOwnProperty(i) && !login.includes(i)) localStorage.removeItem(i)
  }
}

export default {
  set,
  get,
  getExp,
  remove,
  clear,
  isOverTime,
  clearData
}
