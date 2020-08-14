<template>
  <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="dialog"
      @opened="open()"
      append-to-body
      top="8vh"
      class="small_dialog"
      width="420px"
      :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rule" class="base-form" label-width="120px" v-loading="requesting">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item prop="menu_id" :label="$t('menu.parent')">
        <select-menu ref="selectMenu" :disabled="requesting" :menu_id.sync="form.menu_id"/>
      </el-form-item>
      <el-form-item prop="title" :label="$t('menu.name')">
        <el-input v-model="form.title" :disabled="requesting" :placeholder="$t('menu.placeholder.name')"/>
      </el-form-item>
      <el-form-item prop="name" :label="$t('menu.nameEn')">
        <el-input v-model="form.name" :disabled="requesting" :placeholder="$t('menu.placeholder.nameEn')"/>
      </el-form-item>
      <el-form-item prop="remark" :label="$t('item.remark')">
        <el-input v-model="form.remark" :disabled="requesting" :placeholder="$t('item.placeholder.remark')"/>
      </el-form-item>
    </el-form>
    <alert :mark="[add_url, update_url]"/>
    <submit-button :saving="requesting" @close="close" @save="vm._dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import selectMenu from '../../components/selection/selectMenu'
import submitButton from '../../components/tool/submitButton'
import requesting from '../../global/js/mixin/requesting'

import { close, title } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'

export default {
  name: 'addMenu',
  mixins: [requesting],
  created() {
    this.rule = verify('menu', this.deepCopy(this.form))
  },
  components: {
    selectMenu,
    submitButton
  },
  data() {
    return {
      vm: this,
      add_url: '/UserMenu/Create',
      update_url: '/UserMenu/Update',
      info_url: '/UserMenu/Info',
      dialog: false,
      title: title(this, 'menu.title'),
      form: {
        id: '',
        menu_id: 0,
        title: '',
        name: '',
        remark: ''
      },
      status: 1,
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.$refs.selectMenu.id = this.form.menu_id
        this.$refs.selectMenu.getMenus({ status: this.status })
      })
    },
    close() {
      this.$refs.selectMenu.clear()
      this.status = 1
      close(this)
    }
  }
}
</script>
