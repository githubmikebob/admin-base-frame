import request, { changeBaseUrl } from '@/global/js/common/request'

changeBaseUrl()

export function getEmployeeList(params = { page: 1, size: 20 }) {
  return request({
    url: '/Employee/GetList',
    method: 'POST',
    data: params
  })
}