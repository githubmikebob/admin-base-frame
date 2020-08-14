<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :header-align="column.head_align"
    :label="$t(column.name)"
    :prop="column.prop"
    :width="column.width"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <div class="tag-box" style="overflow-y: scroll">
        <el-tag
          :closable="column.closeable"
          :key="column.tag_prop === '' ? index : tag.id"
          :size="size"
          :type="generateType(tag)"
          @click="handleClick(tag, column.click)"
          @close="handleClick(tag, column.close)"
          style="margin-right: 5px; cursor: pointer"
          v-for="(tag, index) in scope.row[column.prop]"
        >{{makeScopeValue(tag, column.tag_prop, column.language)}}
        </el-tag>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { Tag } from 'element-ui'
import { makeScopeValue } from '../../global/js/table/table'

export default {
  name: 'tagsColumn',
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
    prop_column: { required: true, type: Object }
  },
  data() {
    return {
      default_column: {
        align: 'left',
        head_align: 'center',
        type: 'tags',
        language: '',
        fixed: false,
        closeable: false,
        width: '',
        prop: '',
        tag_prop: '',
        click: 'tags-edit',
        close: 'tags-close'
      }
    }
  },
  methods: {
    makeScopeValue,
    generateType(tag) {
      if (!tag.hasOwnProperty('status')) { return 'default' }
      else {
        if (tag.status === 1) return 'primary'
        else return 'danger'
      }
    },
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
