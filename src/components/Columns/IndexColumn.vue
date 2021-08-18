<template>
  <el-table-column
    type="index"
    :align="column.align"
    :header-align="column.head_align"
    :fixed="column.fixed"
    :index="formatIndex"
    :label="$transform(column.name)"
    :width="width"
    :show-overflow-tooltip="column.show_tip"/>
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
    prop_column: { type: Object },
    size: { type: Number, default: 15 },
    page: { type: Number, default: 1 }
  },
  data() {
    return {
      width: 50,
      default_column: {
        type: 'index', // 引导效果，没有实际使用
        name: 'base.sort',
        align: 'center',
        head_align: 'center',
        fixed: 'left',
        show_tip: false
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
