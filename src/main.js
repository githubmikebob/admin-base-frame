import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './permission' // 路由权限控制
import './plugins/element.js' //  引入常用elementUI组件
import './global/css/element-variables.scss'
import './global/css/index.scss' // global css

import './global/js/global.js' // 引入全局扩展方法

import './components/components' // // 引入全局注册组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
