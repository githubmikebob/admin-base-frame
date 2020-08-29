<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm.$dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="search.menu"
                    width="30%"/>
      <radio-group :type.sync="keyword.status.value" target="item.state"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="menus" :page="page" :size="size" :table="requesting"
                  @actions="actions"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable"/>
  </div>
</template>

<script>
import requesting from '../../global/js/mixin/requesting'

import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'
import { menu, top_menu } from '../../dictionaries/menu';
import { edit } from '../../global/js/common/dialog';

export default {
  name: 'menu_list',
  mixins: [requesting],
  created() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  components: {
    NormalTable: () => import('../../components/table/NormalTable'),
    RadioGroup: () => import('../../components/tool/RadioGroup'),
    add: () => import('./add')
  },
  computed: { // 动态匹配数据
    menus() {
      let list = this.list
      let item
      for (let k in list) {
        if (list.hasOwnProperty(k)) {
          item = menu(list[k])
          Object.assign(item, { top_menu: top_menu(list[k]) })
          list[k] = item
        }
      }
      return list
    }
  },
  data() {
    return {
      vm: this,
      url: '/Menu/Index',
      status_url: '/Menu/Status',
      localSearch: false,
      layout: 1,
      keyword: {
        keyword: { key: ['title'], value: '', type: 'keyword' },
        status: { key: 'status', value: -1, type: 'int' }
      },
      list: [],
      page: 1,
      size: this.$autoTableHeight(0, 37, 37, 0, 1),
      total: 0,
      columns: [
        { type: 'index' },
        { name: 'menu.top_menu', prop: 'top_menu.name', width: '140', type: 'text' },
        { name: 'menu.name', prop: 'name', width: '140', type: 'text' },
        { name: 'item.remark', prop: 'remark', type: 'text', align: 'left' },
        { name: 'item.status', prop: 'status', type: 'status', fixed: 'right' },
        {
          type: 'action', buttons: [
            { name: 'button.edit', prop: '', type: 'success', event: 'edit' }
          ]
        }
      ]
    }
  },
  methods: {
    search,
    getTable,
    refreshTable,
    setStatus,
    actions(type, row) {
      switch (type) {
        case 'edit':
          edit(this, row.id)
          break
        case 'status':
          this.setStatus(row, false)
          break
      }
    }
  },
  watch: {
    page() {
      this.search()
    }
  }
}
</script>
