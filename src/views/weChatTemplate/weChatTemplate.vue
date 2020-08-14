<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm._dialog.open(vm)"/>
      <!--      <open-button @open="vm._dialog.open(vm, 'indices')" name="we_chat_template.index" icon="fa-bars"/>-->
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="" width="30%"/>
      <radio-group :type.sync="keyword.status.value" target="item.state"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add" @refresh="refreshTable"/>
    <!--    <index-window ref="indices" @refresh="refreshTable" />-->
  </div>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import radioGroup from '../../components/tool/radioGroup'
import add from './add'
// import indexWindow from './indexWindow'

import requesting from '../../global/js/mixin/requesting'
import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'weChatTemplate',
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
    // indexWindow
  },
  data() {
    return {
      vm: this,
      url: '/WeChatTemplate/Index',
      status_url: '/WeChatTemplate/Status',
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
        { name: 'we_chat_template.type', prop: 'category.name', width: '140', type: 'text' },
        { name: 'sms_template.code', prop: 'code', width: '140', type: 'text' },
        { name: 'we_chat_template.name', prop: 'name', width: '200', type: 'text' },
        { name: 'we_chat_template.example', prop: 'demo', type: 'text' },
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
          this._dialog.initInfo(this.$refs.add, row.id)
          break
        case 'status':
          this.setStatus(row, false)
          break
      }
    },
  },
  watch: {
    page() {
      this.search()
    }
  }
}
</script>
