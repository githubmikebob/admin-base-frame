<template>
  <div :class="classObj" class="app-wrapper">
    <div @click="handleClickOutside" class="drawer-bg" v-if="device === 'mobile' && sidebar.opened"/>
    <side-bar class="sidebar-container"/>
    <div :class="{hasTagsView:needTabsView}" class="main-container">
      <div class="fixed-header">
        <nav-bar/>
        <tabs-view v-if="needTabsView"/>
      </div>
      <app-main/>
      <!--      <right-panel v-if="showSettings">-->
      <!--        <settings />-->
      <!--      </right-panel>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AppMain, NavBar, SideBar, TabsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    AppMain,
    SideBar,
    NavBar,
    TabsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      device: state => state.app.device,
      sidebar: state => state.app.sidebar,
      showSettings: state => state.settings.showSettings,
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

  .fixed-header
    position: fixed
    top: 0
    right: 0
    z-index: 9
    width: calc(100% - #{$sideBarWidth})
    transition: width 0.38s

  .hideSidebar .fixed-header
    width: calc(100% - 54px)

  .mobile .fixed-header
    width: 100%
</style>