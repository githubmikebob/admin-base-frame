import { apiPost } from '../common/http'
import deepCopy from '../function/deepCopy'
import store from '../../../store'

const generatePost = (keyword) => {
  let post = {}
  for (let k in keyword) {
    if (keyword.hasOwnProperty(k)) {
      post[k] = keyword[k].value
    }
  }
  return post
}

/**
 * 获取列表
 */
export default function () {
  let post = {}
  let that = this
  // 生成关键词
  if (that.hasOwnProperty('keyword') && Object.keys(that.keyword).length > 0) {
    post = generatePost(deepCopy(that.keyword))
  }
  if (!that.hasOwnProperty('localSearch') || !that.localSearch) {
    store.dispatch('app/startPaging', that.url) // 处理分页，处理分页连续点击
    post = Object.assign(post, { page: this.page, size: this.size })
  }
  apiPost(that.url, post).then((res) => {
    if (res.code === 200) {
      if (that.hasOwnProperty('localSearch') && that.localSearch) {
        if (that.layout === 0) {
          if (that.hasOwnProperty('remote')) that.remote = res.data
          that.list = res.data
        } else {
          that.remote = res.data
          that.search()
        }
      } else {
        store.dispatch('app/endPaging', that.url)
        that.list = res.data
        that.page = res.meta.current_page
        that.total = res.meta.total
      }
    }
  }).catch(() => {})
}
