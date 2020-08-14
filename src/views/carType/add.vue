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
      <el-form-item prop="brand_id" :label="$t('carBrand.carBrand')">
        <select-List :disabled="requesting" ref="name" :url="'/CarBrand/GetSelect'"
                     :select_id.sync="form.brand_id"></select-List>
      </el-form-item>
      <el-form-item :label="$t('carType.name')" prop="name">
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
import selectList from '../../components/selection/selectList'

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'

export default {
  name: 'addcarType',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    selectList
  },
  created() {
    this.rule = verify('carType', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/CarType/Create',
      update_url: '/CarType/Update',
      info_url: '/CarType/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        brand_id: '',
        name: ''
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'carType.carType')
        this.$refs.name.getList()
      })
    },
    close() {
      close(this)
      this.$refs.name.clear()
    }
  }
}
</script>
