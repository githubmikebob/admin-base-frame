<template>
  <el-select
          :disabled="disabled"
          :filter-method="search"
          :size="globalSize"
          @change="change"
          filterable
          v-model="id"
          :style="{width: selectWidth}">
    <el-option
            :key="item.id + '_' + index"
            :label="item.title"
            :value="item.id"
            v-for="(item, index) in list">
    </el-option>
  </el-select>
</template>

<script>
import { apiPost } from '../../global/js/common/http'
import globalSize from '../../global/js/mixin/globalSize'

export default {
  name: 'selectMenu',
  mixins: [globalSize],
  data() {
    return {
      url: '/UserMenu/GetTop',
      id: 0,
      top: true,
      pool: [],
      list: [],
      top_menu: {
        id: 0,
        title: '顶级菜单',
        name: 'Top',
        letter: 'D',
        short: 'DJCD',
        spell: 'dingjicaidan'
      }
    }
  },
  props: {
    menu_id: { required: true, type: Number },
    disabled: { type: Boolean, default: false },
    selectWidth: { type: String, default: '100%' },
    status: { type: Number, default: -1 }
  },
  methods: {
    change(id) {
      this.$emit('update:menu_id', id)
    },
    search(keyword) {
      let pool = this.deepCopy(this.pool)
      if (keyword) {
        this.list = pool.filter((item) => {
          return item.name.indexOf(keyword) || item.letter.indexOf(keyword.toUpperCase()) || item.spell.indexOf(keyword.toLowerCase()) || item.short.indexOf(keyword.toUpperCase())
        })
      } else {
        this.list = pool
      }
    },
    async getMenus(post = {}) {
      let key = 'top_user_menus'
      let that = this
      that.pool = []
      if (that.top) that.pool.push(that.top_menu)
      let menus = that.storage.get(key)
      if (menus) { that.pool = that.pool.concat(menus) }
      else {
        await apiPost(that.url, post).then((res) => {
          if (res.code === 200) {
            that.pool = that.pool.concat(res.data)
            that.storage.set(key, res.data, 3600)
          }
        })
      }
      that.search()
    },
    clear() {
      this.id = 0
    }
  }
}
</script>
