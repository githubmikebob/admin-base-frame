import store from '../../store'
// import {loginPost} from '../login/login'
import storage from '../../global/js/common/storage'

export const getCode = (self) => {
  // if (self.$refs[form].validateField('mobile')) {
  //
  // }
  const time_count = 59
  if (!self.timer_code) {
    self.count_code = time_count
    self.show_code = false
    self.timer_code = setInterval(() => {
      if (self.count_code > 1 && self.count_code <= time_count) {
        self.count_code--
      } else {
        self.show_code = true
        clearInterval(self.timer_code)
        self.timer_code = null
      }
    }, 1000)
    self.apiPost(self.code_url, {mobile: self.form.mobile}).then()
  }
}

export const retrieve = (self, info) => {
  self.$refs.form.validate((valid) => {
    if (valid) retrievePost(self, info)
    else return false
  })
}

export const retrievePost = async (self, info) => {
  await store.dispatch('alert/clearAlert')
  self.apiPost(self.url, info).then(res => {
    if (self.checkCode(res.code)) {
      self.modify_psd = false
      countdown(self, info)
    }
  })
}

export const countdown = (self, info) => {
  const time_count = 10
  if (!self.timer_login) {
    self.count_login = time_count
    self.timer_login = setInterval(() => {
      if (self.count_login > 1 && self.count_login <= time_count) {
        self.count_login--
      } else {
        clearInterval(self.timer_login)
        self.timer_login = null
        loginNow(info)
      }
    }, 1000)
  }
}

export const loginNow = (info) => {
  let language = storage.get('language') ? storage.get('language') : 'cn'
  let data = {
    mobile: info.mobile,
    password: info.password,
    driver_code: '',
    remember: 2,
    type: 1
  }
  // loginPost(data, language)
}

export default {
  getCode,
  retrieve,
  retrievePost,
  loginNow
}
