<template>
  <el-button :size="size" :type="type" @click="open" class="open-button" plain v-if="checkRule(rules)">
    <i :class="icon" class="fas open-icon" />{{transform(name)}}
  </el-button>
</template>

<script>
import { checkRule } from '../../global/js/table/table'

export default {
  name: 'openButton',
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  props: {
    rules: {
      type: Array, default() {
        return []
      }
    },
    name: { type: String, default: 'button.new' },
    type: { type: String, default: 'default' },
    icon: { type: String, default: 'fa-plus' },
    sub: { type: String, default: '' }
  },
  methods: {
    checkRule,
    open() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
  .open-icon {
    padding-right: 3px;
    color: #2EBAAE;
  }
</style>
