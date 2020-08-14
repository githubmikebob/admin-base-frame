import item from './item'

const company = {
  company: '公司',
  name: '公司名称',
  site: '站点',
  contact: item.contact,
  mobile: item.mobile,
  district: item.district,
  address: item.address,
  placeholder: {
    name: '请填写公司名称'
  },
  verify: {
    database_id: {
      required: '数据库错误'
    },
    name: {
      required: '请填写公司名称',
      unique: '公司名称已存在'
    },
    province_id: {
      required: '请选择所在省份'
    },
    city_id: {
      required: '请选择所在城市'
    },
    address: {
      required: '请填写详细地址'
    },
    contact: {
      required: '请填写联系人'
    },
    contact_mobile: {
      required: '请填写联系电话',
      unique: '联系电话已存在'
    }
  },
  validator: {
    name: {
      required: 'true'
    },
    address: {
      required: 'true'
    },
    contact: {
      required: 'true'
    },
    contact_mobile: {
      required: 'true'
    }
  }
}

const shop = {
  shop: '门店',
  name: '门店名称',
  shopList: '门店列表',
  company_id: '公司ID',
  expired_at: '到期时间',
  contact: item.contact,
  mobile: item.mobile,
  district: item.district,
  address: item.address,
  power: '权限',
  shopPower: '门店权限',
  placeholder: {
    name: '请填写门店名称'
  },
  verify: {
    name: {
      required: '请填写门店名称',
      unique: '门店名称已存在'
    },
    province_id: {
      required: '请选择所在省份'
    },
    city_id: {
      required: '请选择所在城市'
    },
    address: {
      required: '请填写详细地址'
    },
    contact: {
      required: '请填写联系人'
    },
    contact_mobile: {
      required: '请填写联系电话',
    }
  },
  validator: {
    name: {
      required: 'true'
    },
    address: {
      required: 'true'
    },
    contact: {
      required: 'true'
    },
    contact_mobile: {
      required: 'true'
    }
  }
}

export default {
  company, shop
}
