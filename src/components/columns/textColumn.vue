<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :header-align="column.head_align"
    :label="transform(column.name)"
    :width="column.width"
    show-overflow-tooltip
  >
    <template slot-scope="{ row }">
      <div class="custom-color">
        <span
          :class="column.style"
          @click="handleClick(row)"
          @dblclick="handleDBClick(row)">
          {{makeScopeValue(row, column.prop, column.language)}}
        </span>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { makeScopeValue } from '../../global/js/table/table'

export default {
  name: 'textColumn',
  computed: {
    column() {
      let a = this.deepCopy(this.default_column)
      let b = this.deepCopy(this.prop_column)
      let column = this.extend(a, b)
      return this.generateClass(column)
    }
  },
  props: {
    prop_column: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      default_column: {
        align: 'center',
        head_align: 'center',
        type: 'text',
        language: '',
        fixed: false,
        color: 'main-text',
        style: '',
        width: '',
        prop: ''
      }
    }
  },
  methods: {
    makeScopeValue,
    handleClick(row) {
      if (this.column.hasOwnProperty('click')) {
        this.$emit('actions', this.column.click, row)
      }
    },
    handleDBClick(row) {
      if (this.column.hasOwnProperty('db_click')) {
        this.$emit('actions', this.column.db_click, row)
      }
    },
    generateClass(column) {
      if (column.hasOwnProperty('click') || column.hasOwnProperty('db_click')) {
        column.style += 'hand-point '
      }
      if (column.hasOwnProperty('color')) column.style += column.color
      return column
    }
  }
}
</script>
