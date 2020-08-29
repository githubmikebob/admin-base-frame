<template>
  <el-cascader
      :disabled="disabled"
      :options="cascade"
      :placeholder="placeholder"
      :props="props"
      :size="global_size"
      :style="'width: ' + width + '; margin-left:' + margin_left"
      @change="choose"
      clearable
      filterable
      v-model="district"
  />
</template>

<script>

import { Cascader } from 'element-ui'
import { apiPost } from '../../global/js/common/http'
import global_size from '../../global/js/mixin/global_size'

export default {
  name: 'selectDistrict',
  mixins: [global_size],
  components: {
    [Cascader.name]: Cascader
  },
  props: {
    width: { type: String, default: '20%' },
    margin_left: { type: String, default: '10px' },
    placeholder: { type: String, default() { return this.$t('search.area') } },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      cascade: [],
      district: [],
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      }
    }
  },
  methods: {
    choose() {
      this.$emit('choose', this.district)
    },
    clear() {
      this.district = []
    },
    getDistrictCascade() {
      let that = this
      let cascade = this.$storage.get('Cascade')
      if (!cascade) {
        apiPost('/District/Cascade', {}).then((res) => {
          if (res.code === 200) {
            that.cascade = res.data
            that.$storage.set('Cascade', res.data, 3600)
          }
        })
      } else {
        that.cascade = cascade
      }
    }
  }
}
</script>
