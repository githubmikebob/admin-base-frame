<script>
import columnTemplate from './columns'

export default {
  name: 'extendColumn',
  computed: {
    column() {
      let a = this.$deepCopy(this.default_column)
      let b = this.$deepCopy(this.prop_column)
      return this.$extend(a, b)
    }
  },
  props: {
    prop_column: { required: true, type: Object }
  },
  data() {
    return {
      default_column: {
        align: 'center',
        head_align: 'center',
        type: 'text',
        language: '',
        fixed: false,
        width: '',
        prop: '',
        columns: []
      }
    }
  },
  render(createElement) {
    let columns = []
    for (let v of this.columns) {
      let option = {
        props: {
          prop_column: v
        }
      }
      if (v.type === 'action') {
        option = Object.assign(option, {
          on: {
            edit: this.edit
          }
        })
      }
      if (v.type === 'tags') {
        option = Object.assign(option, {
          on: {
            edit: this.edit,
            tagsClose: this.tagsClose
          }
        })
      }
      if (v.type === 'status') {
        option = Object.assign(option, {
          on: {
            switchStatus: this.switchStatus
          }
        })
      }
      columns.push(createElement(columnTemplate[v.type], option))
    }
    return createElement('el-table-column', {
      props: {
        type: 'extend',
        fixed: 'left'
      }
    }, columns)
  }
}
</script>
