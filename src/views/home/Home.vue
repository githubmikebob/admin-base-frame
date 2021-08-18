<template>
  <div>
    <el-button @click="getList" type="primary">demo</el-button>
    <el-button @click="getWeChatAccount" type="primary">weChat</el-button>
    <el-button @click="autoLogin" type="primary">autoLogin</el-button>
    <normal-select v-model="id" :data="list" @change="change"></normal-select>
    <digital-clock></digital-clock>
  </div>
</template>

<script>
import { getEmployeeList, getWeChatAccount } from '@/api/weChat'
import { autoLogin } from '../../api/admin'
import NormalSelect from '../../components/Selection/NormalSelect'

export default {
  name: 'home',
  components: {
    NormalSelect,
    DigitalClock: () => import('../../components/Tool/DigitalClock')
  },
  data() {
    return {
      id: 0,
      list: [{ id: 0, name: '模板1' }, { id: 1, name: '模板2' }]
    }
  },
  watch: {},
  mounted() {
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
    change(id) {
      this.$store.dispatch('app/changeLayout', id)
    }
  }
}
</script>
