<template>
  <el-radio-group
      :disabled="disabled"
      :size="size"
      @change="change"
      class="custom-color"
      v-model="value"
      v-show="$te(target)"
      :style="'margin-left:' + margin_left"
  >
    <el-radio-button :label="-1" v-if="all">{{$t('base.all')}}</el-radio-button>
    <el-radio-button :key="index" :label="generateLabel(index)" v-for="(item, index) in pool">
      <span :class="custom_color(index)">{{item}}</span>
    </el-radio-button>
  </el-radio-group>
</template>

<script>
import { RadioButton, RadioGroup } from 'element-ui'

import { isNumber } from '../../global/js/common/data'

export default {
  name: 'radioGroup',
  created() {
    this.$nextTick(() => {
      this.value = this.$deepCopy(this.type)
    })
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton
  },
  props: {
    type: { required: true },
    margin_left: { type: String, default: '8px' },
    disabled: { type: Boolean, default: false },
    target: { required: true, type: String }
  },
  computed: {
    size() {
      return this.$store.state.app.size
    },
    all() {
      if (this.$te(this.target)) return this.$t(this.target).hasOwnProperty(-1)
      else return false
    },
    pool() {
      if (this.$te(this.target)) {
        let pool = this.$deepCopy(this.$t(this.target))
        if (pool.hasOwnProperty('color')) delete pool['color']
        if (pool.hasOwnProperty(-1)) {
          delete pool[-1]
        }
        return pool
      } else {
        return []
      }
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    generateLabel(index) {
      if (isNumber(index)) {
        return parseInt(index)
      } else {
        return index
      }
    },
    custom_color(index) {
      if (this.$te(this.target + '.color') && parseInt(this.value) !== parseInt(index)) {
        if (this.$te(this.target + '.color.' + index)) return this.$t(this.target + '.color.' + index)
        else return ''
      } else {
        return ''
      }
    },
    change(type) {
      this.$emit('update:type', type)
    }
  },
  watch: {
    type(val) {
      this.value = this.$deepCopy(val)
    }
  }
}
</script>
