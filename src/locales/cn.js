import base from './dictionaries/base' // 基础词典
import login from './dictionaries/login'
import forget from './dictionaries/forget'
import button from './dictionaries/button';
import search from './dictionaries/search';
import message from './dictionaries/message';
import menu from './dictionaries/menu'
import upload from './dictionaries/upload'

export default {
  base: base.locales,
  login: login.locales,
  forget: forget.locales,
  menu: menu.locales,
  upload: upload.locales,
  button: button.buttons,
  search: search.locales,
  success: message.success,
}
