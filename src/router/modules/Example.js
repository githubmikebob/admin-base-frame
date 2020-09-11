import LAYOUT from '../../global/js/function/changeLayout'

const ExampleRoute = [
  {
    path: '/Cashier',
    name: 'Cashier_index',
    redirect: '/Cashier/Addition',
    meta: { icon: 'fab fa-weixin', title: 'Cashier' },
    alwaysShow: true, // 总是显示一级菜单
    component: LAYOUT,
    children: [
      {
        path: '/Cashier',
        name: 'Cashier',
        meta: { icon: 'fab fa-weixin', title: 'Cashier' },
        component: () => import('@/views/WeChat/WeChat')
      },
      {
        path: '/Addition',
        name: 'Addition',
        meta: { icon: 'fab fa-weixin', title: 'Addition' },
        component: () => import('@/views/WeChat/WeChat')
      },
      {
        path: '/Purchase',
        name: 'Purchase',
        meta: { icon: 'fab fa-weixin', title: 'Purchase' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Profession',
    name: 'Profession_index',
    redirect: '/Profession',
    meta: { icon: 'fab fa-weixin', title: 'Profession' },
    component: LAYOUT,
    children: [
      {
        path: '/Profession',
        name: 'Profession',
        meta: { icon: 'fab fa-weixin', title: 'Profession' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Sale',
    name: 'Sale_index',
    redirect: '/Sale',
    meta: { icon: 'fab fa-weixin', title: 'Sale' },
    component: LAYOUT,
    children: [
      {
        path: '/Sale',
        name: 'Sale',
        meta: { icon: 'fab fa-weixin', title: 'Sale' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Reception',
    name: 'Reception_index',
    redirect: '/Reception',
    meta: { icon: 'fab fa-weixin', title: 'Reception' },
    component: LAYOUT,
    children: [
      {
        path: '/Reception',
        name: 'Reception',
        meta: { icon: 'fab fa-weixin', title: 'Reception' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Examine',
    name: 'Examine_index',
    redirect: '/Examine',
    meta: { icon: 'fab fa-weixin', title: 'Examine' },
    component: LAYOUT,
    children: [
      {
        path: '/Examine',
        name: 'Examine',
        meta: { icon: 'fab fa-weixin', title: 'Examine' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Repair',
    name: 'Repair_index',
    redirect: '/Repair',
    meta: { icon: 'fab fa-weixin', title: 'Repair' },
    component: LAYOUT,
    children: [
      {
        path: '/Repair',
        name: 'Repair',
        meta: { icon: 'fab fa-weixin', title: 'Repair' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Quality',
    name: 'Quality_index',
    redirect: '/Sale',
    meta: { icon: 'fab fa-weixin', title: 'Quality' },
    component: LAYOUT,
    children: [
      {
        path: '/Quality',
        name: 'Quality',
        meta: { icon: 'fab fa-weixin', title: 'Quality' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/OrderSale',
    name: 'OrderSale_index',
    redirect: '/OrderSale',
    meta: { icon: 'fab fa-weixin', title: 'OrderSale' },
    component: LAYOUT,
    children: [
      {
        path: '/OrderSale',
        name: 'OrderSale',
        meta: { icon: 'fab fa-weixin', title: 'OrderSale' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Electronics',
    name: 'Electronics_index',
    redirect: '/Electronics',
    meta: { icon: 'fab fa-weixin', title: 'Electronics' },
    component: LAYOUT,
    children: [
      {
        path: '/Electronics',
        name: 'Electronics',
        meta: { icon: 'fab fa-weixin', title: 'Electronics' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/Board',
    name: 'Board_index',
    redirect: '/Reception',
    meta: { icon: 'fab fa-weixin', title: 'Board' },
    component: LAYOUT,
    children: [
      {
        path: '/Board',
        name: 'Board',
        meta: { icon: 'fab fa-weixin', title: 'Board' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
  {
    path: '/CustomerDeposit',
    name: 'CustomerDeposit_index',
    redirect: '/Sale',
    meta: { icon: 'fab fa-weixin', title: 'Customer' },
    component: LAYOUT,
    children: [
      {
        path: '/CustomerDeposit',
        name: 'CustomerDeposit',
        meta: { icon: 'fab fa-weixin', title: 'CustomerDepositCustomerDepositCustomerDepositCustomerDepositCustomerDeposit' },
        component: () => import('@/views/WeChat/WeChat')
      }
    ]
  },
]

export default ExampleRoute
