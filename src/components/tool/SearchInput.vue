<template>
  <el-tooltip
      :content="this.$transform(placeholder)"
      :placement="placement"
      :enterable="enter_able"
      :effect="effect">
    <el-input
        :placeholder="this.$transform(placeholder)"
        :size="global_size"
        :clearable="clearable"
        :style="'width: ' + width + ';margin-left: ' + margin_left"
        @keyup.enter.native="search"
        v-model="value"/>
  </el-tooltip>
</template>

<script>
import global_size from '../../global/js/mixin/global_size'

export default {
  name: 'SearchInput',
  mixins: [global_size],
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  props: {
    keyword: { required: true, type: String, default: '' },
    placeholder: { type: String, default: 'base.search.keyword' },
    clearable: { type: Boolean, default: true },
    width: { type: String, default: '20%' },
    margin_left: { type: String, default: '8px' },
    placement: { type: String, default: 'top' },
    effect: { type: String, default: 'dark' },
    enter_able: { type: Boolean, default: false }
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
