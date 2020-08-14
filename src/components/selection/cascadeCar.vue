<template>
  <el-cascader
      :disabled="disabled"
      :options="cascade"
      :placeholder="placeholder"
      :props="props"
      :size="globalSize"
      :style="'width: ' + width"
      @change="choose"
      filterable
      v-model="id"
  />
</template>

<script>
import { Cascader } from 'element-ui'
import { apiPost } from '../../global/js/common/http'
import globalSize from '../../global/js/mixin/globalSize'

export default {
  name: 'cascadeCar',
  mixins: [globalSize],
  components: {
    [Cascader.name]: Cascader
  },
  props: {
    url: { required: true, type: String, default: '' }, // 接口地址
    cascade_id: { required: true }, // 默认选中项
    width: { type: String, default: '100%' },
    placeholder: { type: String, default() { return this.$t('carType.carType') } },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      cascade: [],
      id: [0],
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
      this.$emit('update:cascade_id', this.deepCopy(this.id[this.id.length - 1]))
    },
    clear() {
      this.id = [0]
    },
    getCascade(params = {}) {
      let that = this
      let cascader = that.storage.get('brand_cascade')
      if (cascader) { // localstorage获取车品牌级联数据
        that.cascade = that.storage.get('brand_cascade')
      } else {
        apiPost(this.url, params).then((res) => {
          if (res.code === 200) {
            that.storage.set('brand_cascade', res.data, 7 * 24 * 60 * 60)
            that.cascade = res.data
          }
        })
      }
    }
  },
  watch: {
    cascade_id(val) {
      if (val) this.id = this.deepCopy(val)
      else this.clear()
    }
  }
}
</script>
