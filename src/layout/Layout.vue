<template>
  <div :class="classObj" class="app-wrapper">
    <div @click="handleClickOutside" class="drawer-bg" v-if="device === 'mobile' && sidebar.opened"/>
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="3">
            <img src="../assets/img/header_logo.png"/>
          </el-col>
          <el-col :span="19">
            <nav-bar/>
          </el-col>
          <el-col :span="2">
            <app-dropdown></app-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <side-bar class="sidebar-container"/>
        <div :class="{hasTagsView:needTabsView}" class="main-container">
          <tabs-view v-if="needTabsView"/>
          <app-main/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AppMain, NavBar, SideBar, TabsView, AppDropdown } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { Container, Header, Aside, Main } from 'element-ui'


export default {
  name: 'Layout',
  components: {
    AppMain,
    SideBar,
    NavBar,
    TabsView,
    AppDropdown,
    [Container.name]: Container,
    [Header.name]: Header,
    [Aside.name]: Aside,
    [Main.name]: Main,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      device: state => state.app.device,
      sidebar: state => state.app.sidebar,
      needTabsView: state => state.settings.tabsView,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../global/css/mixin"
  @import "../global/css/variables"

  .app-wrapper
    @include clearfix
    position: relative
    height: 100%
    width: 100%

    .el-header, .el-main
      padding: 0

      .el-row
        height: 54px
        background-color: #304156
        color: #fff

        .el-col
          height: 100%
          overflow: hidden

          &:first-child, &:last-child
            display: flex
            align-items: center
            justify-content: center

          &:last-child
            padding: 0 15px 0 0

    &.mobile.openSidebar
      position: fixed
      top: 0

  .drawer-bg
    background: #000
    opacity: 0.3
    width: 100%
    top: 0
    height: 100%
    position: absolute
    z-index: 999

</style>
