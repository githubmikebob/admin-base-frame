import Vue from 'vue'
import transform from './function/transform'
import deepCopy from './function/deepCopy'
import extend from './function/extend'
import autoTableHeight from './function/autoTableHeight'
import { apiPost, checkCode } from './common/http'

import storage from './common/storage'
import message from './common/message'
import dialog from './common/dialog'

Vue.prototype.$deepCopy = deepCopy // 数据深拷贝
Vue.prototype.$transform = transform // 语言包转译
Vue.prototype.$extend = extend // 合并对象
Vue.prototype.$autoTableHeight = autoTableHeight // 自动调整表格高度
Vue.prototype.$apiPost = apiPost // 请求接口
Vue.prototype.$checkCode = checkCode // 验证是否成功返回

Vue.prototype.$storage = storage // 注册浏览器的储存数据方法
Vue.prototype.$messages = message // 注册全局消息提醒方法
Vue.prototype.$dialog = dialog // 引入全局表单公用函数
