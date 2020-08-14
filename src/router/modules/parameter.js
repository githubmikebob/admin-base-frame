import layout from '../../layout/layout'

const parameterRouter = {
  path: '/Parameter',
  name: 'Parameter',
  redirect: '/Unit',
  component: layout,
  meta: { title: 'Parameter', icon: 'fas fa-cog' },
  children: [
    {
      path: '/Unit',
      name: 'Unit',
      meta: { title: 'Unit', icon: 'fas fa-sort-numeric-up' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/unit/index.vue'),
    },
    {
      path: '/District',
      name: 'District',
      meta: { title: 'District', icon: 'fas fa-globe' }
      // component: () => import(/* webpackChunkName: "about" */ '@/views/district/district.vue'),
    },
    {
      path: '/Plate',
      name: 'Plate',
      meta: { title: 'Plate', icon: 'fas fa-list' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/plate/index.vue'),
    },
    {
      path: '/CarBrand',
      name: 'CarBrand',
      meta: { title: 'CarBrand', icon: 'fas fa-cube' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/carBrand/index.vue'),
    },
    {
      path: '/CarType',
      name: 'CarType',
      meta: { title: 'CarType', icon: 'fas fa-car' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/carType/index.vue'),
    },
    {
      path: '/CarModel',
      name: 'CarModel',
      meta: { title: 'CarModel', icon: 'fab fa-yelp' },
      component: () => import(/* webpackChunkName: "about" */ '@/views/carModel/index.vue'),
    }
  ]
}

export default parameterRouter
