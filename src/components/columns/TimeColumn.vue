<template>
  <el-table-column
      :align="column.align"
      :fixed="column.fixed"
      :header-align="column.head_align"
      :label="$t(column.name)"
      :width="column.width"
      :show-overflow-tooltip="column.show_tip">
    <template slot-scope="scope">
      <span>{{makeScopeDate(scope.row, column.prop, column.format)}}</span>
    </template>
  </el-table-column>
</template>

<script>
import { makeScopeDate } from '../../global/js/table/table'

export default {
  name: 'timeColumn',
  computed: {
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      return this.$extend(a, b)
    }
  },
  props: {
    prop_column: { required: true, type: Object }
  },
  data() {
    return {
      default_column: {
        align: 'center',
        head_align: 'center',
        type: 'text',
        language: '',
        fixed: false,
        show_tip: true,
        date_format: 'date',
        width: '100',
        prop: ''
      }
    }
  },
  methods: {
    makeScopeDate
  }
}
</script>
