<template>
  <div>
    <div class="tab-tool-bar">
      <open-button @open="vm._dialog.open(vm)" />
      <refresh-button @refresh="refreshTable" />
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="auth" width="30%" />
      <radio-group :type.sync="keyword.status.value" target="item.state" />
      <search-button @search="search" />
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" :tabHeight="39" @actions="actions"></normal-table>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable" />
  </div>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import radioGroup from '../../components/tool/radioGroup'
import requesting from '../../global/js/mixin/requesting'
import add from './add'

import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'authGroup',
  mixins: [requesting],
  components: {
    radioGroup,
    normalTable,
    add
  },
  data() {
    return {
      vm: this,
      url: '/UserGroup/Index',
      status_url: '/UserGroup/Status',
      localSearch: false,
      layout: 1,
      keyword: {
        keyword: { key: ['title'], value: '', type: 'keyword' },
        status: { key: 'status', value: -1, type: 'int' }
      },
      list: [],
      page: 1,
      size: this.autoTableHeight(0, 37, 37, 39, 1),
      total: 0,
      columns: [
        { name: '#', prop: '', width: '', type: 'index', fixed: 'left' },
        { name: 'auth_group.name', prop: 'name', width: '120', type: 'text' },
        { name: 'item.remark', prop: 'remark', width: '', type: 'text' },
        { name: 'item.status', prop: 'status', type: 'status', fixed: 'right' },
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
          this.edit(row)
          break
        case 'status':
          this.setStatus(row, false)
          break
      }
    },
    edit(row) {
      let add = this.$refs.add
      this._dialog.initInfo(add, row.id)
    }
  },
  watch: {
    page() {
      this.search()
    }
  }
}
</script>
