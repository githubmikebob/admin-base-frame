<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      class="small_dialog"
      top="8vh"
      width="980px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('sms_template.category')" prop="category_id">
            <select-List :disabled="requesting" ref="category" :url="'/WeChatTemplateCategory/GetSelect'"
                         :select_id.sync="form.category_id"></select-List>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('we_chat_template.name')" prop="name">
            <el-input :disabled="requesting" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('sms_template.code')" prop="code">
            <el-input :disabled="requesting" v-model="form.code"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('we_chat_template.example')">                      <!--左边demo-->
            <el-table :data="demoCopy" highlight-current-row size="mini">
              <el-table-column>
                <template slot-scope="{row}">
                  <el-input :disabled="requesting" v-model="row.value"/>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="content">                                                   <!--右边content-->
            <el-table :data="form.content" highlight-current-row size="mini">
              <el-table-column :label="transform('we_chat_template.key')" width="160">
                <template slot-scope="{row}">
                  <el-input :disabled="requesting" v-model="row.key"/>
                </template>
              </el-table-column>
              <el-table-column :label="transform('we_chat_template.value')">
                <template slot-scope="{row}">
                  <el-input :disabled="requesting" v-model="row.value"/>
                </template>
              </el-table-column>
              <el-table-column width="50">
                <template slot-scope="{row}">
                  <el-button type="primary" icon="el-icon-plus" circle @click="addRow(row)"
                             v-if="form.content.indexOf(row) == form.content.length-1"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <submit-button :saving="requesting" @close="close" @save="sure"/>
  </el-dialog>
</template>

<script>
import submitButton from '../../components/tool/submitButton'
import selectList from '../../components/selection/selectList'

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'

export default {
  name: 'addWeChatTemplate',
  mixins: [globalSize, requesting],
  components: {
    submitButton,
    selectList,
  },
  computed: {
    size() {
      return this.$store.state.app.size
    }
  },
  created() {
    this.rule = verify('weChatTemplate', this.deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/WeChatTemplate/Create',
      update_url: '/WeChatTemplate/Update',
      info_url: '/WeChatTemplate/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        category_id: '',
        code: '',
        name: '',
        demo: [],
        content: [{ key: '', value: '' }],
      },
      demoCopy: [{ value: '' }],
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this._dialog.title(this, 'we_chat_template.we_chat_template')
        this.$refs.category.getList()
        if (this.form.id !== '') {
          let that = this
          let array = []
          that.form.demo.forEach(function (item) {
            array.push({ value: item })
          })
          this.demoCopy = array
        }
      })
    },
    close() {
      close(this)
      this.$refs.category.clear()
      this.form.content = [{ key: '', value: '' }]
      this.demoCopy = [{ value: '' }]
    },
    addRow(row) {
      this.form.content.push({ key: '', value: '' })
      this.demoCopy.push({ value: '' })
    },
    sure() {
      let that = this
      that.form.content.forEach(function (item) {
        if (item.value == null || item.value === '') {
          that.form.content.splice(that.form.content.indexOf(item), 1)
        }
      })
      let arr = []
      that.demoCopy.forEach(function (item) {
        if (item.value != null) {
          arr.push(item.value)
        }
      })
      that.form.demo = arr
      this._dialog.save(this)
    }
  }
}
</script>

