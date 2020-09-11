import base from './dictionaries/base' // 基础词典
import login from './dictionaries/login'
import forget from './dictionaries/forget'
import button from './dictionaries/button';
import message from './dictionaries/message';
import menu from './dictionaries/menu'
import we_chat_share from './dictionaries/we_chat_share'
import upload from './dictionaries/upload'
import user_menu from './dictionaries/user_menu'
import user_rule from './dictionaries/user_rule'
import user_group from './dictionaries/user_group'
import employee_rule from './dictionaries/employee_rule'

export default {
  base: base.locales,
  login: login.locales,
  forget: forget.locales,
  menu: menu.locales,
  upload: upload.locales,
  employee_rule: employee_rule.locales,
  button: button.buttons,
  success: message.success,
  // 微信管理
  we_chat_share: we_chat_share.locales,
  // 系统设置
  user_menu: user_menu.locales,
  user_rule: user_rule.locales,
  user_group: user_group.locales
}
