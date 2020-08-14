<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="8vh"
      width="480px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('we_chat_template.order')" prop="order">
        <el-input :disabled="requesting" v-model="form.order"/>
      </el-form-item>
      <el-form-item :label="$t('servers.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('we_chat_template.tag')" prop="tag">
        <el-input :disabled="requesting" v-model="form.tag"/>
      </el-form-item>
      <el-form-item :label="$t('we_chat_template.target')" prop="target">
        <el-input :disabled="requesting" v-model="form.target"/>
      </el-form-item>
      <el-form-item :label="$t('we_chat_template.example')" prop="example">
        <el-input :disabled="requesting" v-model="form.example"/>
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

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'

export default {
  name: 'addIndex',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
  },
  created() {
    this.rule = verify('weChatTemplate', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '',
      update_url: '',
      info_url: '',
      dialog: false,
      title: '',
      form: {
        id: '',
        order: '',
        name: '',
        tag: '',
        target: '',
        example: '',
        remark: '',
        create_shop: 1
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'we_chat_template.index')
      })
    },
    close() {
      close(this)
    },
  }
}
</script>
