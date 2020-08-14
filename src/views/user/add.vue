<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="15vh"
      width="400px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('users.nickname')" prop="nickname">
        <el-input :disabled="requesting" v-model="form.nickname"/>
      </el-form-item>
      <el-form-item :label="$t('users.username')" prop="username">
        <el-input :disabled="requesting" v-model="form.username"/>
      </el-form-item>
      <el-form-item :label="$t('users.password')" prop="password">
        <el-input :disabled="requesting" v-model="form.password" :placeholder="$t('users.placeholder.password')"/>
      </el-form-item>
      <el-form-item :label="$t('users.groups')" prop="groups">
        <el-input :disabled="requesting" v-model="form.groups"/>
      </el-form-item>
      <el-form-item :label="$t('users.mobile')" prop="mobile">
        <el-input :disabled="requesting" v-model="form.mobile"/>
      </el-form-item>
      <el-form-item :label="$t('users.email')" prop="email">
        <el-input :disabled="requesting" v-model="form.email"/>
      </el-form-item>
    </el-form>
    <submit-button :saving="requesting" @close="close" @save="vm._dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import submitButton from '../../components/tool/submitButton'

import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'
import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'

export default {
  name: 'addUser',
  mixins: [globalSize, requesting],
  components: {
    submitButton
  },
  created() {
    this.rule = verify('users', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/User/Create',
      update_url: '/User/Update',
      info_url: '/User/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        nickname: '',
        username: '',
        password: '',
        groups: ['1'],
        mobile: '',
        email: '',
      },
      rule: {},
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'users.user')
        this.password()
      })
    },
    close() {
      close(this)
    },
    password() {
      // if () {
      //
      // }
      console.log(this.title)
    }
  }
}
</script>
