<template>
  <div class="limit-input">
    <el-input
      clearable
      show-word-limit
      v-model="inputVal"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
    >
    </el-input>
  </div>
</template>

<script type='text/ecmascript-6'>
import inputModel from './inputModel.mixin'

export default {
  name: 'limit-input',
  components: {},
  mixins: [inputModel],
  props: {
    maxlength: { type: Number, default: 120 }
  },
  data() {
    return {}
  },
  computed: {
  },
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>