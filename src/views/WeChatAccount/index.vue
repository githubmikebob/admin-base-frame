<template>
  <div>
    <div class="tool-bar">
      <open-button @open="vm._dialog.open(vm)"/>
      <refresh-button @refresh="refreshTable"/>
      <search-input ref="searchInput" :keyword.sync="keyword.keyword.value" @search="search" placeholder="WeChatAccount"
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
import normalTable from '../../components/table/normalTable'
import radioGroup from '../../components/tool/radioGroup'
import requesting from '../../global/js/mixin/requesting'
import add from './add'

import search from '../../global/js/table/search'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'
import { apiPost } from '../../global/js/common/http'
import { notify } from '../../global/js/common/message'
import { setField } from '../../global/js/common/data'

export default {
  name: 'WeChatAccount',
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
      url: '/WeChatAccount/Index',
      status_url: '/WeChatAccount/Status',
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
        { name: 'we_chat_template.account', prop: 'name', width: '', type: 'text' },
        { name: 'shop.name', prop: 'company.name', width: '180', type: 'text' },
        { name: 'app_id', prop: 'app_id', width: '', type: 'text' },
        { name: 'users.created_at', prop: 'created_at', width: '140', type: 'text' },
        { name: 'shop.expired_at', prop: 'expired_at', width: '140', type: 'text' },
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
    search,
    getTable,
    refreshTable,
    actions(type, row) {
      let add = this.$refs.add
      switch (type) {
        case 'edit':
          apiPost(add.info_url, { app_id: row.app_id }).then((res) => {
            if (res.code === 200) {
              add.dialog = true
              add.$nextTick(() => {
                add['form'] = setField(add['form'], res.data)
              })
            }
          })
          break
        case 'status':
          this.changeStatus(row, false)
          break
      }
    },
    changeStatus(post, reverse = true) {
      if (post.hasOwnProperty('status') && post.hasOwnProperty('app_id')) {
        let status
        if (reverse) {
          status = post.status === 1 ? 'Disable' : 'Enable'
          post.status = post.status === 1 ? 2 : 1
        } else {
          status = post.status === 1 ? 'Enable' : 'Disable'
        }
        apiPost(this.status_url, { app_id: post.app_id, status: status }).then((res) => {
          this.getTable()
          notify(res.message, res.status)
        }).catch((err) => {
          post.status = post.status === 1 ? 2 : 1
          notify(err.message, err.status)
        })
      } else {
        notify('error.post')
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
