import layout from '../../layout/layout'

const appRouter = {
  path: '/App',
  name: 'App',
  redirect: '/PrintTemplate',
  component: layout,
  meta: { title: 'App', icon: 'fab fa-angular' },
  children: [
  ]
}

export default appRouter
