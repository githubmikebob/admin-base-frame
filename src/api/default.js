import request from '../global/js/common/request'

export function login(params) {
  request.defaults.baseURL = process.env.VUE_APP_BASE_API
  return request({
    url: '/Employee/Login',
    method: 'POST',
    data: params
  })
}

/**
 * @param { driver_code, type } params
 * **/
export function autoLogin(params) {
  request.defaults.baseURL = process.env.VUE_APP_BASE_API
  return request({
    url: '/Employee/AutoLogin',
    method: 'POST',
    data: params
  })
}

/**
 * @param { driver_code, type } params
 * **/
export function logout(params) {
  request.defaults.baseURL = process.env.VUE_APP_BASE_API
  return request({
    url: '/Employee/Logout',
    method: 'POST',
    data: params
  })
}