import path from 'path'
import AppLink from '../../components/tool/AppLink'
import { MenuItem, Submenu } from 'element-ui'
import { isExternal } from '../../global/js/common/data'
import transformMenu from '../../global/js/mixin/transformMenu'

export default {
  props: {
    item: { type: Object, required: true },
    isNest: { type: Boolean, default: false },
    basePath: { type: String, default: '' }
  },
  mixins: [transformMenu],
  components: {
    AppLink,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      let showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 临时设置（只有一个显示子项时使用）
          this.onlyOneChild = item
          return true
        }
      })
      // 当只有一个子路由器时，默认显示子路由器
      if (showingChildren.length === 1) {
        return true
      }
      // 如果没有要显示的子路由器，则显示父路由器
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