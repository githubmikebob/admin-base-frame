import layout from '../../layout/layout'

const customerRouter = {
  path: '/Customer',
  name: 'Customer',
  redirect: '/Customers',
  component: layout,
  meta: { title: '客户管理', icon: 'fas fa-users', auth: 'Customer' },
  children: [
    {
      path: '/Customer',
      name: 'Customer',
      meta: { title: '客户管理', icon: 'fas fa-key', auth: 'Customer' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/Customers/Customers.vue'),
    },
    {
      path: '/Company',
      name: 'Company',
      meta: { title: '公司列表', icon: 'fas fa-building', auth: 'Company' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/company/index.vue')
    },
    {
      path: '/Shop',
      name: 'Shop',
      meta: { title: '门店列表', icon: 'fas fa-store', auth: 'Shop' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/shop/index.vue'),
    },
    {
      path: '/Customers',
      name: 'Customers',
      meta: { title: '账号列表', icon: 'fas fa-users', auth: 'Customers' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/customers/index.vue'),
    },
    {
      path: '/Certs',
      name: 'Certs',
      meta: { title: 'Certs', icon: 'fas fa-id-card' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/certs/certs.vue'),
    },
    {
      path: '/Menu',
      name: 'Menu',
      meta: { title: '用户菜单', icon: 'fas fa-bars', auth: 'Menu' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/menu/index.vue')
    },
    {
      path: '/EmployeeRule',
      name: 'EmployeeRule',
      meta: { title: '权限列表', icon: 'fas fa-ruler' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/employeeRule/index.vue')
    }
  ]
}

export default customerRouter
