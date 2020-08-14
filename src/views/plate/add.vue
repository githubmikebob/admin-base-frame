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
      <el-form-item :label="$t('plate.sort')" prop="sort">
        <el-input :disabled="requesting" v-model="form.sort"/>
      </el-form-item>
      <el-form-item :label="$t('plate.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('plate.letter')" prop="letter">
        <el-input :disabled="requesting" v-model="form.letter"/>
      </el-form-item>
      <el-form-item :label="$t('item.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark"/>
      </el-form-item>
    </el-form>
    <!--    <alert :mark="url"/>-->
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
  name: 'addplate',
  mixins: [globalSize, requesting],
  components: {
    submitButton
  },
  created() {
    this.rule = verify('plate', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/Plate/Create',
      update_url: '/Plate/Update',
      info_url: '/Plate/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        sort: '',
        name: '',
        letter: '',
        remark: ''
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'plate.plate')
      })
    },
    close() {
      close(this)
    }
  }
}
</script>
