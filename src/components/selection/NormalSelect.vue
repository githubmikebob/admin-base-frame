<template>
  <el-select
    v-model="id"
    :loading="requesting"
    :disabled="disabled"
    :filter-method="generateList"
    :clearable="clearable"
    @clear="clear"
    @focus="focus"
    @change="set()"
    filterable
    :placeholder="placeholder"
    :style="'width: ' + selectWidth + '; margin-left:' + margin_left"
    :size="global_size"
    value="">
    <el-option v-if="show_all" :label="label_all" :value="value_all">
      <span style="float: left">{{ $t('base.all') }}</span>
    </el-option>
    <el-option v-for="item in list" :key="item[value]" :label="item[label]" :value="item[value]">
      <template>
        <slot name="option" :scope="item"></slot>
      </template>
    </el-option>
  </el-select>
</template>

<script>
import global_size from '../../global/js/mixin/global_size'
import requesting from '../../global/js/mixin/requesting'
import deepCopy from '../../global/js/function/deepCopy'

export default {
  name: 'normalSelect',
  mixins: [requesting, global_size],
  data() {
    return {
      id: '',
      pool: [],
      list: []
    }
  },
  props: {
    select_id: { required: true, type: [Number, String] },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    placeholder: {
      type: String, default() {
        return this.$t('base.search.keyword')
      }
    },
    selectWidth: { type: String, default: '100%' },
    margin_left: { type: String, default: '0' },
    show_all: { type: Boolean, default: false }, // 是否显示 全部选项
    label_all: {
      type: String, default() {
        return this.$t('base.all')
      }
    },
    value_all: { type: [Number, String], default: -1 },
    label: { type: String, default: 'name' }, // 下拉框展示的值
    value: { type: String, default: 'id' }, // 下拉框选中的值
  },
  methods: {
    init() {
      this.generateList()
      this.id = this.$deepCopy(this.select_id)
    },
    generateList(keyword) {
      let that = this
      let data = that.$deepCopy(that.pool)
      if (!keyword) {
        that.list = deepCopy(data)
      } else {
        keyword = keyword.trim()
        that.list = data.filter((item) => ((item.name && item.name.indexOf(keyword) > -1) ||
						(item.letter && item.letter.indexOf(keyword.toUpperCase()) > -1) ||
						(item.spell && item.spell.indexOf(keyword.toLowerCase()) > -1) ||
						(item.short && item.short.indexOf(keyword.toUpperCase()) > -1)))
      }
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
