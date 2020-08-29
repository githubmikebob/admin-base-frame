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
    <el-form :model="form" :rules="rule" :size="global_size" class="base-form" label-width="80px" ref="form">
      <!--隐藏字段 Start -->
      <el-form-item prop="id" v-show="false"/>
      <el-form-item prop="province_id" v-show="false"/>
      <el-form-item prop="city_id" v-show="false"/>
      <el-form-item prop="district_id" v-show="false"/>
      <!--隐藏字段 End -->
      <el-form-item :label="$t('company.name')" prop="name">
        <el-input :disabled="requesting" v-model="form.name" :placeholder="$t('company.placeholder.name')"/>
      </el-form-item>
      <el-form-item class="complex-form" label-width="0">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('item.contact')" prop="contact">
              <el-input :disabled="requesting" v-model="form.contact" :placeholder="$t('item.placeholder.contact')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('item.mobile')" prop="contact_mobile">
              <el-input :disabled="requesting" v-model="form.contact_mobile"
                        :placeholder="$t('item.placeholder.mobile')"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('item.district')" prop="district" size="small">
        <select-district width="100%" margin_left="0" ref="selectDistrict" :disabled="requesting"
                         @choose="chooseDistrict"/>
      </el-form-item>
      <el-form-item :label="$t('item.address')" prop="address">
        <el-input :disabled="requesting" v-model="form.address"/>
      </el-form-item>
      <el-form-item :label="$t('company.site')" prop="site_id">
        <select-list :disabled="requesting" ref="site" :url="'/Site/ApiSite'"
                     :select_id.sync="form.site_id"></select-list>
      </el-form-item>
      <el-form-item :label="$t('item.remark')" prop="remark">
        <el-input :disabled="requesting" v-model="form.remark"/>
      </el-form-item>
    </el-form>
    <submit-button :saving="requesting" @close="close" @save="vm.$dialog.save(vm)"/>
  </el-dialog>
</template>

<script>
import { close } from '../../global/js/common/dialog'
import verify from '../../global/js/common/verify'
import requesting from '../../global/js/mixin/requesting'
import global_size from '../../global/js/mixin/global_size'

export default {
  name: 'addCompany',
  mixins: [global_size, requesting],
  components: {
    SubmitButton: () => import('../../components/tool/SubmitButton'),
    SelectDistrict: () => import('../../components/selection/SelectDistrict'),
    SelectList: () => import('../../components/selection/SelectList')
  },
  created() {
    this.rule = verify('company', this.$deepCopy(this.form))
  },
  data() {
    return {
      vm: this,
      add_url: '/Company/Create',
      update_url: '/Company/Update',
      info_url: '/Company/Info',
      dialog: false,
      title: '',
      form: {
        id: '',
        name: '',
        contact: '',
        contact_mobile: '',
        province_id: 110000,
        city_id: 110100,
        district_id: 110101,
        address: '',
        site_id: 9,
        remark: '',
        create_shop: 1
      },
      rule: {}
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.$dialog.title(this, 'company.company')
        // 获取数据
        let selectDistrict = this.$refs.selectDistrict
        selectDistrict.getDistrictCascade()
        // 设置数据
        // 设置数据 地区
        let district = []
        if (this.form.province_id !== '') district.push(this.form.province_id)
        if (this.form.city_id !== '') district.push(this.form.city_id)
        if (this.form.district_id !== '') district.push(this.form.district_id)
        selectDistrict.district = district
        this.$refs.site.getList()
      })
    },
    close() {
      close(this)
      this.$refs.site.clear()
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
