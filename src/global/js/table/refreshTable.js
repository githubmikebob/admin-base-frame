export default function () {
  if (this.hasOwnProperty('keyword') && this.keyword.hasOwnProperty('keyword')) {
    if (!this.keyword.keyword.hasOwnProperty('keep') || !this.keyword.keyword.keep) {
      this.page = 1
      this.keyword.keyword.value = ''
      this.$refs.searchInput.value = ''
    }
  }
  this.getTable()
}
