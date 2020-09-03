import { asyncApi } from '@/global/js/common/request'

export function getEmployeeList(params = { page: 1, size: 20 }) {
  return asyncApi({
    url: '/Employee/GetList',
    method: 'POST',
    data: params
  })
}

export function getWeChatAccount(params = { page: 1, size: 20 }) {
  return asyncApi({
    url: 'WeChatAccount/Index',
    method: 'POST',
    data: params
  })
}