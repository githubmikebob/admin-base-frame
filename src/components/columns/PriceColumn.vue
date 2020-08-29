<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :header-align="column.head_align"
    :label="$transform(column.name)"
    :width="column.width"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <div>
        <el-row
          class="custom-color hand-point"
          @click="handleClick(scope.row)"
          @dblclick="handleDBClick(scope.row)">
         <el-col :span="2" class="info" style="font-size: 16px; font-weight: bold">¥</el-col>
         <el-col :span="22">
           <span :class="makeScopePrice(scope.row, column.prop, true)">
           {{makeScopePrice(scope.row, column.prop)}}
           </span>
         </el-col>
        </el-row>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { makeScopePrice } from '../../global/js/table/table'

export default {
  name: 'priceColumn',
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
        align: 'right',
        head_align: 'center',
        type: 'price',
        fixed: false,
        color: 'main-text',
        style: '',
        width: '',
        prop: ''
      }
    }
  },
  methods: {
    makeScopePrice,
    handleClick(row) {
      if (this.column.hasOwnProperty('click')) {
        this.$emit('actions', this.column.click, row)
      }
    },
    handleDBClick(row) {
      if (this.column.hasOwnProperty('db_click')) {
        this.$emit('actions', this.column.db_click, row)
      }
    }
  }
}
</script>
