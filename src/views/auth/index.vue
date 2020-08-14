<template>
  <div>
    <div class="tab-tool-bar">
      <!--      <open-button @open="vm._dialog.open(vm)"/>-->
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="menu"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" :tabHeight="39" @actions="actions"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable"/>
  </div>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import add from './add'

import requesting from '../../global/js/mixin/requesting'
import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'auth',
  mixins: [requesting],
  components: {
    normalTable,
    add
  },
  data() {
    return {
      vm: this,
      url: '/UserRule/Index',
      status_url: '/UserRule/Status',
      localSearch: false,
      layout: 1,
      keyword: {
        keyword: { key: ['title'], value: '', type: 'keyword' },
      },
      list: [],
      page: 1,
      size: this.autoTableHeight(0, 37, 37, 40, 1),
      total: 0,
      columns: [
        { name: '#', prop: '', width: '', type: 'index', fixed: 'left' },
        { name: 'menu.parent', prop: 'menu.name', width: '120', type: 'text', language: 'menu' },
        { name: 'menu.Menu', prop: 'name', width: '120', type: 'text', language: 'menu' },
        {
          name: 'auth.children', prop: 'rules', tag_prop: 'name', closeable: true, width: '',
          type: 'tags', language: 'auth', close: 'status'
        },
        {
          type: 'action', buttons: [
            { name: 'button.edit', prop: '', type: 'primary', event: 'edit' }
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
    init() {
      this.getTable()
    },
    actions(type, row) {
      switch (type) {
        case 'edit':
          this._dialog.initInfo(this.$refs.add, row.id)
          break
        case 'status':
          this.setStatus(row)
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
