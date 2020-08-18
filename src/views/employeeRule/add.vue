<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="opened()"
      append-to-body
      top="8vh"
      class="small_dialog"
      width="20%"
      :close-on-click-modal="false">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <el-form-item prop="id" v-show="false"/>
      <el-form-item prop="menu_id" v-show="false"/>
      <el-form-item :label="$t('employee_rule.rule')" prop="rule">
        <el-input :disabled="requesting" v-model="form.rule" show-word-limit :maxlength="60" :placeholder="$t('employee_rule.placeholder.rule')"/>
      </el-form-item>
    </el-form>
    <alert ref="alert" :mark="[create_url, update_url]" />
    <submit-button :saving="requesting" @close="close" @save="vm.$dialog.save(vm)"/>
  </el-dialog>
</template>

<script>

import verify from '../../global/js/common/verify'
import { close } from '../../global/js/common/dialog';

import submitButton from '../../components/tool/submitButton'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'

export default {
  name: 'employee_rule_add',
  mixins: [globalSize, requesting],
  components: {
    submitButton
  },
  created() {
    this.rule = verify('employee_rule', this.$deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      create_url: '/EmployeeRule/Create',
      update_url: '/EmployeeRule/Update',
      info_url: '/EmployeeRule/Info',
      dialog: false,
      title: '',
      form: {
        id: 0,
        menu_id: '',
        rule: '',
        remark: '',
      },
      rule: {}
    }
  },
  methods: {
    opened() {
      this.$nextTick(() => {
        this.$dialog.title(this, 'employee_rule.employee_rule')
        // 获取数据
      })
    },
    close() {
      close(this)
    },
  }
}
</script>
