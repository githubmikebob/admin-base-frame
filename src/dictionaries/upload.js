import { generateBaseFields, lengthRule, requiredRule } from './base'
import extend from '../global/js/function/extend'


export const fields = generateFields() // 字段

export const placeholder = generatePlaceholders() // placeholder

export const locales = generateLocales() // 语言包

export const verify = generateVerify() // 验证返回

/**
 * 前端验证规则
 */
export const validator = {}

/**
 * 生成语言包
 * @returns {{}}
 */
export function generateFields() {
  let base = generateBaseFields(['type', 'price', 'discount', 'status', 'remark', 'created_at', 'updated_at'])
  let upload = {
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
    error: { // 上传文件错误提示
      format: '图片格式错误',
      over_size: '文件大小超过限制',
      over_limit: '文件数量超过限制',
      no_file: '没有检测到上传文件',
      file_invalid: '上传文件不合法',
      save: '文件保存失败'
    }
  }
  return extend(base, upload)
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

export default {
  fields,
  placeholder,
  locales
}