export default function () {
  let length = arguments.length
  let target = arguments[0] || {}
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }
  let i = 1
  if (length === 1) {
    target = this
    i--
  }
  for (i; i < length; i++) {
    let source = arguments[i]
    for (let key in source) {
      // 使用for in会遍历数组所有的可枚举属性，包括原型。
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}
