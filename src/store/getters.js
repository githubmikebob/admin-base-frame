const getters = {
  device: state => state.app.device,
  language: state => state.app.language,
  login: state => state.user.login,
  menus: state => state.user.menus,
  sidebar: state => state.app.sidebar,
  alert_mark: state => state.alert.mark,
  alert: state => state.alert.alert,
  size: state => state.app.size,
  requesting: state => state.app.requesting,
  visitedViews: state => state.tabsView.visitedViews,
  cachedViews: state => state.tabsView.cachedViews,
  permission_routes: state => state.permission.routes,
  socket: state => state.socket.socket
}

export default getters
