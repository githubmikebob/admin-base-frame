import layout from '../../layout/layout'

const smsRouter = {
  path: '/Sms',
  name: 'Sms',
  redirect: '/SmsAccount',
  component: layout,
  meta: { title: 'Sms', icon: 'far fa-comment-alt' },
  children: [
    {
      path: '/SmsAccount',
      name: 'SmsAccount',
      meta: { title: 'SmsAccount', icon: 'fas fa-key' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/smsAccount/smsAccount.vue'),
    },
    {
      path: '/SmsTemplate',
      name: 'SmsTemplate',
      meta: { title: 'SmsTemplate', icon: 'fas fa-file' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/smsTemplate/smsTemplate.vue'),
    },
    {
      path: '/SmsRecord',
      name: 'SmsRecord',
      meta: { title: 'SmsRecord', icon: 'fab fa-react' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/smsTemplate/smsTemplate.vue'),
    },
    {
      path: '/SmsStatistics',
      name: 'SmsStatistics',
      meta: { title: 'SmsStatistics', icon: 'fas fa-chart-pie' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/smsTemplate/smsTemplate.vue'),
    },
    {
      path: '/SmsPlatformRecords',
      name: 'SmsPlatformRecords',
      meta: { title: 'SmsPlatformRecords', icon: 'fas fa-chart-pie' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/smsPlatformRecords/smsPlatformRecords.vue'),
    },
    {
      path: '/SmsRecords',
      name: 'SmsRecords',
      meta: { title: 'SmsRecords', icon: 'fas fa-users' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/smsRecords/smsRecords.vue'),
    }
  ]
}

export default smsRouter
