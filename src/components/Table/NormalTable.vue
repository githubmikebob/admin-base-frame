<script>
import columnTemplate from '../Columns/columns'
import global_size from '../../global/js/mixin/global_size'

export default {
  name: 'NormalTable',
  mixins: [global_size],
  props: {
    table: { type: Boolean, default: false },
    stripe: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    highlight: { type: Boolean, default: true },
    headHeight: { type: Number, default: 37 },
    rowHeight: { type: Number, default: 37 },
    tabHeight: { type: Number, default: 0 }, // tab切换的高度
    sumHeight: { type: Number, default: 0 }, // 合计的高度
    paginationSize: { type: Number, default: 0 },
    page: { type: Number, default: 1 }, // 页数
    size: { type: Number, default: 15 }, // 页面大小
    saving: { type: Boolean, default: false },
    executing: { type: Boolean, default: false }, // 正在执行请求 Info
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
  data() {
    return {}
  },
  computed: {
    listHeight() {
      let headHeight = this.$deepCopy(this.headHeight)
      let rowHeight = this.$deepCopy(this.rowHeight)
      let tabHeight = this.$deepCopy(this.tabHeight)
      let sumHeight = this.$deepCopy(this.sumHeight)
      let size = this.$deepCopy(this.paginationSize)
      return this.$autoTableHeight(size, headHeight, rowHeight, tabHeight, 2, sumHeight)
    }
  },
  mounted() {
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
      switch (v.type) {
        default:
          option = { props: { prop_column: v }}
          break
        case 'index':
          option = { props: { prop_column: v, page: this.page, size: this.paginationSize }}
          break
        case 'action':
        case 'switch':
          option = { props: { prop_column: v, executing: this.executing }}
          break
      }
      let need_actions = ['action', 'switch', 'status', 'tag', 'tags']
      if (need_actions.includes(v.type)) {
        option = Object.assign(option, {
          on: { actions: this.actions }
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
        size: this.global_size,
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
