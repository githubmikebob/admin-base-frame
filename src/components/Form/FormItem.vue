<script type='text/ecmascript-6'>
import SpecsSelect from '../Selection/SpecsSelect'
import DistrictSelect from '../Selection/DistrictSelect'
import TailTextInput from '../Input/TailTextInput'
import LimitInput from '../Input/LimitInput'
import SearchInput from '../Input/SearchInput'

export default {
  name: 'FormItem',
  components: {
    SpecsSelect,
    DistrictSelect,
    TailTextInput,
    LimitInput,
    SearchInput
  },
  mixins: [],
  props: {
    form: { required: true, type: Object },
    item: { required: true, type: Object },
    language: { required: true, type: String },
  },
  data() {
    return {}
  },
  computed: {
    itemEl() {
      return (key) => {
        return this.$transform(`${this.language}.el.${key}`)
      }
    },
    appendText() {
      return (key) => {
        return this.$transform(`${this.language}.el.input_append.${key}`)
      }
    },
    maxlength() {
      return (key) => {
        return parseInt(this.$transform(`${this.language}.validator.${key}.length_gt`))
      }
    },
    getProps() {
      return (el) => {
        let props
        switch (el) {
          case 'TailTextInput':
            props = { appendText: this.appendText(this.item.key) }
            break
          case 'LimitInput':
            props = { maxlength: this.maxlength(this.item.key) }
            break
          default:
            props = {}
            break
        }
        return props
      }
    }
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  render(createElement) {
    let that = this
    let el = this.itemEl(this.item.key)
    return createElement(el, {
      ref: this.item.key,
      model: { // 模拟v-model
        value: that.form[that.item.key],
        callback: function(e) {
          that.form[that.item.key] = e
        }
      },
      attrs: {
        placeholder: this.item.placeholder,
        disabled: this.item.disabled,
      },
      props: that.getProps(el),
    })
  },
  methods: {},
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>