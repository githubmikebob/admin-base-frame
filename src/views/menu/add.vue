<template>
  <el-dialog :before-close="close" :title="title" :visible.sync="dialog"
             @opened="opened()" append-to-body class="small_dialog" top="8vh" width="400px">
    <el-form :model="form" :rules="rule" :size="globalSize" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <el-form-item :label="$t('menu.top_menu')" prop="menu_id">
        <top-menu ref="tops" :select_id.sync="form.menu_id"></top-menu>
      </el-form-item>
      <!--隐藏字段 End -->
      <el-form-item class="complex-form" label-width="0">
        <el-row>
          <el-col :span="16">
            <el-form-item :label="$t('menu.name')" prop="name">
              <el-input :disabled="requesting" v-model="form.name" show-word-limit :maxlength="60" :placeholder="$t('menu.placeholder.name')"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('menu.sort')" label-width="60px" prop="sort">
              <el-input :disabled="requesting" v-model="form.sort" :placeholder="$t('menu.placeholder.sort')"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('menu.title')" prop="title">
        <el-input :disabled="requesting" v-model="form.title" show-word-limit :maxlength="60" :placeholder="$t('menu.placeholder.title')"/>
      </el-form-item>
      <el-form-item :label="$t('item.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark" show-word-limit :maxlength="120" :placeholder="$t('menu.placeholder.remark')"/>
      </el-form-item>
    </el-form>
    <alert ref="alert" :mark="[create_url, update_url]" />
    <submit-button :saving="requesting" @close="close" @save="vm.$dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import topMenu from './topMenu'
import submitButton from '../../components/tool/submitButton'
import requesting from '../../global/js/mixin/requesting'
import globalSize from '../../global/js/mixin/globalSize'

import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'

export default {
  name: 'menu_add',
  mixins: [globalSize, requesting],
  components: {
    topMenu,
    submitButton
  },
  created() {
    this.rule = verify('menu', this.$deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      create_url: '/Menu/Create',
      update_url: '/Menu/Update',
      info_url: '/Menu/Info',
      dialog: false,
      title: '',
      form: {
        id: 0,
        menu_id: 0,
        sort: '',
        title: '',
        name: '',
        remark: '',
      },
      rule: {}
    }
  },
  methods: {
    opened() {
      this.$nextTick(() => {
        this.$dialog.title(this, 'menu.menu')
        // 获取数据
        this.$refs.tops.getTops()
      })
    },
    close() {
      close(this)
    },
    chooseDistrict(district) {
      if (district.hasOwnProperty(0)) this.form.province_id = district[0]
      else this.form.province_id = 0
      if (district.hasOwnProperty(1)) this.form.city_id = district[1]
      else this.form.city_id = 0
      if (district.hasOwnProperty(2)) this.form.district_id = district[2]
      else this.form.district_id = 0
    }
  }
}
</script>
