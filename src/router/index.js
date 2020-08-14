import Vue from 'vue'
import VueRouter from 'vue-router'
/* layout */
import layout from '../layout/layout'
/* Router Modules */
import customerRouter from './modules/customer'
import weChatRouter from './modules/weChat'
import smsRouter from './modules/sms'
import appRouter from './modules/app'
import publicRouter from './modules/public'
import parameterRouter from './modules/parameter'
import serverRouter from './modules/server'
import systemRouter from './modules/system'

Vue.use(VueRouter)

/**
 * 基础路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const baseRoutes = [
  {
    path: '/Redirect',
    name: 'Redirect',
    meta: { title: 'Redirect', icon: 'fas fa-home' },
    hidden: true,
    component: layout,
    children: [
      {
        path: '/redirect/:path*',
        meta: { title: 'Redirect', icon: 'fas fa-home' }
        // component: () => import('@/views/redirect/redirect.vue'),
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    hidden: true,
    meta: { title: '登录', icon: 'fas fa-home' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  },
  {
    path: '/Home',
    name: 'Home_',
    redirect: '/Home',
    component: layout,
    children: [
      {
        path: '/Home',
        name: 'Home',
        meta: { title: '首页', icon: 'fas fa-home', affix: true },
        component: () => import(/* webpackChunkName: "about" */ '@/views/home/home.vue')
      }
    ]
  }
]

/**
 * 需要权限的路由
 * @type {Array}
 */
export const asyncRoutes = [
  customerRouter,
  weChatRouter,
  smsRouter,
  publicRouter,
  appRouter,
  parameterRouter,
  serverRouter,
  systemRouter
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

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router
