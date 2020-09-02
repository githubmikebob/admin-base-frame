import qs from 'qs'
import axios from 'axios'
import store from '../../../store'
import { get } from '../common/storage'
import nprogress from '../../../plugins/nprogress.js'
import { errorResponse, responseRoute } from './message'


/**
 * 公共请求方法封装
 * @author JJ
 */

// 初始化创建对象
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  // baseURL: process.env.VUE_APP_BASE_API, // .env中配置的api前缀
  timeout: 60000 // request timeout
})
// console.log('配置的初始api地址', process.env.VUE_APP_BASE_API)
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
service.interceptors.request.use(
  async (config) => {
    nprogress.start()
    await saveUrl(config.url)
    config.headers['Accept'] = 'application/json'
    // config.headers['Content-Type'] = 'text/plain'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    if (config.method === 'post') config.data = qs.stringify(config.data)
    // 获取token
    const token = store.state.user.token.access_token || get('accessToken')
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    // do something with request error
    console.log(error, 'err') // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  async (response) => {
    const res = response.data
    nprogress.done()
    responseRoute(res)
    await store.dispatch('app/doneRequesting') // 关闭请求的Loading加载
    let whiteCode = [200, 201]
    if (whiteCode.indexOf(parseInt(res.code)) > -1) {
      // success
      return Promise.resolve(res)
    } else {
      // 处理自定义错误
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  async (error) => {
    await store.dispatch('app/doneRequesting') // 关闭请求的Loading加载
    errorResponse(error)
    return Promise.reject(error)
  }
)
/**
 * 判断请求路由是否需要Loading加载
 * @param { string } url 保存当前请求的路由
 * **/
const saveUrl = async (url) => {
  let base = ['Index', 'Create', 'Update', 'Info', 'Status']
  let other = ['CleanCache']
  let login = ['Login', 'Logout']
  let need = base.concat(other, login)
  let temp = url.split('/')
  if (need.indexOf(temp[temp.length - 1]) > -1) {
    await store.dispatch('app/startRequesting', url) // 打开请求的加载
  }
}

export function changeBaseUrl(url = store.state.user.api) {
  service.defaults.baseURL = url
}

export default service
