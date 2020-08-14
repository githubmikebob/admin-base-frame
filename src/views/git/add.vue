<template>
  <el-dialog
          :before-close="close"
          :title="title"
          :visible.sync="dialog"
          @opened="open()"
          append-to-body
          class="small_dialog"
          top="8vh"
          width="460px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="70px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('sites.server')" prop="server_id">
        <select-List :disabled="requesting" ref="server" :url="'/Server/GetSelect'" :clearable="false"
                     :select_id.sync="form.server_id"></select-List>
      </el-form-item>
      <el-form-item :label="$t('git.git')" prop="git">
        <el-input :disabled="requesting" v-model="form.git"/>
      </el-form-item>
      <el-form-item :label="$t('git.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('git.path')" prop="path">
        <el-input :disabled="requesting" v-model="form.path"/>
      </el-form-item>
      <el-form-item :label="$t('item.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark"/>
      </el-form-item>
    </el-form>
    <submit-button :saving="requesting" @close="close" @save="vm._dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import submitButton from '../../components/tool/submitButton'
import globalSize from '../../global/js/mixin/globalSize'
import { Radio } from 'element-ui'
import selectList from '../../components/selection/selectList'

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'
import requesting from '../../global/js/mixin/requesting'

export default {
  name: 'addgit',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    [Radio.name]: Radio,
    selectList
  },
  created() {
    this.rule = verify('git', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/Git/Create',
      update_url: '/Git/Update',
      info_url: '/Git/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        git: '',
        name: '',
        path: '',
        remark: '',
        server_id: 1
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'git.git')
        this.$refs.server.id = 1
        this.$refs.server.getList()
      })
    },
    close() {
      close(this)
      this.$refs.server.clear()
    }
  }
}
</script>
