// 获取页面的标题
import i18n from '../../../i18n'
import defaultSettings from '../../../settings'

const title = defaultSettings.title || i18n.t('app.title')

export default function pageTitle(key) {
  const hasKey = i18n.te(`menu.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`menu.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}
