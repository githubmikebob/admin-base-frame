import layout from '../../layout/layout'

const publicRouter = {
  path: '/Common',
  name: 'Common',
  redirect: '/Notice',
  component: layout,
  meta: { title: 'Common', icon: 'fab fa-angular' },
  children: [
    {
      path: '/Notice',
      name: 'Notice',
      meta: { title: 'Notice', icon: 'fas fa-circle-notch' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/notice/notice.vue'),
    },
    {
      path: '/PrintTemplate',
      name: 'PrintTemplate',
      meta: { title: 'PrintTemplate', icon: 'fas fa-print' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/print/index.vue'),
    }
  ]
}

export default publicRouter
