<script>
import columnTemplate from '../EditColumns/columns'
import autoTableHeight from '../../global/js/function/autoTableHeight'

export default {
  name: 'editTable',
  data() {
    return {
    }
  },
  computed: {
    size() {
      return this.$store.state.app.size
    },
    listHeight() {
      let headHeight = this.$deepCopy(this.headHeight)
      let rowHeight = this.$deepCopy(this.rowHeight)
      let tabHeight = this.$deepCopy(this.tabHeight)
      let size = this.$deepCopy(this.paginationSize)
      return autoTableHeight(size, headHeight, rowHeight, tabHeight)
    }
  },
  props: {
    table: { type: Boolean, default: false },
    stripe: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    highlight: { type: Boolean, default: true },
    headHeight: { type: Number, default: 37 },
    rowHeight: { type: Number, default: 37 },
    tabHeight: { type: Number, default: 0 }, // tab切换的高度
    paginationSize: { type: Number, default: 0 },
    saving: { type: Boolean, default: false },
    list: {
      required: true,
      type: Array, default() {
        return []
      }
    },
    columns: {
      type: Array, default() {
        return []
      }
    },
    localSearch: { type: Boolean, default: false }
  },
  methods: {
    actions(type, row, index) {
      this.$emit('actions', type, row, index)
    }
  },
  render(createElement) {
    let columns = []
    let option
    for (let v of this.columns) {
      if (v.type === 'action') {
        option = {
          props: {
            prop_column: v,
            saving: this.saving
          }
        }
      } else {
        option = {
          props: {
            prop_column: v
          }
        }
      }
      if (v.type === 'text' || v.type === 'action' || v.type === 'tag') {
        option = Object.assign(option, {
          on: {
            actions: this.actions
          }
        })
      }
      columns.push(createElement(columnTemplate[v.type], option))
    }
    return createElement('el-table', {
      style: {
        width: '100%',
        marginBottom: '0.8vh'
      },
      attrs: {
        'element-loading-text': this.$t('app.loading_table')
      },
      props: {
        data: this.list,
        size: this.size,
        height: this.listHeight,
        highlightCurrentRow: this.highlight,
        border: this.border,
        stripe: this.stripe,
        'show-header': this.header
      },
      directives: [
        {
          name: 'loading',
          value: this.table
        }
      ]
    }, columns)
  }
}
</script>
