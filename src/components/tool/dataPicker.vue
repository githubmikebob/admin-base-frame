<template>
  <div style="display: inline-block">
    <span v-if="show_text" class="tool-text">{{transform(text)}}</span>
    <el-date-picker
          :disabled="disabled"
          v-model="value"
          :picker-options="date_range === 1 ? this.beforeDate : (date_range === 2 ? this.afterDate : {})"
          :value-format="format"
          :type="type"
          :style="'width: ' + width + ';margin-left: ' + margin_left"
          :width="width"
          :placeholder="placeholder"
          :clearable="clearable"
          @change="change"
    />
  </div>
</template>

<script>
import transform from '../../global/js/function/transform'
import { formatDay, formatDate } from '../../global/js/common/time'

export default {
  name: 'dataPicker',
  created() {
    this.init()
  },
  computed: {
    format() {
      let format = ''
      if (this.type === 'date') format = 'yyyy-MM-dd'
      if (this.type === 'datetime') format = 'yyyy-MM-dd HH:mm:ss'
      if (this.type === 'year') format = 'yyyy'
      if (this.type === 'month') format = 'MM'
      if (this.type === 'week') format = 'WW'
      return format
    }
  },
  data() {
    return {
      value: '',
      beforeDate: {
        disabledDate(time) {
          return time.getTime() >= Date.now()
        }
      },
      afterDate: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 8.64e7 // - 8.64e7 表示可选择当天时间
        }
      }
    }
  },
  props: {
    time: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    date_range: { type: Number, default: 3 },
    type: { type: String, default: 'date' },
    width: { type: String, default: '100%' },
    margin_left: { type: String, default: '0' },
    placeholder: { type: String, default: transform('item.placeholder.time') },
    clearable: { type: Boolean, default: true },
    show_text: { type: Boolean, default: false },
    text: { type: String, default: 'time.date' }
  },
  methods: {
    init() {
      if (this.type === 'date') this.value = formatDay()
      if (this.type === 'datetime') this.value = formatDate().time
      this.change()
    },
    change() {
      this.$emit('update:time', this.value)
    },
    clear() {
      this.init()
    }
  },
  watch: {
    time(val) {
      this.value = val
    }
  }
}
</script>
