<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm._dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="git" width="30%"/>
      <radio-group :type.sync="keyword.status.value" target="item.state"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable"/>
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
  name: 'git',
  mixins: [requesting],
  created() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  components: {
    normalTable,
    radioGroup,
    add
  },
  data() {
    return {
      vm: this,
      url: '/Git/Index',
      status_url: '/Git/Status',
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
        { name: 'git.git', prop: 'git', width: '160', type: 'text' },
        { name: 'git.name', prop: 'name', width: '160', type: 'text' },
        { name: 'git.path', prop: 'path', width: '360', type: 'text' },
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
