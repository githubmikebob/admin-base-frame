<template>
  <el-cascader
      ref="districtCascade"
      :disabled="disabled"
      :options="cascade"
      :placeholder="placeholder"
      :props="props"
      :size="size"
      :style="'width: ' + width + '; margin-left:' + margin_left"
      @change="choose"
      clearable
      filterable
      v-model="district"
      popper-class="districtCascade"
      :value="value"
  />
</template>

<script>

import { Cascader } from 'element-ui'
import { api } from '../../global/js/common/http'

export default {
  name: 'districtSelect',
  components: {
    [Cascader.name]: Cascader
  },
  props: {
    size: {type: String, default: 'mini'},
    width: {type: String, default: '20%'},
    margin_left: {type: String, default: '10px'},
    placeholder: {type: String, default() { return this.$t('search.area') }},
    disabled: {type: Boolean, default: false},
    value: {type: String, default: 'id'}
  },
  data() {
    return {
      cascade: [],
      district: [],
      props: {
        value: this.value,
        label: 'name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      }
    }
  },
  methods: {
    init() {
      this.id = this.$deepCopy(this.select_id)
    },
    choose() {
      this.$emit('choose', this.district)
      // 选择之后将下拉界面收起
      this.$refs.districtCascade.toggleDropDownVisible()
    },
    clear() {
      this.district = []
    },
    getDistrictCascade() {
      let that = this
      let cascade = this.$storage.get('district')
      if (!cascade) {
        that.$apiPost('/District/Cascade', {}, api).then((res) => {
          if (that.$checkCode(res.code)) {
            that.cascade = res.data
            that.$storage.set('district', res.data, 3600*24)
          }
        })
      } else {
        that.cascade = cascade
      }
    }
  }
}
</script>

<style>
  /*  以下样式是为了不止点击文字前的小圈圈进行选择，而是可以点击包括文字整行选择。 */
  .districtCascade .el-cascader-panel .el-radio {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .districtCascade .el-cascader-panel .el-radio__input {
    margin-top: 10px;
    margin-left: 20px;
  }
  .districtCascade .el-cascader-panel .el-cascader-node__label {
    padding: 0 10px 0 25px;
  }
  .districtCascade .el-cascader-panel .el-cascader-node__postfix { /*  针对ie修改样式  */
    top: 10px;
  }
</style>
