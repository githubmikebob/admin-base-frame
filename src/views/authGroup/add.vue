<template>
  <el-dialog
    :before-close="close"
    @opened="open()"
    :title="title"
    :visible.sync="dialog"
    append-to-body
    class="small_dialog"
    top="8vh"
    width="60%">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="100px" ref="form">
      <el-form-item prop="id" v-show="false" />
      <el-form-item prop="name" :label="$t('auth_group.name')">
        <el-input :disabled="requesting" class="input" v-model="form.name" :placeholder="$t('auth_group.placeholder.name')" />
      </el-form-item>
      <el-form-item :label="$t('item.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark" :placeholder="$t('item.placeholder.remark')" />
      </el-form-item>
      <el-form-item prop="rules" :label="$t('auth.auth')">
        <div style="height: 40vh; overflow-y: auto">
          <div :key="v.id" v-for="v in rules">
            <el-checkbox :disabled="requesting || (!v.rules || v.rules.length <= 0)" :indeterminate="v.indeterminate" @change="(bool) => all(bool, v.rules)"
                         style="width: 120px" v-model="v.checkAll">{{$t('menu.' + v.name)}}
            </el-checkbox>
            <el-checkbox-group :disabled="requesting" style="display: inline-block" v-model="check" @change="setRules">
              <el-checkbox :key="rule.id" :label="rule.id" v-for="rule in v.rules" v-show="v.rules">{{$t('auth.' + rule.name)}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <alert :mark="[add_url, update_url]" />
    <submit-button :saving="requesting" @close="close" @save="vm._dialog.save(vm)" />
  </el-dialog>
</template>

<script>
import { Checkbox, CheckboxGroup } from 'element-ui'
import submitButton from '../../components/tool/submitButton'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'

import { close, title } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'
import deepCopy from '../../global/js/function/deepCopy'
import { apiPost } from '../../global/js/common/http'

export default {
  name: 'addAuthGroup',
  mixins: [requesting, globalSize],
  created() {
    this.rule = verify('auth_group', deepCopy(this.form))
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    submitButton
  },
  computed: {
    rules() {
      let rules = deepCopy(this.auth_rules)
      let rule = deepCopy(this.form.rules)
      for (let k in rules) {
        if (rules.hasOwnProperty(k) && rules[k].hasOwnProperty('rules')) {
          let child = []
          for (let v of rules[k].rules) {
            for (let r of rule) {
              if (parseInt(r) === v.id) child.push(v.id)
            }
          }
          rules[k].checkAll = child.length === rules[k].rules.length
          rules[k].indeterminate = child.length > 0 && child.length < rules[k].rules.length
        }
      }
      return rules
    }
  },
  data() {
    return {
      vm: this,
      add_url: '/UserGroup/Create',
      update_url: '/UserGroup/Update',
      info_url: '/UserGroup/Info',
      add: true,
      dialog: false,
      title: title(this, 'auth_group.auth_group'),
      form: {
        id: '',
        name: '',
        rules: [], // 所有选中权限的ID
        remark: '',
        status: 1
      },
      check: [], // 所有选中权限的ID
      auth_rules: [], // 获取所有启用的权限数据
      rule: {} // 表单验证规则
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.getRules()
      })
    },
    close() {
      close(this)
      this.check = []
      this.auth_rules = []
    },
    /* checkRule() {
      this.check = []
      if (this.form.rules) {
        let rules = deepCopy(this.form.rules)
        for (let rule of this.rules) {
          if (rule.hasOwnProperty('rules')) {
            for (let v of rule.rules) {
              for (let r of rules) {
                if (parseInt(r) === parseInt(v.id)) {
                  this.check.push(parseInt(r))
                  break
                }
              }
            }
          }
        }
      }
    }, */
    // 选中全部
    all(bool, subrule) {
      let subruleID = []
      for (let v of subrule) {
        subruleID.push(parseInt(v.id))
      }
      let rules = this.check.filter(item => subruleID.indexOf(parseInt(item)) === -1)
      if (bool) rules = rules.concat(subruleID)
      this.check = rules
      this.setRules()
    },
    // 勾选单个
    setRules() {
      this.form.rules = this.check
    },
    // 获取所有启用的权限的数据
    getRules() {
      let that = this
      that.auth_rules = []
      apiPost('/UserRule/Index', { status: 1 }).then((res) => {
        if (res.code === 200) {
          that.auth_rules = res.data
          that.checkRule()
        }
      })
    }
  }
}
</script>
