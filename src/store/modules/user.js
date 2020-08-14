import storage from '../../global/js/common/storage'

const state = {
  user: {
    id: storage.get('user') ? storage.get('user').id : '',
    nickname: storage.get('user') ? storage.get('user').nickname : '',
    username: storage.get('user') ? storage.get('user').username : ''
  },
  token: {
    access_token: storage.get('token') ? storage.get('token').access_token : '',
    token_expired: storage.get('token') ? storage.get('token').expired : 0
  },
  menus: storage.get('menus') ? storage.get('menus') : [],
  rules: storage.get('rules') ? storage.get('rules') : []
}

const mutations = {
  SET_USER: (state, user) => {
    state.user.id = user.id
    state.user.nickname = user.nickname
    state.user.username = user.username
    storage.set('user', user, 1800)
  },
  CLEAR_USER: state => {
    state.user.id = ''
    state.user.nickname = ''
    state.user.username = ''
    storage.remove('user')
  },
  SET_TOKEN: (state, token) => {
    token.expired = new Date() - 1 + token.expire_in * 1000
    state.token.access_token = token.access_token
    state.token.token_expired = token.expired
    storage.set('token', token, token.expire_in)
  },
  CLEAR_TOKEN: state => {
    state.token.access_token = ''
    state.token.token_expired = 0
    storage.remove('token')
  },
  SET_MENU: (state, menus) => {
    state.menus = menus
    storage.set('menus', menus, 0)
  },
  CLEAR_MENU: state => {
    state.menus = []
    storage.remove('menus')
  },
  SET_RULE: (state, rules) => {
    state.rules = rules
    storage.set('rules', rules, 0)
  },
  CLEAR_RULE: state => {
    state.rules = []
    storage.remove('rules')
  }
}

const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
  clearUser({ commit }) {
    commit('CLEAR_USER')
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  clearToken({ commit }) {
    commit('CLEAR_TOKEN')
  },
  setMenu({ commit }, menus) {
    commit('SET_MENU', menus)
  },
  clearMenu({ commit }) {
    commit('CLEAR_MENU')
  },
  setRule({ commit }, rules) {
    commit('SET_RULE', rules)
  },
  clearRule({ commit }) {
    commit('CLEAR_RULE')
  },
  logout({ commit }) {
    commit('CLEAR_USER')
    commit('CLEAR_TOKEN')
    commit('CLEAR_MENU')
    commit('CLEAR_RULE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
