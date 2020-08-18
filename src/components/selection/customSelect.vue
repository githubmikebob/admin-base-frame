<template>
  <el-select
      v-model="id"
      :loading="requesting"
      :disabled="disabled"
      :filter-method="generateList"
      :multiple="multiple"
      :multiple-limit="limit"
      :clearable="clearable"
      @clear="clear"
      @focus="focus"
      @change="set()"
      filterable
      :collapse-tags="collapseTags"
      :placeholder="placeholder"
      :style="'width: ' + selectWidth + '; margin-left:' + margin_left"
      :size="globalSize"
      value="">
    <el-option v-for="item in list" :key="item.id" :label="item[label]" :value="item.id">
      <slot name="option" :scope="item"></slot>
      <span style="float: left">{{ item[label] }}</span>
      <span v-if="price" style="float: right; color: #8492a6; font-size: 13px">{{ '￥' + item.money_limit }}</span>
    </el-option>
  </el-select>
</template>

<script>
import globalSize from '../../global/js/mixin/globalSize'
import requesting from '../../global/js/mixin/requesting'

export default {
  name: 'customSelect',
  mixins: [requesting, globalSize],
  data() {
    return {
      id: '',
      pool: [],
      list: []
    }
  },
  props: {
    url: { type: String, default: '' },
    select_id: { required: true, type: [Number, String] },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    limit: { type: Number, default: 0 },
    placeholder: { type: String, default() { return this.$t('search.select') } },
    selectWidth: { type: String, default: '100%' },
    margin_left: { type: String, default: '0' },
    price: { type: Boolean, default: false },
    show_all: { type: Boolean, default: false }, // 是否显示全部的下拉选项
    label_all: { type: String, default() { return this.$t('item.all') } },
    value_all: { type: String, default: '-1' },
    collapseTags: { type: Boolean, default: false },
    label: { type: String, default: 'name' }
  },
  methods: {
    init() {
      this.id = this.$deepCopy(this.select_id)
    },
    generateList(keyword) {
      let that = this
      let data = that.$deepCopy(that.pool)
      if (!keyword) keyword = ''
      keyword = keyword.trim()
      that.list = data.filter((item) => ((item.name && item.name.indexOf(keyword.toUpperCase())) ||
            (item.letter && item.letter.indexOf(keyword.toUpperCase())) ||
            (item.spell && item.spell.indexOf(keyword.toLowerCase())) ||
            (item.short && item.short.indexOf(keyword.toUpperCase()))))
    },
    set() {
      let that = this
      this.$emit('update:select_id', that.id)
      that.$emit('choose', that.$deepCopy(that.id), that.$deepCopy(that.pool))
    },
    clear() {
      this.id = ''
      this.set()
    },
    focus() {
      this.generateList()
    }
  },
  watch: {
    select_id(val) {
      this.id = this.$deepCopy(val)
    }
  }
}
</script>
