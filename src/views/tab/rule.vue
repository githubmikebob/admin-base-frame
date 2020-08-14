<template>
  <div>
    <el-tabs type="border-card" v-model="active" @tab-click="getTable">
      <el-tab-pane name="auth" :label="$t('menuTab.Auth.auth')">
        <auth ref="auth"></auth>
      </el-tab-pane>
      <el-tab-pane name="authGroup" :label="$t('menuTab.Auth.auth_group')">
        <auth-group ref="authGroup"></auth-group>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'element-ui'
import auth from '../auth/index'
import authGroup from '../authGroup/index'

export default {
  name: 'rule',
  created() {
    this.$nextTick(() => {
      let obj = { name: 'auth' }
      this.getTable(obj)
    })
  },
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    auth,
    authGroup,
  },
  data() {
    return {
      active: 'auth'
    }
  },
  methods: {
    getTable(obj) {
      this.$refs[obj.name].init()
    }
  }
}
</script>
