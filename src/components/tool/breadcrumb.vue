<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :key="index" v-for="(item,index) in levelList">
        <span class="no-redirect" v-if="item.redirect==='noRedirect' || index === levelList.length-1">
          {{ item.meta.title }}
        </span>
        <a @click.prevent="handleLink(item)" v-else>{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { transformMenu } from '../../locales/i18n/transformMenu'

export default {
  name: 'Breadcrumb',
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem
  },
  data() {
    return {
      levelList: null
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    transformMenu,
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    // 判断是否是首页
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect && redirect !== this.$route.path) {
        return this.$router.push(redirect)
      } else if (path !== this.$route.path) {
        if (redirect) {
          if (redirect !== this.$route.path) return this.$router.push(path)
        } else {
          return this.$router.push(path)
        }
      }
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
