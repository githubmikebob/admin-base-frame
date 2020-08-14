import Vue from 'vue'
import Cookies from 'js-cookie'
import { Row, Col, Table, TableColumn, Form, FormItem, Button, Input, Tooltip, Select, Dialog, Option, DatePicker, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$ELEMENT = { size: Cookies.get('size') || 'mini', zIndex: 3000 }

Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Loading)
