import extend from '../global/js/function/extend';

export const buttons = generateButtons() // 按钮

export function generateButtons() {
  let base = {
    open: '打开',
    close: '关闭',
    search: '搜索',
    refresh: '刷新',
    create: '创建',
    update: '更新',
    new: '新增',
    add: '添加',
    edit: '编辑',
    modify: '修改',
    save: '保存',
    cancel: '取消',
  }
  let login = {
    login: '登录',
    logout: '退出',
    logging: '登录中...',
  }
  let tab = {
    tabs_view: {
      close: '关闭',
      close_others: '关闭其他',
      close_all: '关闭所有',
      refresh: '刷新'
    }
  }
  let system = {
    clear_cache: '清除缓存',
  }
  return extend(base, login, tab, system)
}

export default {
  buttons
}