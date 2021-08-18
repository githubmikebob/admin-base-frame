<template>
  <div class="">
    <normal-select
      v-model="id"
      :data="list"
      :disabled="disabled"
      :placeholder="placeholder"
    ></normal-select>
  </div>
</template>

<script type='text/ecmascript-6'>
import selectModel from './selectModel.mixin'

export default {
  name: 'SpecsSelect',
  components: {
    NormalSelect: () => import('./NormalSelect')
  },
  mixins: [selectModel],
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
  },
  methods: {
    async init() {
      this.list = [{ name: '第一', id: 1 }, { name: '第二', id: 2 }, { name: '第三', id: 3 }]
    }
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>