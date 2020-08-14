import { Message, Loading, Notification, MessageBox } from 'element-ui'
import transform from '../function/transform'
import store from '../../../store'

/**
 * 消息提示
 * @param message
 * @param type
 */
export const message = (message, type = 'error') => {
  Message({
    showClose: true,
    message: transform(message),
    type: type
  })
}

/**
 * 加载动画
 * @param text
 * @returns {ElLoadingComponent}
 */
export const load = (text = 'button.loading') => {
  return Loading.service({
    lock: true,
    body: true,
    text: transform(text),
    background: 'rgba(255, 255, 255, 0.3)'
  })
}

/**
 * 通知
 * @param message
 * @param type
 * @param title
 * @param html
 */
export const notify = (message, type = 'error', title = 'title.notify.operation', html = false) => {
  if (!html) message = transform(message)
  Notification({
    title: transform(title),
    dangerouslyUseHTMLString: html,
    message: message,
    type: type,
    showClose: true,
    offset: 30,
    duration: 3000
  })
}

/**
 * 消息弹框
 * @param message
 * @param title
 */
export const alertBox = (message, title = 'title.notify.sweet_tip') => {
  MessageBox.alert(transform(message), transform(title), {
    confirmButtonText: transform('button.confirm'),
    callback: action => {
    }
  })
}

/**
 * 清除页面内提示
 */
export const clearAlert = () => {
  store.dispatch('alert/clearAlert')
}

/**
 * 页面内 错误 / 警告提示
 * @param message
 * @param type
 */
export const alert = (message, type) => {
  clearAlert()
  store.dispatch('alert/showAlert', message, type)
}

/**
 * 处理返回信息的展现方式
 * @param response
 */
export const handleResponse = (response) => {
  if (response.hasOwnProperty('message')) {
    switch (response.message_case) {
      case 'box':
        alertBox(response.message, response.message_type)
        return
      case 'notify':
        return notify(response.message, response.message_type)
      case 'message':
        return message(response.message, response.message_type)
      default:
        return message(response.message, response.message_type)
    }
  }
}

/**
 * 根据返回结果，展现返回消息
 * @param response
 * @param type
 * @return {void|(undefined|void)}
 */
export const responseRoute = (response, type = 1) => {
  switch (response.code) {
    case 200:
      break
    case 201:
      break
    case 400:
      return handleResponse(response)
    case 401:
      break
    case 403:
      break
    case 404:
      if (response.hasOwnProperty('message')) return message(response.message, type)
      break
    case 422:
      if (response.hasOwnProperty('errors') && response.hasOwnProperty('message')) {
        return alert(response.errors[0], response.status)
      }
      break
  }
}

export const errorResponse = (error) => {
  let response = {}
  if (error.hasOwnProperty('response')) {
    response = error.response.data
    response.status = 'error'
    if (!response.hasOwnProperty('code')) response.code = error.response.status
    if (response.message === '') response.message = 'error.network'
    if (!response.hasOwnProperty('message_case')) response.message_case = 'message'
    if (!response.hasOwnProperty('message_type')) response.message_type = 'error'
  } else {
    response.message = 'error.network'
    response.message_case = 'message'
    response.message_type = 'error'
    response.code = 404
    response.status = 'error'
  }
  responseRoute(response, 'error')
}

export default {
  message,
  load,
  alertBox,
  notify,
  alert,
  clearAlert,
  responseRoute,
  errorResponse
}
