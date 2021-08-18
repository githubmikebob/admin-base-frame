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
        return this.$t('search.keyword')
      }
    }
  },
  computed: {
    id: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
    }
  }
}