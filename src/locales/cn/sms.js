const sms_template = {
  sms_template: '短信模板',
  category: '模板类型',
  name: '模板名称',
  code: '模板编号',
  content: '模板内容',
  example: '模板示例',
  index: '索引',
  verify: {
    name: {
      // required: '请填写公司名称',
      // unique: '公司名称已存在'
    }
  },
  validator: {
    name: {
      // required: 'true'
    }
  }
}

export default {
  sms_template
}
