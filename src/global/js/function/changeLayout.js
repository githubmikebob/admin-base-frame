import store from '../../../store'
import Layout from '../../../layout/Layout'
import LayoutOne from '../../../layout/LayoutOne'

/**
 * 动态获取layout
 * @param i 对应模板的下标
 * @param l 对应模板的组件地址数组
 * */
export const changLayout = (i = 0, l = []) => {
  return l[i]
}

let layoutList = [Layout, LayoutOne]
const LAYOUT = changLayout(store.state.app.layout, layoutList)

export default LAYOUT