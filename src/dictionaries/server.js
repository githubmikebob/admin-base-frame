import { generateBaseFields, requiredRule } from './base'
import extend from '../global/js/function/extend'

/**
 * 数据库 字段
 */
export const fields = generateFields()

/**
 * Placeholder
 */
export const placeholder = generatePlaceholders()

/**
 * API 返回的 422 处理
 */
export const verify = generateVerify()

/**
 * 前端验证规则
 */
export const validator = {
  name: {
    required: 'true'
  },
  ip: {
    required: 'true'
  },
  site: {
    required: 'true'
  }
}

/**
 * 特殊报错 处理
 */
export const error = generateError()

/**
 * 语言包
 */
export const locales = generateLocales()

/**
 * 生成语言包
 */
export function generateLocales() {
  let server = generateFields()
  server.placeholder = placeholder
  server.validator = validator
  server.verify = verify
  return server
}

/**
 * 生成语言包
 */
export function generateFields() {
  let base = generateBaseFields(['status', 'remark', 'created_at', 'updated_at'])
  let server = {
    server: '服务器',
    name: '服务器名称',
    ip: 'IP地址',
    port: '端口',
    ssh_user: '远程用户',
    ssh_pass: '远程密码',
    ssh_port: '远程端口',
    mysql_user: '数据库用户',
    mysql_pass: '数据库密码',
    mysql_port: '数据库端口',
    site: '站点路径',
    git: 'Git 路径'
  }
  return extend(base, server)
}

/**
 * 生成 placeholder
 * @returns {{}}
 */
export function generatePlaceholders() {
  let fields = generateFields()
  let placeholder = {
    name: '请填写服务器名称'
  }
  return extend(fields, placeholder)
}

/**
 * 生成验证规则
 */
export function generateVerify() {
  return {
    name: {
      required: requiredRule(fields.name),
    },
    ip: {
      required: requiredRule(fields.ip),
    },
    site: {
      required: requiredRule(fields.site),
    }
  }
}

export function generateError() {
  return {}
}

export default {
  fields,
  placeholder,
  locales
}
