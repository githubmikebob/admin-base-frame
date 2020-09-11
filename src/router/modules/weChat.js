import LAYOUT from '../../global/js/function/changeLayout'

const weChatRoute = {
  path: '/WeChat',
  name: 'WeChat',
  redirect: '/SetWeChat',
  meta: { icon: 'fab fa-weixin', title: 'WeChat' },
  component: LAYOUT,
  children: [
    {
      path: '/SetWeChat',
      name: 'SetWeChat',
      meta: { icon: 'fab fa-weixin', title: 'SetWeChat' },
      component: () => import('@/views/WeChat/WeChat')
    }
  ]
}

export default weChatRoute
