<template>
  <el-dialog
          @open="open()"
          :before-close="close"
          :title="title"
          :visible.sync="dialog"
          top="8vh"
          width="40%">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('print.type')" prop="type">
        <select-List :disabled="requesting" ref="type" :url="'/PrintTemplate/GetType'" :clearable="false" :select_id.sync="form.type"></select-List>
      </el-form-item>
      <el-form-item :label="$t('print.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('print.url')" prop="url">
        <el-input :disabled="requesting" v-model="form.url"/>
      </el-form-item>
      <el-form-item :label="$t('print.default')" prop="default">
        <el-radio v-model="form.default" :label="1">{{$t('print.yes')}}</el-radio>
        <el-radio v-model="form.default" :label="0">{{$t('print.no')}}</el-radio>
      </el-form-item>
      <submit-button :saving="requesting" @close="close" @save="vm._dialog.save(vm)"/>
    </el-form>
  </el-dialog>
</template>

<script>
import globalSize from '../../global/js/mixin/globalSize'
import requesting from '../../global/js/mixin/requesting'
import verify from '../../global/js/common/verify'
import { close } from '../../global/js/common/dialog'
import submitButton from '../../components/tool/submitButton'
import { Radio } from 'element-ui'
import selectList from '../../components/selection/selectList'

export default {
  name: 'addPrint',
  mixins: [globalSize, requesting],
  created() {
    this.rule = verify('print', this.deepCopy(this.form))
  },
  components: {
    submitButton,
    [Radio.name]: Radio,
    selectList,
  },
  data() {
    return {
      vm: this,
      title: '',
      add_url: '/PrintTemplate/Create',
      update_url: '/PrintTemplate/Update',
      info_url: '/PrintTemplate/Info',
      dialog: false,
      form: {
        id: '',
        type: 1,
        name: '',
        url: '',
        default: 0
      },
      rule: {},
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'print.print')
        this.$refs.type.id = this.form.type
        this.$refs.type.getList()
      })
    },
    close() {
      close(this)
      this.$refs.type.clear()
    }
  }
}
</script>

<style>

</style>
