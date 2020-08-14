import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 顶部进度条样式

// 配置 NProgress
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  trickleSpeed: 300,
  showSpinner: false,
  speed: 500
})

export default NProgress
