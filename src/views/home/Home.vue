<template>
  <div>
    <el-button @click="getList" type="primary">demo</el-button>
    <el-button @click="autoLogin" type="primary">autoLogin</el-button>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/weChat'
import { autoLogin } from '@/api/default'

export default {
  name: 'home',
  methods: {
    async getList() {
      await getEmployeeList()
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
