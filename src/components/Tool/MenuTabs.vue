<template>
  <div class="menu-tabs">
    <el-tabs :value="actionTab" type="card" @tab-click="handleTabClick">
      <template v-for="tab in tabs">
        <el-tab-pane :label="transformMenu(tabName(tab))" :name="tabName(tab)" :key="tabName(tab)">
          <component :is="tab"></component>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Tabs, TabPane } from 'element-ui'
import transformMenu from '../../global/js/mixin/transformMenu'

export default {
  name: 'MenuTabs',
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  mixins: [transformMenu],
  props: {
    tabs: { required: true, type: Array }, // 所有tabs对应组件对象
    action: { type: Number, default: 0 }
  },
  data() {
    return {}
  },
  computed: {
    tabName() { // 返回组件name
      return (tab) => {
        return tab.name
      }
    },
    actionTab() { // 默认栏
      let tabNames = []
      this.tabs.map(item => {
        tabNames.push(item.name)
      })
      return tabNames[this.action]
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    handleTabClick(e) { // 点击切换tab回调

    },
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>

</style>