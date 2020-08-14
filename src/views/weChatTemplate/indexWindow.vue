<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="8vh"
      width="880px">
    <div id="head">
      <open-button @open="vm._dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="" width="30%"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions" :pagination-size="size"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add-index ref="add" @refresh="refreshTable"/>
  </el-dialog>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import addIndex from './addIndex'
import verify from '../../global/js/common/verify'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'
import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

export default {
  name: 'addWeChatTemplate',
  mixins: [globalSize, requesting],
  components: {
    normalTable,
    addIndex
  },
  computed: {},
  created() {
    this.rule = verify('weChatTemplate', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/WeChatTemplate/Create',
      update_url: '/WeChatTemplate/Update',
      info_url: '/WeChatTemplate/Info',
      dialog: false,
      title: '',
      rule: {},
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
      size: 10,
      total: 0,
      columns: [
        { name: '#', prop: '', width: '', type: 'index', fixed: 'left' },
        { name: 'we_chat_template.index_name', prop: 'type', width: '120', type: 'text' },
        { name: 'we_chat_template.tag', prop: 'number', width: '220', type: 'text' },
        { name: 'we_chat_template.example', prop: 'name', width: '220', type: 'text' },
        { name: 'item.remark', prop: 'remark', type: 'text' },
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
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'we_chat_template.index')
        // 获取数据
      })
    },
    close() {
      this.dialog = false
    },
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

<style>
  #head {
    margin-bottom: 10px;
  }
</style>