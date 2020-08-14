<template>
  <el-table-column
      :align="column.align"
      :fixed="column.fixed"
      :header-align="column.head_align"
      :label="transform(column.name)"
      :width="column.width"
      show-overflow-tooltip
  >
    <template slot-scope="{ row, $index }">
      <el-button
        :disabled="saving"
        style="margin-left: 0; margin-right: 6px"
        :size="size"
        v-for="(btn, index) in column.buttons"
        :key="index"
        :type="btn.type"
        :plain="btn.plain ? btn.plain : false"
        @click="handleClick(btn, row, $index)"
        class="action-button"
        v-show="row.edit === btn.edit"
      >{{$t(btn.name)}}
      </el-button>
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
    saving: { required: false, default: false }
  },
  data() {
    return {
      origin: {},
      default_column: {
        align: 'center',
        head_align: 'center',
        name: 'button.Action',
        type: 'action',
        fixed: 'right',
        width: 115,
        index: '',
        editable: [],
        buttons: [{
          name: 'button.Edit',
          prop: 'api',
          type: 'success',
          edit: false,
          event: 'edit'
        }, {
          name: 'button.Delete',
          prop: 'api',
          type: 'danger',
          edit: false,
          event: 'remove'
        }, {
          name: 'button.Confirm',
          prop: 'api',
          type: 'primary',
          edit: true,
          event: 'confirm'
        }, {
          name: 'button.Cancel',
          prop: 'api',
          type: 'warning',
          edit: true,
          event: 'cancel'
        }]
      }
    }
  },
  methods: {
    makeScopeValue,
    handleClick(btn, row, index) {
      let type = btn.event
      let origin = this.deepCopy(this.origin)
      let editable = this.deepCopy(this.column.editable)
      switch (type) {
        case 'edit':
          for (let v of editable) {
            origin[v] = row[v]
          }
          origin.edit = false
          this.origin = this.deepCopy(origin)
          row.edit = true
          break
        case 'remove':
          this.$emit('actions', type, row, index)
          break
        case 'confirm':
          this.$emit('actions', type, row, index)
          break
        case 'cancel':
          if (this.origin.length !== {}) {
            this.origin.edit = false
            let a = this.deepCopy(row)
            let b = this.deepCopy(this.origin)
            row = this.extend(a, b)
            this.$emit('actions', type, row, index)
          } else {
            for (let v of editable) {
              row[v] = ''
            }
          }
          break
      }
    }
  }
}
</script>
