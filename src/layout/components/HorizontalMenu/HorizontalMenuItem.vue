<template>
  <div class="horizontal-menu-item" v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.hasOwnProperty('meta')">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta.icon" class="menu-icon icon"/>
          <span class="menu-title" slot="title">{{ transformMenu(onlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu :index="resolvePath(item.path)" popper-append-to-body ref="subMenu" v-else>
      <template slot="title">
        <i :class="item.meta.icon" class="menu-icon icon"/>
        <span class="menu-title" slot="title">{{ transformMenu(item.meta.title) }}</span>
      </template>
      <horizontal-menu-item
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

<script type='text/ecmascript-6'>
import MenuItem from '../../mixin/MenuItem'

export default {
  name: 'HorizontalMenuItem',
  mixins: [MenuItem],
  components: {},
  props: {},
  data() {
    return {
      isShowScroll: false,
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
  }
}
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .horizontal-menu-item {
    .menu-icon {
      margin-right: 10px;
    }
     .menu-title {
      margin-right: 20px;
    }
  }
</style>