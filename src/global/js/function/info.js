import { isPositiveNumber } from '../common/verify'
import { apiPost, checkCode } from '../common/http'
import { setField } from '../common/data'

/**
 * 编辑填充数据
 * @param self
 * @param param
 * @param target
 */
export default function (self, param, target = 'form') {
  if (param) {
    if (isPositiveNumber(param)) param = { id: param }
    apiPost(self.info_url, param).then(({ code, data }) => {
      if (checkCode(code)) {
        self.$nextTick(() => {
          self[target] = setField(self[target], data)
        })
      }
    })
  }
}