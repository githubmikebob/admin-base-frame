<template>
  <div class="tail-text-input">
    <el-input
      clearable
      v-model.number="inputVal"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
    >
      <template slot="append">{{ appendText }}</template>
    </el-input>
  </div>
</template>

<script type='text/ecmascript-6'>
import inputModel from './inputModel.mixin'

export default {
  name: 'tail-text-input',
  components: {},
  mixins: [inputModel],
  props: {
    appendText: { required: true,type: String }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>