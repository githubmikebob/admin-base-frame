import layout from '../../layout/layout'

const weChatRouter = {
  path: '/WeChat',
  name: 'WeChat',
  redirect: '/WeChatAccount',
  component: layout,
  meta: { title: 'WeChat', icon: 'fab fa-weixin' },
  children: [
    {
      path: '/WeChatAccount',
      name: 'WeChatAccount',
      meta: { title: 'WeChatAccount', icon: 'fas fa-key' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/WeChatAccount/index.vue'),
    },
    {
      path: '/WeChatTemplate',
      name: 'WeChatTemplate',
      meta: { title: 'WeChatTemplate', icon: 'fas fa-file' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/weChatTemplate/weChatTemplate.vue'),
    },
    {
      path: '/WeChatShare',
      name: 'WeChatShare',
      meta: { title: 'WeChatShare', icon: 'fas fa-share-alt' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/wechatShare/wechatShare.vue'),
    },
    {
      path: '/WeChatStatistics',
      name: 'WeChatStatistics',
      meta: { title: 'WeChatStatistics', icon: 'fas fa-chart-pie' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/staticsWeChatChart/staticsWeChatChart.vue'),
    }
  ]
}

export default weChatRouter
