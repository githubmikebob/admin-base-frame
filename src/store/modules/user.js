import router from '@/router'
import storage from '@/global/js/common/storage'
import { load, notify } from '@/global/js/common/message'
import * as $baseApi from '@/api/base'

const state = {
  userInfo: storage.get('userInfo') || { admin: '', id: '', mobile: '', name: '' },
  token: storage.get('token') || { access_token: '', expire_in: 0 },
  menus: storage.get('menus') || [],
  rules: storage.get('rules') || [],
  driverCode: storage.get('driverCode') || '',
  api: storage.get('api') || '',
}

const mutations = {
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
    storage.set('userInfo', info, 1800)
  },
  CLEAR_USER_INFO: state => {
    state.userInfo = { admin: '', id: '', mobile: '', name: '' }
    storage.remove('userInfo')
  },
  SET_TOKEN: (state, token) => {
    let expired = token.expire_in || (7 * 24 * 60 * 60)
    state.token = token
    storage.set('token', token, expired)
  },
  CLEAR_TOKEN: state => {
    state.token = { access_token: '', expire_in: 0 }
    storage.remove('token')
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
    storage.set('menus', menus)
  },
  CLEAR_MENUS: state => {
    state.menus = []
    storage.remove('menus')
  },
  SET_RULES: (state, rules) => {
    state.rules = rules
    storage.set('rules', rules)
  },
  CLEAR_RULES: state => {
    state.rules = []
    storage.remove('rules')
  },
  SET_DRIVER_CODE: (state, code) => {
    state.driverCode = code
    storage.set('driverCode', code, 7 * 24 * 60 * 60)
  },
  CLEAR_DRIVER_CODE: state => {
    state.driverCode = ''
    storage.remove('driverCode')
  },
  SET_API: (state, api) => {
    state.api = api
    storage.set('api', api)
  },
  CLEAR_API: state => {
    state.api = ''
    storage.remove('api')
  }
}

const actions = {
  async login({ dispatch }, params) {
    let res = await $baseApi.login(params)
    await dispatch('successLogin', res.data)
  },
  async autoLogin({ state, commit, dispatch }) {
    if (state.driverCode && !storage.isOverTime('driverCode')) {
      let res = await $baseApi.autoLogin({
        driver_code: state.driverCode,
        type: 1
      })
      await dispatch('successLogin', res.data)
    } else {
      commit('CLEAR_TOKEN')
    }
  },
  async successLogin({ commit }, res) {
    commit('SET_USER_INFO', res.customer)
    commit('SET_TOKEN', res.token)
    commit('SET_MENUS', res.menus)
    commit('SET_RULES', res.rules)
    commit('SET_API', res.api)
    commit('SET_DRIVER_CODE', res.driver_code)
    notify(res.message, 'success', 'success.login')
    await router.push({ path: '/Home' })
  },
  async logout({ state, commit }) {
    let loading = load('login.exiting')
    try {
      await $baseApi.logout({
        driver_code: state.driverCode,
        type: 1
      })
      commit('CLEAR_USER_INFO')
      commit('CLEAR_TOKEN')
      commit('CLEAR_MENUS')
      commit('CLEAR_RULES')
      commit('CLEAR_DRIVER_CODE')
      commit('CLEAR_API')
      loading.close()
      await router.push({ path: '/Login' })
    } catch (e) {
      commit('CLEAR_TOKEN')
      loading.close()
    }
  },
  hasToken({ state }) {
    return new Promise((resolve) => {
      if (state.token.access_token) {
        resolve(!storage.isOverTime('token'))
      } else {
        resolve(false)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
