<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="8vh"
      width="400px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item prop="type" :label="$t('unit.typeName')">
        <select-List :disabled="requesting" ref="type"
                     :select_id.sync="form.type"></select-List>
      </el-form-item>
      <el-form-item :label="$t('unit.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('unit.en_name')" prop="en_name">
        <el-input :disabled="requesting" v-model="form.en_name"/>
      </el-form-item>
      <el-form-item :label="$t('unit.description')" prop="description">
        <el-input :disabled="requesting" v-model="form.description"/>
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
import selectList from '../../components/selection/selectList'

export default {
  name: 'addUnit',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    selectList
  },
  created() {
    this.rule = verify('unit', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/Unit/Create',
      update_url: '/Unit/Update',
      info_url: '/Unit/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        type: '',
        name: '',
        en_name: '',
        description: ''
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'unit.unit')
        this.$refs.type.pool = [{ id: 1, name: '服务项目' }, { id: 2, name: '配件' }, { id: 3, name: '附加项' }]
      })
    },
    close() {
      close(this)
    }
  }
}
</script>
