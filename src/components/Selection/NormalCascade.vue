<template>
  <div class="normal-cascade">
    <el-cascader
      ref="DistrictSelect"
      v-model="id"
      :disabled="disabled"
      :options="data"
      :placeholder="placeholder"
      :props="props"
      :size="size"
      @change="choose"
      clearable
      filterable
      popper-class="DistrictSelect"
      :style="'width: ' + width + '; margin-left:' + margin_left"
    />
  </div>
</template>

<script type='text/ecmascript-6'>
import { Cascader } from 'element-ui'
import selectModel from './selectModel.mixin'

export default {
  name: 'NormalCascade',
  components: {
    [Cascader.name]: Cascader
  },
  mixins: [selectModel],
  props: {
    data: { required: true, type: Array },
    size: { type: String, default: 'mini' },
    width: { type: String, default: '100%' },
    margin_left: { type: String, default: '' },
    placeholder: {
      type: String, default() {
        return this.$t('search.area')
      }
    },
    propsValue: { type: String, default: 'id' }
  },
  data() {
    return {
      props: {
        value: this.propsValue,
        label: 'name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    init() {
    },
    choose() {
      // 选择之后将下拉界面收起
      this.$refs.DistrictSelect.toggleDropDownVisible()
    },
    clear() {
    },
  }

}
</script>

<style>
  /*  以下样式是为了不止点击文字前的小圈圈进行选择，而是可以点击包括文字整行选择。 */
  .DistrictSelect .el-cascader-panel .el-radio {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
  }

  .DistrictSelect .el-cascader-panel .el-radio__input {
    margin-top: 10px;
    margin-left: 20px;
  }

  .DistrictSelect .el-cascader-panel .el-cascader-node__label {
    padding: 0 10px 0 25px;
  }

  .DistrictSelect .el-cascader-panel .el-cascader-node__postfix { /*  针对ie修改样式  */
    top: 10px;
  }
</style>