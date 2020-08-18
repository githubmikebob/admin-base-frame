<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm._dialog.open(vm)" />
      <refresh-button @refresh="refreshTable" />
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="company" width="30%" />
      <radio-group :type.sync="keyword.status.value" target="item.state" />
      <search-button @search="search" />
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions" />
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable" />
    <shop ref="shop"></shop>
  </div>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import radioGroup from '../../components/tool/radioGroup'
import requesting from '../../global/js/mixin/requesting'
import add from './add'
import shop from './shop'

import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'company',
  mixins: [requesting],
  created() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  components: {
    normalTable,
    radioGroup,
    add,
    shop
  },
  data() {
    return {
      vm: this,
      url: '/Company/Index',
      status_url: '/Company/Status',
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
        { name: '#', prop: '', width: '', type: 'index', fixed: 'left' },
        { name: 'company.name', prop: 'name', width: '220', type: 'text' },
        { name: 'company.contact', prop: 'company.contact', width: '100', type: 'text' },
        { name: 'company.mobile', prop: 'contact_mobile', width: '100', type: 'text' },
        { name: 'company.district', prop: ['province.name', 'city.name', 'district.name'], width: '180', type: 'text' },
        { name: 'company.address', prop: 'address', width: '220', type: 'text' },
        { name: 'item.remark', prop: 'remark', type: 'text' },
        { name: 'item.status', prop: 'status', type: 'status', fixed: 'right' },
        {
          type: 'action', width: '110', buttons: [
            { name: 'button.edit', prop: '', type: 'success', event: 'edit' },
            { name: 'shop.shop', prop: '', type: 'primary', event: 'shop' }
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
          this.$dialog.initInfo(this.$refs.add, row.id)
          break
        case 'shop':
          this.$refs.shop.company_id = row.id
          this.$refs.shop.dialog = true
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
