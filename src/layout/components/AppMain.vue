<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'appMain',
  computed: {
    cachedViews() {
      return this.$store.state.tabsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>

.app-main {
  /* 50= nav_bar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 1vh;
  text-align: left;
  position: relative;
  /*margin-top: 34px;*/
  /*overflow: hidden;*/
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = nav_bar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 30px;
    margin-top: 60px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
