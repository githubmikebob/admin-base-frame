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
      <el-form-item prop="app_id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('we_chat_template.account')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="'app_id'" prop="app_id">
        <el-input :disabled="requesting" v-model="form.app_id"/>
      </el-form-item>
      <el-form-item :label="'secret'" prop="app_secret">
        <el-input :disabled="requesting" v-model="form.app_secret"/>
      </el-form-item>
      <el-form-item :label="'token'" prop="token">
        <el-input :disabled="requesting" v-model="form.token"/>
      </el-form-item>
      <el-form-item :label="$t('we_chat_template.code')" prop="verify">
        <el-input :disabled="requesting" v-model="form.verify"/>
      </el-form-item>
      <el-form-item :label="'encoding'" prop="encoding">
        <el-input :disabled="requesting" v-model="form.encoding"/>
      </el-form-item>
      <el-form-item :label="$t('we_chat_template.before')" prop="contact_mobile">  <!--前端站点-->
        <select-List :disabled="requesting" ref="site" :url="''"
                     :select_id.sync="form.site_id"></select-List>
      </el-form-item>
      <el-form-item :label="$t('we_chat_template.after')" prop="contact_mobile">   <!--后端站点-->
        <select-List :disabled="requesting" ref="site" :url="''"
                     :select_id.sync="form.site_id"></select-List>
      </el-form-item>
      <el-form-item :label="$t('shop.expired_at')" prop="expired_at">
        <data-picker ref="dataPicker" type="date" :disabled="requesting" :time.sync="form.expired_at" width="362px"></data-picker>
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
import dataPicker from '../../components/tool/dataPicker'
import selectList from '../../components/selection/selectList'

import requesting from '../../global/js/mixin/requesting'
import { close } from '../../global/js/common/dialog'
// import verify from '../../global/js/common/verify'

export default {
  name: '',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    dataPicker,
    selectList
  },
  created() {
    // this.rule = verify('', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/WeChatAccount/Create',
      update_url: '/WeChatAccount/Update',
      info_url: '/WeChatAccount/Info',
      dialog: false,
      title: '',
      form: {
        name: '',
        app_id: '',
        app_secret: '',
        token: '',
        verify: '',
        encoding: '',
        expired_at: '',
        remark: '',
        site_id: 0 // 记得修改
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'we_chat_template.account')
        // this.$refs.site.getList()
        // this.$refs.site.getList()
      })
    },
    close() {
      close(this)
      // this.$refs.site.clear()
      // this.$refs.site.clear()
    }
  }
}
</script>
