<script>
import columnTemplate from '../columns/columns'
import globalSize from '../../global/js/mixin/globalSize'
// import autoTableHeight from '../../global/js/function/autoTableHeight'

export default {
  name: 'normalTable',
  mixins: [globalSize],
  data() {
    return {
    }
  },
  computed: {
    listHeight() {
      let headHeight = this.$deepCopy(this.headHeight)
      let rowHeight = this.$deepCopy(this.rowHeight)
      let tabHeight = this.$deepCopy(this.tabHeight)
      let size = this.$deepCopy(this.paginationSize)
      return this.$autoTableHeight(size, headHeight, rowHeight, tabHeight)
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
    page: { type: Number, default: 1 }, // 页数
    size: { type: Number, default: 15 }, // 页面大小
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
    actions(type, row) {
      this.$emit('actions', type, row)
    }
  },
  render(createElement) {
    let columns = []
    for (let v of this.columns) {
      let option = {}
      if (v.type === 'index') {
        option = {
          props: {
            prop_column: v,
            page: this.page,
            size: this.size
          }
        }
      } else if (v.type === 'action') {
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
      if (v.type === 'text' || v.type === 'action' || v.type === 'tags' || v.type === 'status' || v.type === 'tag') {
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
        size: this.globalSize,
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
