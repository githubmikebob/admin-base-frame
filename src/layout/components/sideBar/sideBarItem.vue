<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.hasOwnProperty('meta')">
        <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="resolvePath(onlyOneChild.path)"
                      :align="isCollapse ? 'left' : 'center'">
          <i :class="onlyOneChild.meta.icon" class="menu-icon icon"/>
          <span class="menu-title" slot="title">{{ transformMenu(onlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu :index="resolvePath(item.path)" :align="isCollapse ? 'left' : 'center'" popper-append-to-body
                ref="subMenu" v-else>
      <template slot="title">
        <i :class="item.meta.icon" class="menu-icon icon"/>
        <span class="menu-title" slot="title">{{ transformMenu(item.meta.title) }}</span>
      </template>
      <side-bar-item
        :base-path="resolvePath(child.path)"
        :is-nest="true"
        :item="child"
        :key="child.path"
        class="nest-menu"
        v-for="child in item.children"
      />
    </el-submenu>
  </div>
</template>

<script>
import MenuItem from '../../mixin/MenuItem'
import fixIOSBug from '../../mixin/fixiOSBug'

export default {
  name: 'sideBarItem',
  mixins: [fixIOSBug, MenuItem],
  components: {},
  computed: {
    isCollapse() {
      return this.$store.state.app.sidebar.opened
    }
  },
  data() {
    return {
    }
  },
  props: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .menu-wrapper {
    .menu-icon {
      width: 3vh;
    }

    .menu-title {
      font-weight: bold;
    }

    .menu-title-box {
      text-align: left;
    }
  }
</style>
