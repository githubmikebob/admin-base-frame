import Vue from 'vue'
import VueRouter from 'vue-router'
import LAYOUT from '../global/js/function/changeLayout'
/* layout */
import LoginLayout from '../layout/LoginLayout'
/* Router Modules */
import ExampleRoute from './modules/Example'
import weChatRoute from './modules/weChat'

Vue.use(VueRouter)

// 重写路由方法，解决重复路由引起的报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * 基础路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const baseRoutes = [
  {
    path: '/',
    name: 'Login_',
    hidden: true,
    redirect: '/Login',
    component: LoginLayout,
    children: [
      {
        path: 'Login',
        name: 'Login',
        meta: { title: 'Login' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/Login/Login.vue')
      },
      {
        path: 'Forget',
        name: 'Forget',
        meta: { title: 'Forget' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/Forget/Forget.vue')
      }
    ]
  },
  {
    path: '/Home',
    name: 'Home_',
    redirect: '/Home',
    component: LAYOUT,
    children: [
      {
        path: '/Home',
        name: 'Home',
        meta: { title: 'Home', icon: 'fas fa-home', affix: true },
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home/Home.vue')
      }
    ]
  }
]

/**
 * 需要权限的路由
 * @type {Array}
 */
export const asyncRoutes = [
  ...ExampleRoute,
  weChatRoute
]

const createRouter = () => new VueRouter({
  mode: 'history', // 需要开启服务
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
