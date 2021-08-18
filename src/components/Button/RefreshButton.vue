<template>
  <div class="refresh-button">
    <el-button :size="size" @click="refresh" class="refresh-button" plain type="default">
      <i class="fas fa-sync-alt refresh-icon" />{{$t('button.refresh')}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'RefreshButton',
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  methods: {
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
  .refresh-button {
    margin-right: 5px;
    .refresh-icon {
      margin-right: 3px;
      color: #2ebaae;
    }
  }
</style>
