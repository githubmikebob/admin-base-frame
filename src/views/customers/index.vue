<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm.$dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="search.user"
                    width="30%"/>
      <radio-group :type.sync="keyword.status.value" target="item.state"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions"/>
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

export default {
  name: 'customer',
  mixins: [requesting],
  created() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  components: {
    NormalTable: () => import('../../components/table/NormalTable'),
    RadioGroup: () => import('../../components/tool/RadioGroup'),
    add: () => import('./add'),
  },
  data() {
    return {
      vm: this,
      url: '/Employee/Index',
      status_url: '/User/Status',
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
        { name: 'users.username', prop: 'employee.name', width: '160', type: 'text' },
        { name: 'users.mobile', prop: 'employee.mobile', width: '180', type: 'text' },
        { name: 'users.identity', prop: 'employee.identity', width: '180', type: 'text' },
        { name: 'users.salary', prop: 'employee.salary', width: '180', type: 'price' },
        { name: 'users.created_at', prop: 'employee.created_at', width: '140', type: 'text' },
        { name: 'users.leaved_at', prop: 'employee.leaved_at', width: '140', type: 'text' },
        { name: 'item.remark', prop: 'employee.remark', type: 'text' },
        { name: 'item.status', prop: 'employee.status', type: 'status', fixed: 'right' },
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
          this.$dialog.initInfo(this.$refs.add, row.company.id)
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
