<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm.$dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="search.shop"
                    width="30%"/>
      <radio-group :type.sync="keyword.status.value" target="item.state"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable"/>
    <power ref="power" @refresh="refreshTable"/>
  </div>
</template>

<script>
// import {apiPost} from '../../global/js/common/http'
import requesting from '../../global/js/mixin/requesting'
import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'shop',
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
    power: () => import('./power')
  },
  data() {
    return {
      vm: this,
      url: '/Shop/Index',
      status_url: '/Shop/Status',
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
        { name: 'shop.name', prop: 'name', width: '180', type: 'text' },
        { name: 'company.name', prop: 'company.name', width: '220', type: 'text' },
        { name: 'shop.contact', prop: 'contact', width: '90', type: 'text' },
        { name: 'shop.mobile', prop: 'contact_mobile', width: '100', type: 'text' },
        { name: 'shop.district', prop: ['province.name', 'city.name', 'district.name'], width: '180', type: 'text' },
        { name: 'shop.expired_at', prop: 'expired_at', width: '140', type: 'text' },
        { name: 'item.remark', prop: 'remark', type: 'text' },
        { name: 'item.status', prop: 'status', type: 'status', fixed: 'right' },
        {
          type: 'action', width: '110', buttons: [
            { name: 'button.edit', prop: '', type: 'success', event: 'edit' },
            { name: 'shop.power', prop: '', type: 'primary', event: 'power' }
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
        case 'status':
          this.setStatus(row, false)
          break
        case 'power':
          this.openPower(row)
          break
      }
    },
    openPower(row) {
      let power = this.$refs.power
      power.form.id = row.id
      power.dialog = true
    }
  },
  watch: {
    page() {
      this.search()
    }
  }
}
</script>
