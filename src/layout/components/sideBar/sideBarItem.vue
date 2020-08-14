<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.hasOwnProperty('meta')">
        <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="resolvePath(onlyOneChild.path)"  :align="isCollapse ? 'left' : 'center'">
          <i :class="onlyOneChild.meta.icon" class="menu-icon" />
          <span class="menu-title" slot="title">{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu :index="resolvePath(item.path)" :align="isCollapse ? 'left' : 'center'" popper-append-to-body ref="subMenu" v-else>
      <template slot="title">
        <i :class="item.meta.icon" class="menu-icon" />
        <span class="menu-title" slot="title">{{item.meta.title}}</span>
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
import { Col, MenuItem, Row, Submenu } from 'element-ui'
import { isExternal } from '../../../global/js/common/data'
import { transformMenu } from '../../../locales/i18n/transformMenu'

import path from 'path'
import appLink from './link'
import fixIOSBug from './fixiOSBug'

export default {
  name: 'sideBarItem',
  mixins: [fixIOSBug],
  components: {
    appLink,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu,
    [Row.name]: Row,
    [Col.name]: Col
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.sidebar.opened
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  props: {
    item: { type: Object, required: true },
    isNest: { type: Boolean, default: false },
    basePath: { type: String, default: '' }
  },
  methods: {
    transformMenu,
    hasOneShowingChild(children = [], parent) {
      let showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
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
