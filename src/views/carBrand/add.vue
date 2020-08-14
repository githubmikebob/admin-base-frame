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
      <el-form-item :label="$t('carBrand.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('carBrand.letter')" prop="letter">
        <el-input :disabled="requesting" v-model="form.letter"/>
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
  name: 'addcarBrand',
  mixins: [globalSize, requesting],
  components: {
    submitButton
  },
  created() {
    this.rule = verify('carBrand', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/CarBrand/Create',
      update_url: '/CarBrand/Update',
      info_url: '/CarBrand/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        name: '',
        letter: '',
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'carBrand.carBrand')
      })
    },
    close() {
      close(this)
    }
  }
}
</script>
