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
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('servers.name')" prop="name">
            <el-input :disabled="requesting" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('servers.ip')" prop="ip">
            <el-input :disabled="requesting" v-model="form.ip"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('servers.site')" prop="site">
            <el-input :disabled="requesting" v-model="form.site"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('servers.git')" prop="git">
            <el-input :disabled="requesting" v-model="form.git"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item :label="$t('servers.ssh_user')" prop="ssh_user">
            <el-input :disabled="requesting" v-model="form.ssh_user"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('servers.pass')" prop="ssh_pass">
            <el-input :disabled="requesting" v-model="form.ssh_pass"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('servers.port')" prop="ssh_port">
            <el-input :disabled="requesting" v-model="form.ssh_port"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item :label="$t('servers.mysql_user')" prop="mysql_user">
            <el-input :disabled="requesting" v-model="form.mysql_user"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('servers.pass')" prop="mysql_pass">
            <el-input :disabled="requesting" v-model="form.mysql_pass"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('servers.port')" prop="mysql_port">
            <el-input :disabled="requesting" v-model="form.mysql_port"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('servers.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark"/>
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
  name: 'addservers',
  mixins: [globalSize, requesting],
  components: {
    submitButton
  },
  created() {
    this.rule = verify('servers', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/Server/Create',
      update_url: '/Server/Update',
      info_url: '/Server/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        name: '',
        ip: '',
        site: '',
        git: '',
        ssh_user: '',
        ssh_pass: '',
        ssh_port: '',
        mysql_user: '',
        mysql_pass: '',
        mysql_port: '',
        remark: ''
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'servers.servers')
      })
    },
    close() {
      close(this)
    }
  }
}
</script>
