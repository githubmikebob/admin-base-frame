<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :header-align="column.head_align"
    :label="$transform(column.name)"
    :width="column.width"
    :show-overflow-tooltip="column.show_tip">
    <template slot-scope="{ row }">
      <div class="custom-color">
        <span :class="column.color">{{generateScopeValue(row, column.prop)}}</span>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { generateScopeValue } from '../../global/js/table/column'

export default {
  name: 'textColumn',
  computed: {
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      if (!b.hasOwnProperty('name')) {
        b.name = b.prop
      }
      // console.log('$extend', this.$extend(a, b))
      // console.log('a', a)
      // console.log('b', b)
      return this.$extend(a, b)
    }
  },
  props: {
    prop_column: { required: true, type: Object }
  },
  data() {
    return {
      default_column: {
        type: 'text', // 引导效果，没有实际使用
        align: 'center',
        head_align: 'center',
        fixed: false,
        color: 'main-text',
        width: '',
        prop: '',
        show_tip: true
      }
    }
  },
  methods: {
    generateScopeValue
  }
}
</script>
