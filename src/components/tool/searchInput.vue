<template>
  <el-tooltip
    :content="transform('search.' + placeholder)"
    :placement="placement"
    :enterable="enterable"
    :effect="effect">
      <el-input
        :placeholder="transform('search.' + placeholder)"
        :size="size"
        :clearable="clearable"
        :style="'width: ' + width + ';margin-left: ' + margin_left"
        @keyup.enter.native="search"
        v-model="value" />
  </el-tooltip>
</template>

<script>
export default {
  name: 'searchInput',
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  props: {
    keyword: { required: true, type: String, default: '' },
    placeholder: { required: true, type: String, default: 'keyword' },
    clearable: { type: Boolean, default: true },
    width: { type: String, default: '20%' },
    margin_left: { type: String, default: '8px' },
    placement: { type: String, default: 'top' },
    effect: { type: String, default: 'dark' },
    enterable: { type: Boolean, default: false }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  },
  watch: {
    value(val) {
      this.$emit('update:keyword', val)
    }
  }
}
</script>
