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
      <el-tooltip placement="top" effect="dark" trigger="hover">
        <div class="custom-color" slot="content">
            <span v-for="(item, index) in generateScopeValue(row, column.prop)" :key="index">
              <span>{{item}}</span>
              <i v-if="index < generateScopeValue(row, column.prop).length -1">、</i>
            </span>
        </div>
        <div class="text-ellipsis">
            <span v-for="(item, index) in generateScopeValue(row, column.prop)" :key="index">
              <span>{{item}}</span>
              <i v-if="index < generateScopeValue(row, column.prop).length -1">、</i>
            </span>
        </div>
      </el-tooltip>
    </template>
  </el-table-column>
</template>

<script>
import { generateScopeValue } from '../../global/js/table/table'
import { Tooltip, Tag } from 'element-ui'

export default {
  name: 'arrayColumn',
  components: {
    [Tag.name]: Tag,
    [Tooltip.name]: Tooltip
  },
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
        type: 'array',
        language: '',
        fixed: false,
        color: '',
        class: '',
        style: 'text',
        width: '',
        prop: '', // 显示字段
        keyword: '', // 数组内显示字段
        name: ''
      }
    }
  },
  methods: {
    generateScopeValue,
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
        column.class += 'hand-point '
      }
      if (column.hasOwnProperty('color')) column.class += column.color
      return column
    }
  }
}
</script>

<style scoped>

</style>