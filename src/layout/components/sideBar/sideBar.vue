<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :default-active="activeMenu"
        :unique-opened="true"
        active-text-color="#2EBAAE"
        background-color="#304156"
        mode="vertical"
        text-color="#bfcbd9"
      >
        <side-bar-item :base-path="route.path" :item="route" :key="route.path" v-for="route in permission_routes" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Menu, Scrollbar } from 'element-ui'
import sideBarItem from './sideBarItem'

export default {
  name: 'SideBar',
  components: {
    sideBarItem,
    [Menu.name]: Menu,
    [Scrollbar.name]: Scrollbar
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
