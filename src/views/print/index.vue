<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm._dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="print"
                    width="30%"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable"/>
  </div>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import requesting from '../../global/js/mixin/requesting'
import add from './add'

import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'print',
  mixins: [requesting],
  created() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  components: {
    normalTable,
    add,
  },
  data() {
    return {
      vm: this,
      url: '/PrintTemplate/Index',
      status_url: '/PrintTemplate/Status',
      localSearch: false,
      layout: 1,
      keyword: {
        keyword: { key: ['title'], value: '', type: 'keyword' },
        status: { key: 'status', value: -1, type: 'int' }
      },
      list: [],
      page: 1,
      size: this.autoTableHeight(0, 37, 37, 0, 1),
      total: 0,
      columns: [
        { name: '#', prop: '', width: '', type: 'index', fixed: 'left' },
        { name: 'print.type', prop: 'type_name', width: '120', type: 'text' },
        { name: 'print.name', prop: 'name', type: 'text' },
        { name: 'print.url', prop: 'url', type: 'text' },
        { name: 'item.status', prop: 'status', type: 'status', fixed: 'right' },
        {
          type: 'action', buttons: [
            { name: 'button.edit', prop: '', type: 'success', event: 'edit' }
          ]
        }
      ],
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
          this._dialog.initInfo(this.$refs.add, row.id)
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
