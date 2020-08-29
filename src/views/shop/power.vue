<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="8vh"
      width="580px">
    <el-form :model="form" :rules="rule" :size="global_size" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('shop.power')" prop="menus">
        <div style="height: 40vh; overflow-y: auto">
          <div :key="v.id" v-for="v in menus" style="margin-bottom: 12px">
            <el-checkbox style="font-weight: bold" v-model="v.check"
                         @change="(bool) => all(bool, v.menus)" :indeterminate="v.indeterminate">{{v.name}}
            </el-checkbox>
            <el-checkbox-group :disabled="requesting" style="display: inline-block" v-model="form.menus">
              <el-checkbox v-show="v.menus" v-for="menu in v.menus" :key="menu.id" :label="menu.id">{{menu.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <submit-button :saving="requesting" @close="close" @save="vm.$dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import { Checkbox, CheckboxGroup } from 'element-ui'

import requesting from '../../global/js/mixin/requesting'
import global_size from '../../global/js/mixin/global_size'
import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'
import { apiPost, checkCode } from '../../global/js/common/http'

export default {
  name: 'shopPower',
  mixins: [global_size, requesting],
  components: {
    SubmitButton: () => import('../../components/tool/SubmitButton'),
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  created() {
    this.rule = verify('shop', this.$deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      update_url: '/Shop/SetAccess',
      dialog: false,
      title: '',
      form: {
        id: 0,
        menus: [] // 所有选中权限的ID
      },
      select: {},
      auth_rules: [], // 获取所有权限数据
      rule: {},
    }
  },
  computed: {
    menus() {
      let rules = this.$deepCopy(this.auth_rules)   // 所有权限
      let rule = this.$deepCopy(this.form.menus)    // 选中权限
      for (let k in rules) {
        if (rules.hasOwnProperty(k)) {
          let check = true
          let indeterminate = false
          for (let v of rules[k].menus) {
            if (rule.indexOf(v.id) !== -1) indeterminate = true
            else check = false
          }
          rules[k].indeterminate = check ? false : indeterminate
          rules[k].check = check
        }
      }
      return rules
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.$dialog.title(this, 'shop.shopPower')
        this.getRules()
      })
    },
    close() {
      close(this)
      this.auth_rules = []
    },
    all(bool, menus) {
      let rules = this.$deepCopy(this.form.menus)
      for (let v of menus) {
        if (!bool) {
          for (let k in rules) {
            if (rules[k] === v.id) rules.splice(k, 1)
          }
        } else {
          if (rules.indexOf(v.id) === -1) rules.push(v.id)
        }
      }
      this.form.menus = rules
    },
    getRules() {   // 获取所有权限的数据
      let that = this
      apiPost('/Shop/InfoWithAccess', { id: that.form.id }).then(({ code, data }) => {
        if (checkCode(code)) {
          let shop = data.shop
          that.form = { id: shop.id, menus: shop.menus }
          that.auth_rules = data.menus
        }
      })
    }
  }
}
</script>
