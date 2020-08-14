import router from './router'
import i18n from './i18n'
import store from './store'
import { MessageBox } from 'element-ui'
import pageTitle from './global/js/function/pageTitle'
// import { connect, disConnect, listen } from './global/js/websocket'

const whiteList = ['/'] // 路由白名单

// 连接 socket
const connectWebsocket = () => {
  // let socket = store.state.socket.socket
  // if (!socket.status) {
  //   let client = connect()
  //   listen(client)
  // }
}

// 断开 socket 链接
const disconnectWebsocket = () => {
  // let socket = store.state.socket.socket
  // if (socket.status) {
  //   disConnect()
  // }
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // set alert mark 设置alert的标示
  if (to.path === '/') await store.dispatch('alert/setMark', to.path)
  // set page title
  document.title = pageTitle(to.name)
  // 判断是否有权限
  let token = store.state.user.token
  let hasToken = (token.access_token !== '' && token.token_expired > new Date() - 1)
  if (hasToken) {
    if (to.path === '/') {
      next({ path: '/Home' })
    } else {
      let permission_routes = store.state.permission.routes
      if (permission_routes.length > 0) {
        next()
      } else {
        let menus = store.state.user.menus
        // 判断权限
        let routes = await store.dispatch('permission/generateRoutes', menus)
        router.addRoutes(routes)
        next({ ...to, replace: true })
      }
      // generate accessible routes map based on roles
      // next({ ...to, replace: true })
    }
  } else {
    await store.dispatch('user/logout')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      await MessageBox.alert(i18n.t('login.expired'), i18n.t('login.expired_title'))
      disconnectWebsocket()
      next(`/?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {
  if (to.path !== '/') connectWebsocket()
})
