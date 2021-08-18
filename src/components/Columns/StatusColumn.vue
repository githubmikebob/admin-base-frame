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
        @change="change(column.type, row)"
        active-color="#13ce66"
        inactive-color="#ff4949"
        v-model="row[column.prop]" />
    </template>
  </el-table-column>
</template>

<script>
import { Switch } from 'element-ui'
import { makeScopeValue } from '../../global/js/table/table'

export default {
  name: 'statusColumn',
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
    prop_column: { required: true, type: Object }
  },
  data() {
    return {
      default_column: {
        align: 'center',
        head_align: 'center',
        type: 'status',
        language: '',
        fixed: false,
        width: '70',
        prop: '',
        change: 'change',
        show_tip: true
      }
    }
  },
  methods: {
    makeScopeValue,
    change(type, row) {
      let str = ''
      if (this.column.prop !== 'status') {
        str = this.column.prop.slice(0, this.column.prop.length - 7)
        this.$emit('actions', type, row[str])
      } else {
        this.$emit('actions', type, row)
      }
    }
  }
}
</script>
