<template>
  <div class="nav_bar">
    <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" class="hamburger-container"
               id="hamburger-container"/>
    <breadcrumb class="breadcrumb-container" id="breadcrumb-container"/>
    <digital-clock></digital-clock>
  </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'navBar',
  components: {
    Breadcrumb: () => import('../../../components/Tool/Breadcrumb'),
    Hamburger: () => import('../../../components/Tool/Hamburger'),
	  DigitalClock: () => import('../../../components/Tool/DigitalClock'),
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'socket'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
    cleanCache() {
      this.$apiPost('/System/CleanCache', {}).then(res => {
        if (this.$checkCode(res.code)) this.$message.notify(res.message, res.status)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav_bar {
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #304156;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 50px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
      margin-right: 20px;
    }

  }
</style>
