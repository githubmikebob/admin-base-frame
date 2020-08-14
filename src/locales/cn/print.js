export const print = {
  print: '打印模板',
  type: '模板类型',
  name: '模板名称',
  url: 'Url 地址',
  default: '默认模板',
  yes: '是',
  no: '否',
  verify: {
    type: {
      required: '请选择模板类型',
    },
    name: {
      required: '请填写模板名称',
    },
  },
  validator: {
    type: {
      required: 'true'
    },
    name: {
      required: 'true',
    },
  }
};

export default print
