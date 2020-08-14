export function transformMenu(title) {
  if (this.$te('menu.' + title)) return this.$t('menu.' + title)
  return title
}
