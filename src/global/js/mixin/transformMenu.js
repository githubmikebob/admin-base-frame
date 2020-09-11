export default {
  computed: {
    transformMenu() { // 快捷翻译菜单名称
      return (title) => {
        let newT
        if (this.$te('menu.' + title)) newT = this.$t('menu.' + title)
        return newT || title
      }
    }
  }
}