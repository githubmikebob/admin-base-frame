import router, { resetRouter } from '../../../src/router'
import store from '../../../src/store'
import { apiPost, checkCode } from '../../global/js/common/http'
import { notify } from '../../global/js/common/message'

export const login = (self, form, info, url, language = 'cn') => {
  if (!form) form = 'form'
  self.$refs.form.validate((valid) => {
    if (valid) loginPost(self, info, language)
    else return false
  })
}

export const loginPost = async (self, info, language) => {
  await store.dispatch('alert/clearAlert')
  apiPost('/User/Login', info).then(res => {
    if (checkCode(res.code)) {
      saveLanguage(language)
      saveToken(res.data.token)
      saveUser(res.data.user)
      saveRules(res.data.rules)
      generateRoute(res.data.menus)
      store.commit('socket/CLEAR_SOCKET')
      notify(res.data.message, 'success', 'success.login')
      home()
    }
  })
}

/**
 * 保存用户选择的语言包
 * @param language
 */
export const saveLanguage = (language) => {
  store.commit('app/SET_LANGUAGE', language)
}

export const saveToken = (token) => {
  store.commit('user/SET_TOKEN', token)
}

export const saveUser = (user) => {
  store.commit('user/SET_USER', user)
}

export const saveRules = (rules) => {
  store.commit('user/SET_RULE', rules)
}

export const generateRoute = async (menus) => {
  store.commit('user/SET_MENU', menus)
  resetRouter()
  let routes = await store.dispatch('permission/generateRoutes', menus)
  router.addRoutes(routes)
}

/**
 * 跳转到首页
 */
export const home = () => {
  router.push('/Home')
}

/**
 * 跳转到登陆页
 */
export const loginPage = () => {
  router.push('/')
}

export default {
  login
}
