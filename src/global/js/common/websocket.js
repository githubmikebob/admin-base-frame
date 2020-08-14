import storage from './storage'
import store from '../../../store'
import { MessageBox } from 'element-ui'

import { apiPost } from './http'
import { notify } from './message'
import { toDecimal } from './data'
import { generateRoute, home, loginPage, saveRules, saveToken } from '../../../views/login/login'
import transform from '../function/transform'

const generateIP = () => {
  let host = document.domain
  if (host === 'localhost' || host === 'localhost:8081') {
    // return ip.local
    return ip.master
  } else {
    return ip.master
  }
}
const ip = {
  master: 'socket.kgjsoft.com',
  local: 'socket.crm.com'
}

const socket = {
  master: 'wss://' + generateIP() + ':9501',
  local: 'ws://' + generateIP() + ':9501'
}

const client = { webSocket: '' }

export const connect = () => {
  let host = document.domain
  let url
  let user = storage.get('user')
  if (host === 'localhost' || host === 'localhost:8081') {
    // url = socket.local
    url = socket.master
  } else {
    url = socket.master
  }
  url = url + '?type=admin&username=' + user.username + '&token=' + user.token
  client.webSocket = new WebSocket(url)
  return client.webSocket
}

export const listen = (webSocket) => {
  if ('WebSocket' in window) {
    webSocket.onmessage = function (res) {
      let data = JSON.parse(res.data)
      console.log(data)
      switch (data.type) {
        case 'open':
          open(data)
          break
        case 'notify':
          if (!data.title) data.title = 'title.notify.message'
          notify(data.message, data.style, data.title, true)
          break
        case 'progress':
          progress(data)
          break
        case 'kick_online':
          webSocket.close()
          kickOnline()
          break
        case 'restore_auth':
          restoreAuth()
          break
        case 'HeartBeat':
          heartBeat()
          break
      }
    }
    webSocket.onerror = function (error) {
      console.log(error)
    }
  }
}

/**
 * 心跳机制
 */
export const heartBeat = () => {
  let socket = store.state.socket.socket
  let heart = {
    to: socket.fd,
    type: 'HeartBeat'
  }
  client.webSocket.send(JSON.stringify(heart))
}


/**
 * 断开连接
 */
export const disConnect = () => {
  client.webSocket.close()
}

/**
 * websocket 状态
 * @return {IDBRequestReadyState | number | ActiveX.XmlDocumentReadyState | RTCDataChannelState | MediaStreamTrackState | ActiveX.XslProcessorReadyState | DocumentReadyState | ReadyState}
 */
export const status = () => {
  return client.webSocket.readyState
}

/**
 * 连接后的操作
 * @param data
 */
export const open = (data) => {
  let user = storage.get('user')
  let socket = {
    to: data.info.fd,
    fd: data.info.fd,
    relation_type: 'users',
    client: 'admin',
    type: 'store',
    username: user.username,
    ip: generateIP(),
    port: data.info.server_port,
    remote_ip: data.info.remote_ip,
    status: true
  }
  store.dispatch('socket/setSocket', socket)
  client.webSocket.send(JSON.stringify(socket))
}

/**
 * 重新获取 权限 / 菜单
 */
export const restoreAuth = () => {
  let user = storage.get('user')
  let token = storage.get('token')
  let post = {
    username: user.username,
    refresh: token.refresh_token,
    type: 1
  }
  apiPost('/Login/Refresh', post).then((res) => {
    if (res.code === 200) {
      saveToken(res.data.token)
      saveRules(res.data.rules)
      generateRoute(res.data.menus)
      home()
    }
  })
}


/**
 * 强制下线
 */
export const kickOnline = () => {
  let message = transform('message.off_line_warn')
  let title = transform('title.notify.sweet_tip')
  MessageBox.confirm(message, title, {
    confirmButtonText: transform('button.Confirm'),
    showCancelButton: false,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    showClose: false,
    type: 'warning',
    center: true,
    callback: action => {
      storage.clear()
      store.dispatch('user/logout', socket)
      disConnect()
      loginPage()
    }
  })
}

/**
 * 进度条
 * @param data
 */
export const progress = (data) => {
  let percent = toDecimal(store.state.progress.percent, 2, 1) + toDecimal(data.percent, 2, 1)
  if (percent > 100) percent = 100
  store.commit('progress/SET_PERCENT', toDecimal(percent, 2, 1))
  let info = store.state.progress.info
  switch (data.status) {
    case 2:
      info.push(data.progress)
      store.commit('progress/SET_INFO', info)
      break
    case 3:
      store.commit('progress/COMPLETE')
      break
  }
}
