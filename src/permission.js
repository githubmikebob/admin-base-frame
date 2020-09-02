import store from './store'
import router from './router'
import { MessageBox } from 'element-ui'
import pageTitle from './global/js/function/pageTitle'
import transform from './global/js/function/transform'

const whiteList = ['/Login'] // 路由白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // set alert mark 设置alert的标示
  if (to.path === '/') await store.dispatch('alert/setMark', to.path)
  // set page title
  document.title = pageTitle(to.name)
  // 判断是否有权限
  let hasToken = await store.dispatch('user/hasToken')
  if (hasToken) {
    if (to.path === '/Login') {
      next({ path: '/Home' })
    } else {
      // await store.dispatch('user/autoLogin')
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
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      await MessageBox.alert(transform('login.expired'), transform('login.expired_title'))
      next(`/?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {

})
