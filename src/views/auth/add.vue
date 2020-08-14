<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      top="8vh"
      class="small_dialog"
      width="600px"
      :close-on-click-modal="false">
    <el-form :model="form" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="menu_id" v-show="false"/>
      <el-form-item prop="id" v-show="false"/>
      <el-form-item prop="name" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :key="index" :label="$t('auth.' + index)" v-for="(rule, index) in buttons">
        <el-button :disabled="requesting" v-for="btn in rule" :key="'btn_' + btn.sort"
                   :type="(parseInt(btn.status) === 1) ? 'primary' : 'default'" @click="handleRule(btn)"
                   class="rule-button" plain size="mini">{{$t('auth.' + btn.name)}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { close, title } from '../../global/js/common/dialog'
import { setField } from '../../global/js/common/data'
// import {apiPost} from '../../global/js/common/http'
import requesting from '../../global/js/mixin/requesting'

export default {
  name: 'addAuth',
  mixins: [requesting],
  data() {
    return {
      vm: this,
      add_url: '/UserRule/Create',
      info_url: '/UserRule/Info',
      add: true,
      dialog: false,
      title: title(this, 'auth.auth'),
      buttons: {
        base: [
          { id: '', name: 'Index', sort: 1, status: 2 },
          { id: '', name: 'Add', sort: 2, status: 2 },
          { id: '', name: 'Status', sort: 3, status: 2 },
          { id: '', name: 'Upload', sort: 4, status: 2 },
          { id: '', name: 'Import', sort: 5, status: 2 },
          { id: '', name: 'Export', sort: 6, status: 2 },
          { id: '', name: 'Recharge', sort: 7, status: 2 },
          { id: '', name: 'Reload', sort: 8, status: 2 },
          { id: '', name: 'Create', sort: 9, status: 2 },
          { id: '', name: 'Git', sort: 10, status: 2 },
          { id: '', name: 'Env', sort: 11, status: 2 },
          { id: '', name: 'Apply', sort: 12, status: 2 },
          { id: '', name: 'Open', sort: 13, status: 2 }
        ]
      },
      form: {
        id: '',
        menu_id: '',
        name: '',
        // type: '',
        // sort: 1,
        // status: 2
      },
      rules: []
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
      })
    },
    close() {
      close(this)
      this.$emit('refresh')
    },
    checkRules() {
      // 清空权限
      for (let b in this.buttons) {
        if (this.buttons.hasOwnProperty(b)) {
          for (let rule of this.buttons[b]) {
            rule.id = ''
            rule.status = 2
          }
        }
      }
      let rules = this.deepCopy(this.rules)
      // 循环权限
      for (let b in this.buttons) {
        if (this.buttons.hasOwnProperty(b)) {
          for (let btn of this.buttons[b]) {
            for (let rule of rules) {
              if (btn.name === rule.name) {
                btn.id = rule.id
                btn.status = rule.status
              }
            }
          }
        }
      }
    },
    handleRule(rule) {
      // let that = this
      if (!rule.id || (rule.id && rule.status === 2)) rule.status = 1
      else rule.status = 2
      let menu_id = { menu_id: this.form.menu_id }
      this.form = setField(this.form, rule)
      this.form = setField(this.form, menu_id)
      // console.log(this.form)
      // this.$store.dispatch('alert/setMark', this.url)
      // apiPost(that.add_url, that.form).then((res) => {
      //   if (res.code === 200) {
      //     that.rules.push(res.data)
      //     that.checkRules()
      //     that.$refs.form.resetFields()
      //   }
      // })
    }
  }
}
</script>
