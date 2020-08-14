import layout from '../../layout/layout'

const serverRouter = {
  path: '/Server',
  name: 'Server',
  redirect: '/Servers',
  meta: { title: 'Server', icon: 'fas fa-link' },
  component: layout,
  children: [
    {
      path: '/Servers',
      name: 'Servers',
      meta: { title: 'Servers', icon: 'fas fa-server' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/servers/index.vue')
    },
    {
      path: '/Database',
      name: 'Database',
      meta: { title: 'Database', icon: 'fas fa-database' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/tab/test.vue')
    },
    {
      path: '/Site',
      name: 'Site',
      meta: { title: 'Site', icon: 'fas fa-sitemap' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/site/index.vue'),
    },
    {
      path: '/Git',
      name: 'Git',
      meta: { title: 'Git', icon: 'fab fa-github-alt' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/git/index.vue'),
    },
    {
      path: '/Queue',
      name: 'Queue',
      meta: { title: 'Queue', icon: 'fas fa-list-ol' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/log/log.vue'),
    },
    {
      path: '/Socket',
      name: 'Socket',
      meta: { title: 'Socket', icon: 'fas fa-broadcast-tower' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/log/log.vue'),
    }
  ]
}

export default serverRouter
