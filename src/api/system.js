import { asyncApi } from '@/global/js/common/request'

/**
 * 清理缓存
 * @param { null } params
 * */
export function getCleanCache(params) {
  return asyncApi({
    url: 'System/CleanCache',
    method: 'POST',
    data: params
  })
}