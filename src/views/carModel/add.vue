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
      <el-form-item prop="aaa" :label="$t('carType.carType')">
        <cascader-Car :disabled="requesting" ref="cascaderCar" :url="'/CarBrand/GetCascade'" :cascade_id="form.brand_id"></cascader-Car>
      </el-form-item>
      <el-form-item :label="$t('carModel.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
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
import cascaderCar from '../../components/selection/cascadeCar'

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'

export default {
  name: 'addcarModel',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    cascaderCar
  },
  created() {
    this.rule = verify('carModel', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/CarModel/Create',
      update_url: '/CarModel/Update',
      info_url: '/CarModel/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        name: '',
        brand_id: ''
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'carModel.carModel')
        this.$refs.cascaderCar.getCascade()
      })
    },
    close() {
      close(this)
    }
  }
}
</script>
