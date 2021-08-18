<template>
  <div class="normal-form">
    <el-form
      ref="NormalForm"
      :model="form"
      :rules="rules"
      :inline="inline"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :disabled="disabled"
      :size="size"
    >
      <template v-for="item in itemLists">
        <el-form-item :key="item.key" :prop="item.key" v-if="!item.hidden">
          <template slot="label" v-if="!hiddenLabel">{{ $t(`${language}.${item.key}`) }}</template>
          <form-item :form="form" :item="item" :language="language"></form-item>
        </el-form-item>
      </template>
      <slot name="form-item"></slot>
      <el-form-item>
        <submit-button v-if="!hiddenFooter" :saving="requesting" @save="verify" @close="close"></submit-button>
        <slot name="footer-item"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
import requesting from '../../global/js/mixin/requesting'

export default {
  name: 'NormalForm',
  components: {
    FormItem: () => import('./FormItem'),
    SubmitButton: () => import('../Button/SubmitButton')
  },
  mixins: [requesting],
  props: {
    form: { required: true, type: Object },
    language: { required: true, type: String }, // 语言包标识
    disabledData: { type: Array, default: () => [] }, // 不可修改字段
    hiddenData: { type: Array, default: () => ['id'] }, // 隐藏字段
    inline: { type: Boolean, default: false },
    labelWidth: { type: String, default: '80px' },
    labelPosition: { type: String, default: 'right' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'mini' },
    hiddenLabel: { type: Boolean, default: false },
    hiddenFooter: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  computed: {
    rules() {
      return this.$verify(this.$deepCopy(this.language), this.$deepCopy(this.form))
    },
    itemLists() {
      let list = []
      let obj = {}
      for (let k in this.form) {
        if (this.form.hasOwnProperty(k)) {
          obj = {
            key: k,
            placeholder: this.$transform(`${this.language}.placeholder.${k}`),
            disabled: this.disabledData.indexOf(k) > -1,
            hidden: this.hiddenData.indexOf(k) > -1,
          }
          list.push(obj)
        }
      }
      return list
    }
  },
  watch: {},
  mounted() {
    // console.log(this.rules)
  },
  methods: {
    verify() {
      this.$refs.NormalForm.validate(valid => {
        valid ? this.$emit('sub', this.form) : ''
      })
    },
    close() {
      this.$refs.NormalForm.resetFields()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .normal-form {

  }
</style>