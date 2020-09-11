<template>
  <div class="horizontal-menu">
    <el-menu
      ref="menu"
      unique-opened
      :default-active="activeMenu"
      active-text-color="#2EBAAE"
      background-color="#304156"
      text-color="#bfcbd9"
      mode="horizontal"
      menu-trigger="hover"
      :class="{ 'position-absolute': !isShowScroll }"
      @mouseover.native="isShowScroll = true"
      @mouseleave.native="isShowScroll = false"
    >
      <horizontal-menu-item :base-path="route.path" :item="route" :key="route.path"
                            v-for="route in permission_routes"></horizontal-menu-item>
    </el-menu>
  </div>
</template>

<script type='text/ecmascript-6'>

import { Menu } from 'element-ui'
import { mapGetters } from 'vuex'
import scrollX from '../../../global/js/function/scrollX'

export default {
  name: 'HorizontalMenu',
  components: {
    HorizontalMenuItem: () => import('./HorizontalMenuItem'),
    [Menu.name]: Menu
  },
  props: {},
  data() {
    return {
      isShowScroll: false
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
  watch: {},
  mounted() {
    // 添加滚动监听
    const DOM = this.$refs['menu'].$el
    scrollX(DOM)
  },
  methods: {}
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  @import "../../../global/css/mixin.scss";

  .horizontal-menu {
    height: 55px;
    position: relative;

    .el-menu--horizontal {
      @include scrollBarStyle;
      height: 100%;
      min-width: 100%;
      display: flex;
      overflow-y: hidden;
      overflow-x: auto;

      &.position-absolute {
        position: absolute;
        top: 0;
      }
    }
  }
</style>