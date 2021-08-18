<template>
  <el-tooltip
    :content="placeholder"
    :placement="placement"
    :enterable="enter_able"
    :effect="effect">
    <el-input
      :placeholder="placeholder"
      :size="global_size"
      :clearable="clearable"
      :style="'width: ' + width + ';margin-left: ' + margin_left"
      v-model="inputVal"/>
  </el-tooltip>
</template>

<script>
import global_size from '../../global/js/mixin/global_size'
import inputModel from './inputModel.mixin'

export default {
  name: 'SearchInput',
  mixins: [global_size, inputModel],
  computed: {},
  props: {
    placeholder: {
      type: String, default() {
        return this.$transform('search.keyword')
      }
    },
    clearable: { type: Boolean, default: true },
    width: { type: String, default: '100%' },
    margin_left: { type: String, default: '0' },
    placement: { type: String, default: 'top' },
    effect: { type: String, default: 'dark' },
    enter_able: { type: Boolean, default: false }
  },
  data() {
    return {
    }
  },
  methods: {},
  watch: {}
}
</script>
