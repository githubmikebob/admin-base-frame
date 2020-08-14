import app from './cn/app'
import message from './cn/message'
// import menu from './cn/menu'
import menu from '../dictionaries/menu'
import employee_rule from '../dictionaries/employee_rule';
import item from './cn/item'
import title from './cn/title'
import button from './cn/button'
import search from './cn/search'
import customer from './cn/customer'
import auth from './cn/auth'
import print from './cn/print'
import users from './cn/users'
import parameter from './cn/parameter'
import server from './cn/server'
import weChat from './cn/weChat'
import sms from './cn/sms'

export default {
  app: app.app,
  login: app.login,
  user: app.user,
  success: message.success,
  error: message.error,
  warning: message.warning,
  confirm: message.confirm,
  item: item,
  menu: menu.locales,
  // menu: menu.menu,
  // menuTab: menu.menuTab,
  employee_rule: employee_rule.locales,
  title: title,
  button: button,
  search: search,
  // 客户管理
  company: customer.company,
  shop: customer.shop,
  // 微信管理
  we_chat_template: weChat.we_chat_template,
  // 短信管理
  sms_template: sms.sms_template,
  // 系统设置
  auth: auth.auth,
  auth_group: auth.auth_group,
  users: users,
  // 公共功能
  print: print,
  // 参数管理
  unit: parameter.unit,
  plate: parameter.plate,
  carBrand: parameter.carBrand,
  carType: parameter.carType,
  carModel: parameter.carModel,
  // 运维管理
  servers: server.servers,
  sites: server.sites,
  git: server.git,
}
