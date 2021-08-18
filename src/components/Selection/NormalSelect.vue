<template>
  <div class="normal-select">
    <el-select
      v-model="id"
      :loading="requesting"
      :disabled="disabled"
      :filter-method="generateList"
      :clearable="clearable"
      @clear="clear"
      @focus="focus"
      @change="change"
      filterable
      :placeholder="placeholder"
      :style="'width: ' + selectWidth + '; margin-left:' + margin_left"
      :size="global_size"
    >
      <el-option v-if="showAll" :label="labelAll" :value="valueAll">
        <span style="float: left">{{ $t('base.all') }}</span>
      </el-option>
      <el-option v-for="item in list" :key="item[optionValue]" :label="item[label]" :value="item[optionValue]">
        <template>
          <slot name="option" :scope="item"></slot>
        </template>
      </el-option>
    </el-select>
  </div>
</template>

<script type='text/ecmascript-6'>
import selectModel from './selectModel.mixin'
import global_size from '../../global/js/mixin/global_size'
import requesting from '../../global/js/mixin/requesting'

export default {
  name: 'NormalSelect',
  components: {},
  mixins: [selectModel, global_size, requesting],
  props: {
    data: { required: true, type: Array },
    clearable: { type: Boolean, default: true },
    placeholder: {
      type: String, default() {
        return this.$t('search.keyword')
      }
    },
    selectWidth: { type: String, default: '100%' },
    margin_left: { type: String, default: '' },
    showAll: { type: Boolean, default: false }, // 是否显示 全部选项
    labelAll: {
      type: String, default() {
        return this.$t('base.all')
      }
    },
    valueAll: { type: [Number, String], default: -1 },
    label: { type: String, default: 'name' }, // 下拉框展示的值o
    optionValue: { type: String, default: 'id' }, // 下拉框选中的值
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    init() {
      this.generateList()
    },
    generateList(keyword) {
      let data = this.$deepCopy(this.data)
      if (!keyword) {
        this.list = data
      } else {
        keyword = keyword.trim()
        this.list = data.filter((item) => ((item.name && item.name.indexOf(keyword) > -1) ||
						(item.letter && item.letter.indexOf(keyword.toUpperCase()) > -1) ||
						(item.spell && item.spell.indexOf(keyword.toLowerCase()) > -1) ||
						(item.short && item.short.indexOf(keyword.toUpperCase()) > -1)))
      }
    },
    change(val) {
      this.$emit('change', val)
    },
    clear() {
    },
    focus() {
      this.generateList()
    }
  },

}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>