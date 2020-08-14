const state = {
  socket: {
    fd: '',
    id: '',
    type: '',
    username: '',
    ip: '',
    port: '',
    remote_ip: '',
    status: false
  }
}

const mutations = {
  SET_SOCKET: (state, socket) => {
    state.socket = socket
  },
  CLEAR_SOCKET: state => {
    state.socket = {
      fd: '',
      id: '',
      type: '',
      username: '',
      ip: '',
      port: '',
      remote_ip: '',
      status: false
    }
  }
}

const actions = {
  setSocket({ commit }, socket) {
    commit('SET_SOCKET', socket)
  },
  clearSocket({ commit }) {
    commit('CLEAR_SOCKET')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
