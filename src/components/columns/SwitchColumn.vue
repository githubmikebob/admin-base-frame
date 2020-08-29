<template>
  <el-table-column
      :align="column.align"
      :fixed="column.fixed"
      :header-align="column.head_align"
      :label="$transform(column.name)"
      :prop="column.prop"
      :width="column.width"
      :show-overflow-tooltip="column.show_tip">
    <template slot-scope="{row}">
      <el-switch
          :active-value="1"
          :inactive-value="2"
          :disabled="executing || generateDisabled()"
          @change="change(column.event, row)"
          :active-color="column.active_color"
          :inactive-color="column.inactive_color"
          v-show="generateShow(row)"
          v-model="row[column.prop]" />
      <i v-show="active !== '' && (active === generateScopeValue(row, column.index) && executing)" class="el-icon-loading color-primary" style="font-size: 18px" />
    </template>
  </el-table-column>
</template>

<script>
import { Switch } from 'element-ui'
import { generateScopeValue } from '../../global/js/table/table'
import check_rule from '../../global/js/function/check_rule'

export default {
  name: 'SwitchColumn',
  components: {
    [Switch.name]: Switch
  },
  computed: {
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      return this.$extend(a, b)
    }
  },
  props: {
    prop_column: { required: true, type: Object },
    executing: { type: Boolean, default: false }
  },
  data() {
    return {
      active: '',
      default_column: {
        type: 'status', // 引导效果，没有实际使用
        name: 'base.status',
        align: 'center',
        head_align: 'center',
        width: '70',
        language: '',
        fixed: false,
        index: 'id',
        prop: 'status',
        event: 'status',
        active_color: '#13ce66',
        inactive_color: '#ff4949',
        show_tip: true
      }
    }
  },
  methods: {
    generateScopeValue,
    generateDisabled() {
      let column = this.column
      return (column.hasOwnProperty('rules') && !check_rule(column.rules));
    },
    generateShow(row) { // 是否展示按钮 不展示的清空：1、正在执行
      return !(this.active !== '' && (this.active === generateScopeValue(row, this.column.index)));
    },
    change(type, row) {
      if (this.column.hasOwnProperty('index')) this.active = generateScopeValue(row, this.column.index)
      this.$emit('actions', type, row)
    }
  },
  watch: {
    executing(val) {
      if (!val) this.active = ''
    }
  }
}
</script>
