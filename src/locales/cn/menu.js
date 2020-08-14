export const menu = {
  Login: '登录',
  Home: '首页',
  // 客户管理
  Customer: '客户管理',
  Company: '公司列表',
  Shop: '门店列表',
  Customers: '用户列表',
  Cars: '车辆列表',
  Certs: '认证管理',
  Menu: '菜单管理',
  EmployeeRule: '权限管理',
  // 微信管理
  WeChat: '微信管理',
  WeChatAccount: '微信账号',
  WeChatTemplate: '微信模版',
  WeChatShare: '分享模版',
  WeChatStatistics: '微信统计',
  // 短信管理
  Sms: '短信管理',
  SmsAccount: '短信账号',
  SmsTemplate: '短信模版',
  SmsRecord: '短信记录',
  SmsStatistics: '短信统计',
  SmsPlatformRecords: '平台流量',
  SmsRecords: '客户流量',
  // APP管理
  App: 'App管理',
  // 公共功能
  Common: '公共功能',
  Notice: '公告管理',
  PrintTemplate: '打印模版',
  // 参数管理
  Parameter: '参数管理',
  Unit: '计量单位',
  District: '地域管理',
  Plate: '车牌管理',
  CarBrand: '车辆品牌',
  CarType: '车辆车系',
  CarModel: '车辆车型',
  // 服务管理
  Server: '运维管理',
  Servers: '服务器',
  Database: '数据库',
  Site: '站点',
  Git: 'Git',
  Queue: '队列',
  Socket: '通讯',
  // 系统设置
  System: '系统设置',
  UserMenu: '菜单管理',
  UserRule: '权限管理',
  User: '用户管理',
  Log: '日志管理',
  // 菜单属性
  title: '菜单',
  name: '菜单名称',
  nameEn: '菜单英文名称',
  parent: '所属菜单',
  created_at: '创建时间',
  placeholder: {
    name: '请填写菜单名称',
    nameEn: '请填写菜单英文名称'
  },
  verify: {
    title: {
      required: '请填写菜单名称',
      length_gt: '文字长度不能超过60个字符'
    },
    name: {
      required: '请填写菜单英文名称',
      length_gt: '文字长度不能超过60个字符'
    }
  },
  validator: {
    title: {
      required: 'true',
      length_gt: '60'
    },
    name: {
      required: 'true',
      length_gt: '60'
    }
  }
}

export const menuTab = {
  Auth: {
    auth: '权限管理',
    auth_group: '权限组管理',
    auth_shop: '门店权限'
  }
}

export default {
  menu,
  menuTab
}
