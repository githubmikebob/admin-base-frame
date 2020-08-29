import app from './cn/app'
import message from './cn/message'
// import menu from './cn/menu'
import item from './cn/item'
import title from './cn/title'
import search from './cn/search'
import customer from './cn/customer'
import auth from './cn/auth'
import print from './cn/print'
import users from './cn/users'
import parameter from './cn/parameter'
import weChat from './cn/weChat'
import sms from './cn/sms'

import base from '../dictionaries/base' // 基础词典
import button from '../dictionaries/button';
import menu from '../dictionaries/menu'
import we_chat_share from '../dictionaries/we_chat_share'
import server from '../dictionaries/server'
import upload from '../dictionaries/upload'
import user_menu from '../dictionaries/user_menu'
import user_rule from '../dictionaries/user_rule'
import user_group from '../dictionaries/user_group'
import employee_rule from '../dictionaries/employee_rule'

export default {
  app: app.app,
  base: base.locales,
  button: button.buttons,
  menu: menu.locales,
  upload: upload.locales,
  login: app.login,
  user: app.user,
  success: message.success,
  error: message.error,
  warning: message.warning,
  confirm: message.confirm,
  item: item,
  // menu: menu.menu,
  // menuTab: menu.menuTab,
  employee_rule: employee_rule.locales,
  title: title,
  search: search,
  // 客户管理
  company: customer.company,
  shop: customer.shop,
  // 微信管理
  we_chat_template: weChat.we_chat_template,
  we_chat_share: we_chat_share.locales,
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
  server: server.locales,
  site: server.sites,
  git: server.git,
  // 系统设置
  user_menu: user_menu.locales,
  user_rule: user_rule.locales,
  user_group: user_group.locales
}
