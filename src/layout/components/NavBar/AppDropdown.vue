<template>
  <div class="app-dropdown">
    <base-dropdown :dropdown="dropdown" :menu-item="menuItem"></base-dropdown>
  </div>
</template>

<script type='text/ecmascript-6'>
import BaseDropdown from '../../../components/tool/BaseDropdown'
import { mapState } from 'vuex'
import { getCleanCache } from '../../../api/system'

export default {
  name: 'AppDropdown',
  components: {
    BaseDropdown,
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'user'
    ]),
    dropdown() {
      return { icon: 'fas fa-user', name: this.user.userInfo.name }
    },
    menuItem() {
      return [
        { icon: 'fab fa-weixin', name: 'button.bind_weChat', fun: () => this.clickItem('bind_weChat') },
        { icon: 'fas fa-user-cog', name: 'button.set_account', fun: () => this.clickItem('set_account') },
        { icon: 'fas fa-eraser', name: 'button.clear_cache', fun: () => this.clickItem('clear_cache') },
        { icon: 'fas fa-sign-out-alt', name: 'button.logout button.system', fun: () => this.clickItem('logout') }
      ]
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    async clickItem(type) {
      let res
      switch (type) {
        case 'clear_cache':
          res = await getCleanCache()
          this.$storage.clearData()
          this.$messages.notify(res.message, res.status)
          break
        case 'logout':
          await this.$store.dispatch('user/logout')
          break
      }
    }
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .app-dropdown {
    width: 100%;
    height: 100%;
  }
</style>