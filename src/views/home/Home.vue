<template>
  <div>
    <el-button @click="getList" type="primary">demo</el-button>
    <el-button @click="getWeChatAccount" type="primary">weChat</el-button>
    <el-button @click="autoLogin" type="primary">autoLogin</el-button>
    <normal-select ref="normalSelect" :select_id="this.$store.state.app.layout" @update:select_id="getId">
      <template slot="option" slot-scope="scope">
        <span>{{ scope.scope.name}}</span>
      </template>
    </normal-select>
    <digital-clock></digital-clock>
  </div>
</template>

<script>
import { getEmployeeList, getWeChatAccount } from '@/api/weChat'
import { autoLogin } from '../../api/admin'
import NormalSelect from '../../components/selection/NormalSelect'

export default {
  name: 'home',
  components: {
    NormalSelect,
    DigitalClock: () => import('../../components/tool/DigitalClock')
  },
  mounted() {
    this.$refs.normalSelect.pool = [{ id: 0, name: '模板1' }, { id: 1, name: '模板2' }]
    this.$refs.normalSelect.init()
  },
  methods: {
    async getList() {
      await getEmployeeList()
    },
    async getWeChatAccount() {
      await getWeChatAccount()
    },
    async autoLogin() {
      await autoLogin({
        driver_code: this.$store.state.user.driverCode,
        type: 1
      })
    },
    getId(id) {
      this.$store.dispatch('app/changeLayout', id)
    }
  }
}
</script>
