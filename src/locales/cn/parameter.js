const unit = {
  unit: '单位',
  typeName: '分类类型',
  type: {
    1: '服务项目',
    2: '配件',
    3: '附加项'
  },
  name: '单位名称',
  en_name: '英语单位',
  description: '描述',
};

const plate = {
  plate: '车牌',
  sort: '排序',
  name: '地域简称',
  letter: '地市代码',
  verify: {
    letter: {
      required: '请填写地市代码',
    },
    name: {
      required: '请填写地区简称',
    },
    remark: {
      required: '请填写备注信息',
    }
  },
  validator: {
    letter: {
      required: 'true'
    },
    name: {
      required: 'true',
    },
    remark: {
      required: 'true'
    }
  }
};

const carBrand = {
  carBrand: '品牌',
  letter: '首字母',
  name: '品牌名称',
  verify: {
    name: {
      required: '请填写品牌名称',
    },
    letter: {
      required: '请填写品牌大写首字母',
    },
  },
  validator: {
    name: {
      required: 'true',
    },
    letter: {
      required: 'true',
    },
  }
};

const carType = {
  carType: '车系',
  letter: '首字母',
  name: '车系',
  verify: {
    name: {
      required: '请写填车系名称',
    },
  },
  validator: {
    name: {
      required: 'true',
    },
  }
};

const carModel = {
  carModel: '车型',
  letter: '首字母',
  name: '车型',
  verify: {
    name: {
      required: '请写填车型',
    }
  },
  validator: {
    name: {
      required: 'true',
    }
  }
};

export default {
  plate, carBrand, carType, carModel, unit
}
