<template>
  <el-pagination
    :align="paginationAlign"
    :background="background"
    :current-page="page"
    :layout="layout[layout_type]"
    :page-size="size"
    :page-sizes="generateSizes"
    :pager-count="paginationCount"
    :small="smallPagination"
    :total="total"
    :disabled="paging"
    @current-change="pageChange"
    @size-change="sizeChange">
  </el-pagination>
</template>

<script>
import { Pagination } from 'element-ui'

export default {
  name: 'pagination',
  components: {
    [Pagination.name]: Pagination
  },
  computed: {
    paging() {
      let paging = this.$store.state.app.paging
      if (paging.mark === this.mark) return paging.status
      else return false
    },
    generateSizes() {
      return [this.size].concat(this.paginationSizes)
    },
  },
  data() {
    return {
      layout: {
        0: '',
        1: 'total, prev, pager, next',
        2: 'total, prev, pager, next, jumper',
        3: 'total, sizes, prev, pager, next',
        9: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  props: {
    mark: { type: String, default: '' },
    background: { type: Boolean, default: true },
    layout_type: { type: Number, default: 2 },
    paginationAlign: { type: String, default: 'right' },
    paginationCount: { type: Number, default: 7 },
    // TODO 数据有问题
    paginationSizes: {
      type: Array, default() {
        return [30, 50, 100]
      }
    },
    smallPagination: { type: Boolean, default: false },
    headHeight: { type: Number, default: 37 },
    rowHeight: { type: Number, default: 37 },
    size: { required: true, type: Number, default: 15 },
    page: { required: true, type: Number, default: 1 },
    total: { required: true, type: Number, default: 0 }
  },
  methods: {
    sizeChange(size) {
      this.$emit('update:size', size)
    },
    pageChange(page) {
      this.$emit('update:page', page)
    }
  }
}
</script>
