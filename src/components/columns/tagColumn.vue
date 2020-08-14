<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :header-align="column.head_align"
    :label="$t(column.name)"
    :width="column.width"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <div class="tag-box">
        <el-tag
          :closable="column.closeable"
          :size="size"
          :type="makeScopeValue(scope.row, column.prop, column.language + '.color')"
          @click="handleClick(scope.row, column.click)"
          @close="handleClick(scope.row, column.close)"
          style="margin-right: 5px; cursor: pointer"
        >{{makeScopeValue(scope.row, column.prop, column.language)}}
        </el-tag>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { Tag } from 'element-ui'
import { makeScopeValue } from '../../global/js/table/table'

export default {
  name: 'tagColumn',
  components: {
    [Tag.name]: Tag
  },
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
        type: 'tag',
        language: '',
        fixed: false,
        closeable: false,
        width: '70',
        prop: '',
        click: 'tag-edit',
        close: 'tag-close'
      }
    }
  },
  methods: {
    makeScopeValue,
    handleClick(row, type) {
      this.$emit('actions', type, row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-box {
    .el-tag {
      border-radius: 0;
    }
  }
</style>
