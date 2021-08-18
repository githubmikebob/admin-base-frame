export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { default: '' },
    disabled: { type: Boolean, default: false },
    placeholder: {
      type: String, default() {
        return this.$t('base.placeholder.content')
      }
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
}