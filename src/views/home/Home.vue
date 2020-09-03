<template>
  <div>
    <el-button @click="getList" type="primary">demo</el-button>
    <el-button @click="getWeChatAccount" type="primary">weChat</el-button>
    <el-button @click="autoLogin" type="primary">autoLogin</el-button>
  </div>
</template>

<script>
import { getEmployeeList, getWeChatAccount } from '@/api/weChat'
import { autoLogin } from '@/api/base'

export default {
  name: 'home',
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
    }
  }
}
</script>
