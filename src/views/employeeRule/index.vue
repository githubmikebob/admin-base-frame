<template>
  <div>
    <div class="tool-bar">
      <refresh-button @refresh="refreshTable"/>
    </div>
    <normal-table ref="table" :columns="columns" :list="rules" :page="page" :size="size" :table="requesting" @actions="actions"/>
    <add ref="add" @refresh="refreshTable"/>
  </div>
</template>

<script>
import requesting from '../../global/js/mixin/requesting'

import search from '../../global/js/table/search'
import setStatus from '../../global/js/table/setStatus'
import getTable from '../../global/js/table/getTable'
import refreshTable from '../../global/js/table/refreshTable'

import { menu, rules, top_menu } from '../../dictionaries/menu'
// import { employee_rule } from '../../dictionaries/employee_rule'
import { open } from '../../global/js/common/dialog'

export default {
  name: 'employee_rule_list',
  mixins: [requesting],
  components: {
    add: () => import('./add'),
    NormalTable: () => import('../../components/table/NormalTable'),
  },
  computed: {
    rules() {
      let list = this.list
      let item
      for (let k in list) {
        if (list.hasOwnProperty(k)) {
          item = menu(list[k])
          Object.assign(item, { top_menu: top_menu(list[k]) })
          Object.assign(item, { rules: rules(list[k]) })
          list[k] = item
        }
      }
      return list
    }
  },
  created() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  data() {
    return {
      url: '/EmployeeRule/Index',
      status_url: '/Menu/Status',
      localSearch: false,
      layout: 1,
      list: [],
      page: 1,
      size: this.$autoTableHeight(0, 37, 37, 0, 1),
      total: 0,
      columns: [
        { type: 'index' },
        { name: 'menu.top_menu', prop: 'top_menu.name', width: '140', type: 'text' },
        { name: 'menu.menu', prop: 'name', width: '140', type: 'text' },
        { name: 'menu.rules', prop: 'rules', type: 'array' },
        { name: 'item.status', prop: 'status', type: 'status', fixed: 'right' },
        {
          type: 'action', buttons: [
            { name: 'button.add', prop: '', type: 'success', event: 'add' }
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
        case 'add':
          open(this)
          this.$refs.add.$nextTick(() => {
            this.$refs.add.form.menu_id = row.id
          })
          break
        case 'status':
          this.setStatus(row, false)
          break
      }
    }
  }
}
</script>
