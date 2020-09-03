import { baseApi } from '@/global/js/common/request'

export function login(params) {
  return baseApi({
    url: '/Employee/Login',
    method: 'POST',
    data: params
  })
}

/**
 * @param { driver_code, type } params
 * **/
export function autoLogin(params) {
  return baseApi({
    url: '/Employee/AutoLogin',
    method: 'POST',
    data: params
  })
}

/**
 * @param { driver_code, type } params
 * **/
export function logout(params) {
  return baseApi({
    url: '/Employee/Logout',
    method: 'POST',
    data: params
  })
}