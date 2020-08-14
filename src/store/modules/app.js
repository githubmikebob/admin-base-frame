import Cookies from 'js-cookie'

const state = {
  device: 'desktop', // 判断终端
  language: Cookies.get('language') ? Cookies.get('language') : 'cn',
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : true,
    withoutAnimation: false
  },
  size: Cookies.get('size') || 'mini', // 设置元素大小
  requesting: {
    mark: '',
    status: false
  },
  paging: {
    mark: '',
    status: false
  }
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  START_REQUESTING: (state, mark) => {
    state.requesting.mark = mark
    state.requesting.status = true
  },
  DONE_REQUESTING: (state) => {
    state.requesting.mark = ''
    state.requesting.status = false
  },
  START_PAGING: (state, mark) => {
    state.paging.mark = mark
    state.paging.status = true
  },
  END_PAGING: (state) => {
    state.paging.mark = ''
    state.paging.status = false
  }
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({commit}, {withoutAnimation}) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  set_size({ commit }, size) {
    commit('SET_SIZE', size)
  },
  startRequesting({ commit }, mark) {
    commit('START_REQUESTING', mark)
  },
  doneRequesting({ commit }) {
    commit('DONE_REQUESTING')
  },
  startPaging({ commit }, mark) {
    commit('START_PAGING', mark)
  },
  endPaging({ commit }) {
    commit('END_PAGING')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
