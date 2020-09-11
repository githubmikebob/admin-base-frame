import extend from '../../global/js/function/extend';

export const success = generateMessageSuccess() // 成功

export function generateMessageSuccess() {
  let base = {
    login: '登录成功',
    welcome: '欢迎回来',
  }
  let success = {
    clean: '缓存清除成功',
    logout: '退出成功',
  }
  return extend(base, success)
}

export default {
  success
}