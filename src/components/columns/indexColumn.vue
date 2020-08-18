<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :index="formatIndex"
    :label="$transform(column.name)"
    :width="width"
    show-overflow-tooltip
    type="index"
  />
</template>

<script>

export default {
  name: 'indexColumn',
  computed: {
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      return this.$extend(a, b)
    }
  },
  props: {
    prop_column: {
      type: Object,
      default() {
        return {
          name: '#',
          align: 'center',
          fixed: 'left',
          type: 'index'
        }
      }
    },
    size: { type: Number, default: 15 },
    page: { type: Number, default: 1 }
  },
  data() {
    return {
      width: 50,
      default_column: {
        align: 'center',
        fixed: 'left',
        name: '#',
        type: 'index'
      }
    }
  },
  methods: {
    formatIndex(index) {
      let value = this.size * (this.page - 1) + 1 + index
      let width = (20 + value.toString().length * 8)
      this.width = width > 50 ? width : 50
      return value
    }
  }
}
</script>
