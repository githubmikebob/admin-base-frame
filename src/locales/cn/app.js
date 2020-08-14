import item from './item'

export const app = {
  title: '',
  technical_support: '技术支持：厦门客管家网络科技有限公司',
  loading_table: '正在加载...'
}

export const login = {
  logout: '退出',
  user_login: '用户登陆',
  expired: '登录过期，请重新登录',
  expired_title: '登录过期',
  account: item.account,
  password: item.password,
  placeholder: {
    account: '请输入用户名',
    password: '请输入密码'
  },
  exiting: '正在退出...'
}

export const user = {
  verify: {
    username: {
      required: '请输入用户名',
      exists: '用户名或密码错误'
    },
    password: {
      required: '请输入密码',
      length_lt: '密码长度不能小于 6 位',
      error: '用户名或密码错误'
    }
  },
  validator: {
    username: {
      required: 'true'
    },
    password: {
      required: 'true',
      length_lt: '5'
    }
  },
  error: {
    no_exists: '用户不存在 或 密码错误'
  }
}

export default {
  app,
  login,
  user
}
