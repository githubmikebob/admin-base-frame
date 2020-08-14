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
      <el-button
          :size="size"
          :type="btn.type"
          v-for="(btn, index) in column.buttons"
          :key="index"
          :plain="btn.plain ? btn.plain : false"
          @click="handleClick(btn.event, row, btn)"
          class="action-button"
          :disabled="saving"
          v-show="generateShow(btn, row)"
      >{{$t(btn.name)}}
      </el-button>
      <i v-show="active !== '' && (active === makeScopeValue(row, column.index) && saving)" class="el-icon-loading color-primary" style="font-size: 18px"/>
    </template>
  </el-table-column>
</template>

<script>
import { makeScopeValue } from '../../global/js/table/table'

export default {
  name: 'actionColumn',
  computed: {
    size() {
      return this.$store.state.app.size
    },
    column() {
      let a = this.deepCopy(this.default_column)
      let b = this.deepCopy(this.prop_column)
      return this.extend(a, b)
    }
  },
  props: {
    prop_column: Object,
    saving: { type: Boolean, default: false }
  },
  data() {
    return {
      active: '',
      default_column: {
        align: 'center',
        head_align: 'center',
        name: 'button.action',
        type: 'action',
        fixed: 'right',
        width: '60',
        index: '',
        buttons: [
          {
            name: 'button.edit',
            prop: 'menu',
            type: 'primary',
            plain: false,
            event: 'edit'
          }
        ]
      }
    }
  },
  methods: {
    makeScopeValue,
    generateShow(btn, row) {
      if (btn.hasOwnProperty('show') && this.makeScopeValue(row, btn.show.prop) !== btn.show.value) return false
      else return !(this.active !== '' && (this.active === this.makeScopeValue(row, this.column.index)));
    },
    handleClick(type, row, btn) {
      if (this.column.hasOwnProperty('index') && btn.hasOwnProperty('active')) this.active = makeScopeValue(row, this.column.index)
      if (btn.prop !== '' && row.hasOwnProperty(btn.prop)) row = row[btn.prop]
      this.$emit('actions', type, row)
    }
  },
  watch: {
    saving(val) {
      if (!val) this.active = ''
    }
  }
}
</script>
