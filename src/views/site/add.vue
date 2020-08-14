<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="8vh"
      width="600px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="90px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sites.name')" prop="name">
            <el-input :disabled="requesting" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('sites.type')" prop="type">
            <radio-group :type.sync="keyword.type.value" target="sites.types"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sites.host')" prop="host">
            <el-input :disabled="requesting" v-model="form.host"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('sites.server')" prop="server_id">                                  <!--服务器-->
            <select-List :disabled="requesting" ref="server" :url="'/Server/GetSelect'" :clearable="false"
                         :select_id.sync="form.server_id"></select-List>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('sites.site')" prop="site">
        <el-input :disabled="requesting" v-model="form.site"/>
      </el-form-item>
      <el-form-item :label="$t('sites.git')" prop="git_id">
        <select-List :disabled="requesting" ref="git" :url="'/Git/GetSelect'" :clearable="false"
                     :select_id.sync="form.git_id"></select-List>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sites.branch')" prop="branch">
            <el-input :disabled="requesting" v-model="form.branch"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('sites.branch_info')" prop="branch_info">
            <el-input :disabled="requesting" v-model="form.branch_info"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('item.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark"/>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('sites.git_init')" prop="git_init">
            <el-checkbox v-model="form.git_init" :true-label='1' :false-label='2'></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('sites.ssl')" prop="ssl">
            <el-checkbox v-model="form.ssl" :true-label='1' :false-label='2'></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('sites.created')" prop="created">
            <el-checkbox v-model="form.created" :true-label='1' :false-label='2'></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <submit-button :saving="requesting" @close="close" @save="vm._dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import submitButton from '../../components/tool/submitButton'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'
import radioGroup from '../../components/tool/radioGroup'
import { Checkbox } from 'element-ui'
import selectList from '../../components/selection/selectList'

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'

export default {
  name: 'addsite',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    radioGroup,
    [Checkbox.name]: Checkbox,
    selectList
  },
  created() {
    this.rule = verify('sites', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/Site/Create',
      update_url: '/Site/Update',
      info_url: '/Site/Info',
      dialog: false,
      title: '',
      keyword: {
        type: { key: 'type', value: 1, type: 'int' }
      },
      form: {
        id: '',
        type: 1,
        name: '',
        host: '',
        site: '',
        server_id: 1,
        git_id: 1,
        git_init: 2,
        ssl: 2,
        created: 2,
        branch: '',
        branch_info: '',
        remark: '',
      },
      rule: {},
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'sites.sites')
        this.$refs.server.id = 1
        this.$refs.git.id = 1
        this.$refs.server.getList()
        this.$refs.git.getList()
      })
    },
    close() {
      close(this)
      this.$refs.server.clear()
      this.$refs.git.clear()
    },
  }
}
</script>
