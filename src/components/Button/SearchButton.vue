<template>
  <el-button :size="size" @click="search" class="search-button" plain type="default">
    <i class="fas fa-search search-icon" />{{ $t('button.search') }}
  </el-button>
</template>

<script>
export default {
  name: 'SearchButton',
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-button {
    margin-left: 8px;
  }
  .search-icon {
    color: #2EBAAE;
    margin-right: 3px;
  }
</style>
