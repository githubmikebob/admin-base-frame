import layout from '../../layout/layout'

const systemRouter = {
  path: '/System',
  name: 'System',
  redirect: '/UserMenu',
  meta: { title: 'System', icon: 'fas fa-cogs' },
  component: layout,
  children: [
    {
      path: '/UserMenu',
      name: 'UserMenu',
      meta: { title: 'UserMenu', icon: 'fas fa-bars' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/userMenu/index.vue')
    },
    {
      path: '/UserRule',
      name: 'UserRule',
      meta: { title: 'UserRule', icon: 'fas fa-ruler' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/tab/rule.vue')
    },
    {
      path: '/User',
      name: 'User',
      meta: { title: 'User', icon: 'fas fa-user-friends' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/user/index.vue'),
    },
    {
      path: '/Log',
      name: 'Log',
      meta: { title: 'Log', icon: 'fas fa-journal-whills' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/log/log.vue'),
    }
  ]
}

export default systemRouter
