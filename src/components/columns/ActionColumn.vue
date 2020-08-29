<template>
  <el-table-column
      :align="column.align"
      :fixed="column.fixed"
      :header-align="column.head_align"
      :label="$transform(column.name)"
      :width="column.width"
      :show-overflow-tooltip="column.show_tip">
    <template slot-scope="{ row }">
      <el-button
          v-for="(btn, index) in column.buttons"
          :key="index"
          :size="global_size"
          :type="btn.hasOwnProperty('type') ? btn.type : 'primary'"
          :plain="btn.hasOwnProperty('plain') ? btn.plain : false"
          @click="handleClick(btn.event, row, btn)"
          class="action-button"
          :disabled="executing"
          v-show="generateShow(btn, row)"
      >{{$t(btn.hasOwnProperty('name') ? btn.name : 'button.edit')}}
      </el-button>
      <i v-show="active !== '' && (active === generateScopeValue(row, column.index) && executing)" class="el-icon-loading color-primary" style="font-size: 18px"/>
    </template>
  </el-table-column>
</template>

<script>

import global_size from '../../global/js/mixin/global_size'

import { generateScopeValue } from '../../global/js/table/table'
import check_rule from '../../global/js/function/check_rule'

export default {
  name: 'ActionColumn',
  mixins: [global_size],
  computed: {
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      return this.$extend(a, b)
    }
  },
  props: {
    prop_column: Object,
    executing: { type: Boolean, default: false }
  },
  data() {
    return {
      active: '',
      default_column: {
        type: 'action', // 引导效果，没有实际使用
        name: 'base.action',
        head_align: 'center',
        align: 'center',
        fixed: 'right',
        width: '60',
        index: 'id',
        show_tip: false,
        buttons: [
          {
            name: 'button.edit',
            type: 'primary',
            plain: false,
            event: 'edit',
            rules: []
          }
        ]
      }
    }
  },
  methods: {
    generateScopeValue,
    generateShow(btn, row) { // 是否展示按钮 不展示的清空：1、没权限 2、正在执行
      if (btn.hasOwnProperty('rules') && !check_rule(btn.rules)) return false
      if (btn.hasOwnProperty('show') && generateScopeValue(row, btn.show.prop) !== btn.show.value) return false
      else return !(this.active !== '' && (this.active === generateScopeValue(row, this.column.index)));
    },
    handleClick(type, row) {
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
