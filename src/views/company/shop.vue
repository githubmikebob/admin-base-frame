<template>
  <el-dialog
          :title="title"
          :visible.sync="dialog"
          @opened="open()"
          append-to-body
          class="small_dialog"
          top="8vh"
          width="880">
    <div class="tool-bar">
      <open-button @open="vm._dialog.open(vm)" />
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="shop"
                    width="30%"/>
      <search-button @search="search"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="list" :table="requesting" @actions="actions" :paginationSize="8" :page="page"/>
    <pagination :mark="url" :page.sync="page" :size.sync="size" :total="total"></pagination>
    <add ref="add"></add>
  </el-dialog>
</template>

<script>
import normalTable from '../../components/table/normalTable'
import add from '../shop/add'

// import verify from '../../global/js/common/verify'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'
import search from '../../global/js/table/search'
import { apiPost } from '../../global/js/common/http'


export default {
  name: 'shopList',
  mixins: [globalSize, requesting],
  components: {
    normalTable,
    add
  },
  created() {
    // this.rule = verify('company', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      url: '/Shop/GetList',
      localSearch: false,
      layout: 1,
      keyword: {
        keyword: { key: ['title'], value: '', type: 'keyword' },
      },
      dialog: false,
      title: '',
      list: [],
      company_id: 0,
      page: 1,
      size: 8,
      total: 0,
      columns: [
        { name: '#', prop: '', width: '', type: 'index', fixed: 'left' },
        { name: 'shop.name', prop: 'name', width: '180', type: 'text' },
        { name: 'shop.contact', prop: 'shop.contact', width: '90', type: 'text' },
        { name: 'shop.mobile', prop: 'contact_mobile', width: '100', type: 'text' },
        { name: 'item.remark', prop: 'remark', type: 'text' },
        {
          type: 'action', buttons: [
            { name: 'button.edit', prop: '', type: 'success', event: 'edit' },
          ]
        }
      ]
    }
  },
  methods: {
    search,
    actions(type, row) {
      if (type === 'edit') {
        this._dialog.initInfo(this.$refs.add, row.id)
      }
    },
    open() {
      this.title = this.$t('shop.shopList')
      let that = this
      apiPost(that.url, { page: that.page, size: that.size, company_id: that.company_id }).then((res) => {
        if (res.code === 200) {
          that.list = res.data
          that.total = res.meta.total
        }
      })
    }
  },
  watch: {
    page() {
      this.search()
    }
  }
}
</script>
