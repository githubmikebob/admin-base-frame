import nprogress from '../../../plugins/nprogress.js'
import store from '../../../store'
import axios from 'axios'
import qs from 'qs'
import { errorResponse, responseRoute } from './message'
import deepCopy from '../function/deepCopy'

export const api = {
  // local: 'http://api.admin.crm.com',
  // master: 'https://apiadmin.kgjsoft.com'
  local: 'http://api.admin.keguanjia.com',
  master: 'https://apiadmin.softkgj.com'
}

/**
 * 获取对应的api地址
 * @returns {string}
 */
export const getApiUrl = (request) => {
  let host = document.domain
  if (host === 'localhost' || host === 'localhost:8080' || host === 'localhost:8081' || host === '192.168.66.134') {
    // return request.local
    return request.master
  } else {
    return request.master
  }
}

/**
 * 图片路径
 * @type {string}
 */
// const imgPath = getApiUrl() + '/upload/'

axios.defaults.timeout = 60000 // 配置响应时间 单位 ms
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 请求头

const saveLoad = (url) => {
  let base = ['Index', 'Create', 'Update', 'Info', 'Status']
  let other = ['CleanCache']
  let login = ['Login', 'Logout']
  let need = base.concat(other, login)
  let temp = url.split('/')
  if (need.indexOf(temp[temp.length - 1]) !== -1) {
    store.dispatch('app/startRequesting', url) // 打开请求的加载
  }
}

/**
 * 添加请求拦截器
 * POST 请求之前，序列化参数
 */
axios.interceptors.request.use((config) => {
  // POST 请求之前，执行的操作
  nprogress.start()
  saveLoad(config.url)
  if (config.method === 'post') {
    config.headers.post['Accept'] = 'application/json'
    config.headers.post['Authorization'] = store.state.user.token.access_token
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use((res) => {
  store.dispatch('app/doneRequesting') // 关闭请求的加载
  responseRoute(res.data)
  nprogress.done()
  return Promise.resolve(res.data)
}, (error) => {
  store.dispatch('app/doneRequesting') // 关闭请求的加载
  errorResponse(error)
  nprogress.done()
  return Promise.reject(error)
})

/**
 * @param url
 * @param params
 * @param base
 * @return {Promise<unknown>}
 */
export const apiPost = (url, params = {}, base) => {
  return new Promise((resolve, reject) => {
    if (!base) base = deepCopy(api)
    axios.defaults.baseURL = getApiUrl(base)
    axios.post(url, params).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * 验证是否成功返回
 * @param code
 * @return {boolean}
 */
export const checkCode = (code) => {
  return code === 200 || code === 201
}

export default {
  api,
  getApiUrl,
  apiPost,
  checkCode
}
