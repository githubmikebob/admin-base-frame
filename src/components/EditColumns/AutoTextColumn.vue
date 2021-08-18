<template>
  <el-table-column
    :align="column.align"
    :fixed="column.fixed"
    :header-align="column.head_align"
    :label="$transform(column.name)"
    :width="column.width"
    show-overflow-tooltip
  >
    <template slot-scope="{ row }">
      <div class="custom-color" v-if="!row.edit || !column.editable">
        <span :class="column.color">
          {{ row[column.prop] }}
        </span>
      </div>
      <el-autocomplete
        :size="size"
        :fetch-suggestions="suggest"
        :placeholder="$transform(column.placeholder)"
        v-else
        v-model="row[column.prop]" />
    </template>
  </el-table-column>
</template>

<script>
import { Autocomplete } from 'element-ui'

export default {
  name: 'autoTextColumn',
  components: {
    [Autocomplete.name]: Autocomplete
  },
  computed: {
    size() {
      return this.$store.state.app.size
    },
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      return this.$extend(a, b)
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
      value: '',
      default_column: {
        align: 'center',
        head_align: 'center',
        type: 'text',
        language: '',
        fixed: false,
        color: 'main-text',
        style: '',
        width: '',
        prop: '',
        placeholder: 'base.content'
      }
    }
  },
  methods: {
    suggest(key, callback) {
      let suggest = this.$deepCopy(this.column.suggest)
      let result = key ? suggest.filter((item) => {
        return item.value.indexOf(key) !== -1
      }) : suggest
      callback(result)
    }
  }
}
</script>
