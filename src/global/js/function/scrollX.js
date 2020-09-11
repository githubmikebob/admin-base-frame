
export function onmousewheel(dom, event) {
  // 计算鼠标滚轮滚动的距离
  // 一格3行，每行40像素
  let v = event.wheelDelta / 2
  dom.scrollLeft += v
  // 阻止浏览器默认方法
  return false
}

export function mousewheel(dom, event) {
  // 计算鼠标滚轮滚动的距离
  let v = -event.wheelDelta / 2
  dom.scrollLeft += v
  // 阻止浏览器默认方法
  event.preventDefault()
}

export function DOMMouseScroll(dom, event) {
  // 计算鼠标滚轮滚动的距离
  // 一格是3行，但是要注意，这里和像素不同的是它是负值
  dom.scrollLeft += event.detail * 80;
  // 阻止浏览器默认方法
  event.preventDefault();
}

const scrollX = (dom) => {
  let fun
  // 判断浏览器
  let isIE = navigator.userAgent.match(/MSIE (\d)/i)
  isIE = isIE ? isIE[1] : null
  let isFF = /FireFox/i.test(navigator.userAgent)
  if (isIE && isIE < 9) { // 传统浏览器使用MouseWheel事件
    fun = dom.attachEvent('onmousewheel', onmousewheel.bind(this, dom))
  } else if (!isFF) { // 除火狐外的现代浏览器也使用MouseWheel事件
    fun = dom.addEventListener('mousewheel', mousewheel.bind(this, dom), false)
  } else { // 火狐使用DOMMouseScroll事件
    fun = dom.addEventListener('DOMMouseScroll', DOMMouseScroll.bind(this, dom), false)
  }
  return fun
}

export default scrollX