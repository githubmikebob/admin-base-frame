import { getDistrict } from '../../api/admin'
import storage from '../../global/js/common/storage'

const state = {
  district: storage.get('district') || []
}
const mutations = {
  'SET_DISTRICT': (state, district) => {
    state.district = district
    storage.set('district', district, 3600 * 24)
  },
  'REMOVE_DISTRICT': (state) => {
    state.district = []
    storage.remove('district')
  }
}
const actions = {
  setDistrict({ state, commit }, param) {
    return new Promise(async (resolve, reject) => {
      if ((state.district !== []) && !(storage.isOverTime('district'))) {
        resolve(state.district)
      } else {
        commit('REMOVE_DISTRICT')
        try {
          let res = await getDistrict(param)
          commit('SET_DISTRICT', res.data)
          resolve(res.data)
        } catch (e) {
          reject(e)
        }
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