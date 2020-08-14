import transform from '../function/transform'
import { isPositiveNumber } from './verify';
import { apiPost, checkCode } from './http'
import { clearAlert, notify } from './message'
import { setField } from './data'
import store from '../../../store'

/**
 * 自动生成弹窗名称
 * @param self
 * @param target
 * @return {string}
 */
export const title = (self, target) => {
  self.$nextTick(() => {
    if (!target) target = 'auth.' + self.$route.name
    if (self.hasOwnProperty('form')) {
      if (self.form.id === '' || self.form.id === 0) self.title = transform('button.add item.space ' + target)
      else self.title = transform('button.edit item.space ' + target)
    } else {
      self.title = transform(target)
    }
  })
  return ''
}

/**
 * 打开弹窗
 * @param self
 * @param target
 */
export const open = (self, target = 'add') => {
  self.$refs[target].dialog = true
}

/**
 * 填充编辑数据
 * @param self
 * @param param
 * @param target
 */
export async function edit(self, param, target = 'add') {
  let dom = self.$refs[target]
  if (param) {
    if (isPositiveNumber(param)) param = { id: param }
    apiPost(dom.info_url, param).then(({ code, data }) => {
      if (checkCode(code)) {
        dom.dialog = true
        dom.$nextTick(() => {
          dom.form = setField(dom.form, data)
        })
      }
    })
  }
}

/**
 * 清空 Form 信息
 * @param self
 * @param target
 */
export const clean = (self, target = 'form') => {
  if (!self.requesting) {
    let form = self.$refs[target]
    form.clearValidate()
    clearAlert()
  }
}

/**
 * 关闭弹窗
 * @param self
 * @param target
 */
export const close = (self, target = 'form') => {
  if (!self.requesting) {
    let form = self.$refs[target]
    clean(self, target)
    form.resetFields()
    self.dialog = false
  }
}

/**
 * 发起请求
 * @param self
 * @param target 需要传参的标示
 * @param close  是否关闭并刷新列表
 */
export const save = async (self, target = 'form', close = true) => {
  self.$refs[target].validate((valid) => {
    if (valid) {
      let url = (self.form.id === 0 || self.form.id === '') ? self.create_url : self.update_url
      store.dispatch('alert/setMark', url)
      apiPost(url, self.form).then(({ code, status, data, message }) => {
        if (checkCode(code)) {
          if (close) {
            self.close()
            self.$emit('refresh')
          } else {
            self.form = self.deepCopy(data)
          }
          notify(message, status)
        }
      })
    } else { return false }
  })
}

/**
 * 获取数据详情
 * @param self
 * @param id
 * @param target
 */
export const initInfo = (self, id, target = 'form') => {
  if (id !== '') {
    apiPost(self.info_url, { id: id }).then((res) => {
      if (res.code === 200) {
        self.dialog = true
        self.$nextTick(() => {
          self[target] = setField(self[target], res.data)
        })
      }
    })
  }
}

export default {
  title,
  open,
  close,
  save,
  initInfo
}
