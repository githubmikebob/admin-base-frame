import { generateBaseFields, lengthRule, requiredRule } from './base'
import extend from '../../global/js/function/extend'

export const fields = generateFields() // 字段

export const placeholder = generatePlaceholders() // placeholder

export const locales = generateLocales() // 语言包

export const verify = generateVerify() // 验证返回

/**
 * 前端验证规则
 */
export const validator = {
  name: {
    required: 'true',
    length_gt: '60'
  },
  url: {
    required: 'true',
    length_gt: '60'
  },
  remark: {
    length_gt: '120'
  }
}

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateFields() {
  let base = generateBaseFields(['type', 'price', 'discount', 'status', 'remark', 'created_at', 'updated_at'])
  let share = {
    we_chat_template: '微信模板',
    share: '分享模版',
    id: '模版ID',
    name: '模版名称',
    url: '模版标识',
    free: '是否免费',
    logo: '分享图片',
    small: '消息图片',
    image: '预览图片',
    types: {
      1: '优惠',
      2: '礼包',
      3: '积客'
    },
  }
  return extend(base, share)
}

/**
 * 生成 Placeholder
 * @returns {{}}
 */
export function generatePlaceholders() {
  return generateFields()
}

/**
 * 生成验证规则
 */
export function generateVerify() {
  return {
    name: {
      required: requiredRule(fields.name),
      length_gt: lengthRule(fields.name, 60)
    },
    url: {
      required: requiredRule(fields.url),
      length_gt: lengthRule(fields.url, 60)
    },
    remark: {
      length_gt: lengthRule(fields.remark, 120)
    }
  }
}

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateLocales() {
  let share = generateFields()
  share.placeholder = placeholder
  share.validator = validator
  share.verify = verify
  return share
}

/**
 * 处理菜单数据
 * @param share
 * @param top
 */
export const share = (share, top = true) => {
  if (top) {
    return share
  } else {
    if (share.hasOwnProperty('share')) return share.share
  }
}

export default {
  fields,
  placeholder,
  locales
}
