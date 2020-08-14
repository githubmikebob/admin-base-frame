import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// import enLocale from 'element-ui/lib/locale/lang/en'
// import twLocale from 'element-ui/lib/locale/lang/zh-TW'
// 语言包
import cn from './locales/cn'
// import en from '../src/locales/cn/en'
// import tw from '../src/locales/cn/tw'

Vue.prototype.cn = cn
// Vue.prototype.en = en
// Vue.prototype.tw = tw

Vue.use(VueI18n)

const i18n = new VueI18n({
  // locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  locale: 'cn',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    'cn': Object.assign(cn, zhLocale)
    // 'en': Object.assign(en, enLocale),
    // 'tw': Object.assign(tw, twLocale)
  }
})

export default i18n
