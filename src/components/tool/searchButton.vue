<template>
  <el-button :size="size" @click="search" class="search-button" plain type="default">
    <i class="fas fa-search search-icon" style="color: #2EBAAE"></i>{{$t('button.search')}}
  </el-button>
</template>

<script>
export default {
  name: 'searchButton',
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
    margin-right: 3px;
  }
</style>
