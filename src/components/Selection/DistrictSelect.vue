<template>
  <div class="district-select">
    <normal-cascade v-model="id" :data="list" :placeholder="placeholder" :disabled="disabled"></normal-cascade>
  </div>
</template>

<script>
import selectModel from './selectModel.mixin'

export default {
  name: 'DistrictSelect',
  components: {
    NormalCascade: () => import('./NormalCascade')
  },
  mixins: [selectModel],
  props: {
    placeholder: {
      type: String, default() {
        return this.$t('search.area')
      }
    },
  },
  computed: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    async init() {
      this.list = await this.$store.dispatch('cacheData/setDistrict')
    },
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>
