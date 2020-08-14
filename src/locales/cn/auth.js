export const auth = {
  auth: '权限',
  children: '子权限',
  parent: '所属菜单',
  base: '基础',
  admin: '大后台',
  crm_base: 'CRM基础',
  crm_sale: '收银',
  crm_customer: '客户',
  crm_store: '库存',
  crm_message: '消息',
  crm_secret: '安全',
  // 基础
  Index: '查看',
  Add: '新增',
  Status: '启停用',
  Upload: '上传',
  Import: '导入数据',
  Export: '导出',
  // 大后台
  Recharge: '充值',
  Reload: '重载',
  Create: '创建',
  Git: 'Git',
  Env: '配置',
  Apply: '申请',
  Open: '开通',
  // CRM基础
  Select: '选用',
  Handle: '处理',
  Statistics: '统计',
  Print: '打印',
  Send: '发送',
  Void: '作废',
  // CRM 收银
  Settle: '结算',
  Price: '改价',
  Gift: '赠送',
  Reception: '接待',
  Check: '检测',
  Dispatch: '派工',
  Repair: '维修',
  // CRM 客户
  Password: '重置密码',
  Change: '变更',
  Update: '更新',
  Delay: '延期',
  Withdraw: '取现',
  Give: '赠送',
  Exchange: '兑换',
  // CRM 仓库
  Query: '查询',
  Trace: '去向',
  Trend: '趋势',
  Alert: '预警',
  Chart: '报表',
  // 其他
  Analysis: '分析',
  Signature: '签名',
  Mobile: '查看手机',
  Identity: '查看身份证',
  Cost: '查看成本'
}

export const auth_group = {
  auth_group: '权限组',
  name: '权限组名称',
  placeholder: {
    name: '请填写权限组名称'
  },
  verify: {
    id: {
      required: '权限组ID错误',
      exists: '权限组ID不存在'
    },
    name: {
      required: '请输入权限组名称',
      length_lt: '权限组名称长度不能小于2字符',
      length_gt: '权限组名称长度不能大于30字符'
    },
    rules: {
      length_lt: '至少选择一条权限'
    }
  },
  validator: {
    name: {
      required: 'true',
      length_lt: '2',
      length_gt: '30'
    },
    rules: {
      length_lt: '0'
    }
  }
}

export const employee_rule = {
  employee_rule: '门店权限',
  name: '权限名称',
  type: '权限类型',
  title: '门店权限',
  types: {
    Company: '公司',
    Shop: '门店',
    Goods: '商品',
    Store: '仓库',
    Member: '会员',
    Employee: '员工',
    WeChat: '微信',
    Coupon: '卡券',
    Mall: '商城',
    Bonus: '分红',
    APP: 'APP',
    0: '公司',
    1: '门店',
    2: '商品',
    3: '仓库',
    4: '会员',
    5: '员工',
    6: '微信',
    7: '卡券',
    8: '商城',
    9: '分红',
    10: 'APP'
  },
  placeholder: {
    name: '请填写权限名称'
  },
  verify: {
    id: {
      required: '权限组ID错误',
      exists: '权限组ID不存在'
    },
    rule: {
      required: '请输入权限名称',
      length_lt: '权限名称长度不能小于2字符',
      length_gt: '权限名称长度不能大于30字符',
      unique: '该权限名称已经存在'
    },
    type: {
      required: '请选择权限类型'
    }
  },
  validator: {
    rule: {
      required: 'true',
      length_lt: '2',
      length_gt: '30'
    },
    type: {
      required: 'true'
    }
  }
}

export default {
  auth,
  auth_group,
  employee_rule
}
